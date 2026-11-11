import { beforeEach, describe, expect, it, vi } from "vitest"
import { createProjectsStore } from "../../app/store/projects"
import {
  decodeProjects,
  encodeProjects,
  loadProjects,
  PROJECTS_KEY,
  RECOVERY_KEY,
  resolveProject,
  validateProject,
} from "../../app/store/projects/persistence"
import { miniAppRoute, projectRoute } from "../../app/store/projects/routes"
const first = { name: " First ", url: "http://localhost:5173/base/?q=a%2Fb#tab" }
const second = { name: "Second", url: "https://example.com/app" }
const legacy = (projects: unknown[]) => JSON.stringify({ state: { projects }, version: 1 })
beforeEach(() => localStorage.clear())

describe("saved projects", () => {
  it("migrates duplicates once, backs up the original, and preserves URL components", () => {
    const raw = legacy([first, first, second])
    localStorage.setItem(PROJECTS_KEY, raw)
    const { data } = loadProjects(localStorage)
    expect(data.projects).toHaveLength(3)
    expect(new Set(data.projects.map((p) => p.id)).size).toBe(3)
    expect(data.projects[0]).toMatchObject({ name: "First", url: first.url, mode: "local" })
    expect(localStorage.getItem(RECOVERY_KEY)).toBe(raw)
    expect(loadProjects(localStorage).data).toEqual(data)
    expect(data.legacyAliases["1"]).toBe(data.projects[1].id)
  })
  it("keeps invalid entries in recovery without shifting surviving numeric aliases", () => {
    const raw = legacy([first, null, { name: "bad", url: "javascript:alert(1)" }, second])
    localStorage.setItem(PROJECTS_KEY, raw)
    const { data } = loadProjects(localStorage)
    expect(data.recoveredEntries).toBe(2)
    expect(resolveProject(data, "1")).toBeUndefined()
    expect(resolveProject(data, "3")?.name).toBe("Second")
    expect(localStorage.getItem(RECOVERY_KEY)).toBe(raw)
  })
  it("never overwrites malformed or unsupported storage", () => {
    for (const raw of ["{broken", "{}", JSON.stringify({ version: 999, state: { projects: [] } })]) {
      localStorage.setItem(PROJECTS_KEY, raw)
      const store = createProjectsStore(() => localStorage)
      store.getState().hydrate()
      expect(store.getState().hydration).toBe("error")
      expect(localStorage.getItem(PROJECTS_KEY)).toBe(raw)
      expect(() => store.getState().addProject(first)).toThrow()
    }
  })
  it("does not overwrite the original if backup or migration persistence fails", () => {
    const raw = legacy([first])
    localStorage.setItem(PROJECTS_KEY, raw)
    const set = localStorage.setItem.bind(localStorage)
    for (const failedKey of [RECOVERY_KEY, PROJECTS_KEY]) {
      const storage = {
        getItem: localStorage.getItem.bind(localStorage),
        setItem: (key: string, value: string) => {
          if (key === failedKey) throw new Error("Quota exceeded")
          set(key, value)
        },
      } as Storage
      expect(() => loadProjects(storage)).toThrow("Quota exceeded")
      expect(localStorage.getItem(PROJECTS_KEY)).toBe(raw)
    }
  })
  it("waits for hydration, edits by ID, and never retargets a deleted alias", () => {
    localStorage.setItem(PROJECTS_KEY, legacy([first, second]))
    const store = createProjectsStore(() => localStorage)
    expect(store.getState().hydration).toBe("loading")
    store.getState().hydrate()
    const [a, b] = store.getState().projects
    store.getState().removeProject(a.id)
    expect(resolveProject(store.getState(), "0")).toBeUndefined()
    expect(resolveProject(store.getState(), "1")?.id).toBe(b.id)
    store.getState().updateProject(b.id, { name: "Renamed", url: b.url })
    store.getState().addProject(first)
    const reopened = createProjectsStore(() => localStorage)
    reopened.getState().hydrate()
    expect(resolveProject(reopened.getState(), "1")).toMatchObject({ id: b.id, name: "Renamed" })
    expect(resolveProject(reopened.getState(), "0")).toBeUndefined()
  })
  it("reports write failures without changing in-memory data", () => {
    const store = createProjectsStore(() => localStorage)
    store.getState().hydrate()
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Quota exceeded")
    })
    expect(() => store.getState().addProject(first)).toThrow("Quota exceeded")
    expect(store.getState().projects).toEqual([])
    expect(store.getState().storageError).toBe("Quota exceeded")
  })
  it("does not overwrite projects changed by another tab", () => {
    const store = createProjectsStore(() => localStorage)
    store.getState().hydrate()
    const raw = legacy([second])
    localStorage.setItem(PROJECTS_KEY, raw)
    expect(() => store.getState().addProject(first)).toThrow("another tab")
    expect(localStorage.getItem(PROJECTS_KEY)).toBe(raw)
  })
  it("saves only project metadata", () => {
    const store = createProjectsStore(() => localStorage)
    store.getState().hydrate()
    store.getState().modalProjectsSet(true)
    store.getState().addProject(first)
    const raw = localStorage.getItem(PROJECTS_KEY)!
    expect(Object.keys(JSON.parse(raw).state).sort()).toEqual(["legacyAliases", "projects", "recoveredEntries"])
    expect(encodeProjects(decodeProjects(raw).data)).toBe(raw)
  })
})
it.each([
  "http://localhost:7220",
  "http://127.0.0.1:3000",
  "http://[::1]:3000",
  "http://192.168.1.2:3000",
  "https://example.org/base?q=a#b",
])("accepts %s", (url) => expect(validateProject({ name: "App", url }).url).toBe(url))
it.each([
  "javascript:alert(1)",
  "file:///tmp/app",
  "ftp://example.org",
  "https://user:pass@example.org",
  "localhost:3000",
  "",
])("rejects %s", (url) => expect(() => validateProject({ name: "App", url })).toThrow())
it("rejects blank names", () => expect(() => validateProject({ name: "  ", url: first.url })).toThrow())
it("preserves route query and hash while replacing the project prefix", () => {
  expect(miniAppRoute("/code/0/deep/a%2Fb", "?x=%2F", "#tab")).toBe("/deep/a%2Fb?x=%2F#tab")
  expect(projectRoute("uuid", miniAppRoute("/code/0/", "?x=1", "#a"))).toBe("/code/uuid/?x=1#a")
  expect(projectRoute("uuid", "//example.org")).toBe("/code/uuid/example.org")
})

it("does not classify ID generation failure as invalid saved projects", () => {
  expect(() =>
    decodeProjects(legacy([first]), () => {
      throw new Error("No random source")
    })
  ).toThrow("No random source")
})
it("keeps both values when a different recovery backup already exists", () => {
  const raw = legacy([first])
  localStorage.setItem(PROJECTS_KEY, raw)
  localStorage.setItem(RECOVERY_KEY, "previous backup")
  expect(() => loadProjects(localStorage)).toThrow("different recovery backup")
  expect(localStorage.getItem(PROJECTS_KEY)).toBe(raw)
  expect(localStorage.getItem(RECOVERY_KEY)).toBe("previous backup")
})
it("normalizes navigation within the project without double prefixes", () => {
  expect(projectRoute("uuid", "/../../other?x=1#t")).toBe("/code/uuid/other?x=1#t")
  expect(projectRoute("uuid", "/code/uuid/path")).toBe("/code/uuid/path")
  expect(projectRoute("uuid", "/%2e%2e/other")).toBe("/code/uuid/other")
})

it.each(["My App", "my_app", "app/name", "app.name", "app?x", "приложение", "app🙂"])(
  "rejects invalid project name %s",
  (name) => expect(() => validateProject({ name, url: first.url })).toThrow("Use only letters")
)
it.each(["My-App9", "ABC", "123", "a-z-A-Z-0-9", "-"])("accepts project name %s", (name) => {
  expect(validateProject({ name, url: first.url }).name).toBe(name)
})
it("assigns persistent unique name routes to old names without changing names or IDs", () => {
  localStorage.setItem(
    PROJECTS_KEY,
    legacy([
      { ...first, name: "My App" },
      { ...first, name: "My App" },
      { ...first, name: "My-App" },
      { ...first, name: "0" },
      { ...first, name: "你好" },
    ])
  )
  const { data } = loadProjects(localStorage)
  expect(data.projects.map((project) => project.slug)).toEqual(["My-App-2", "My-App-3", "My-App", "0-2", "project"])
  expect(data.projects.map((project) => project.name)).toEqual(["My App", "My App", "My-App", "0", "你好"])
  expect(loadProjects(localStorage).data).toEqual(data)
  expect(resolveProject(data, "My-App-3")?.id).toBe(data.projects[1].id)
  expect(resolveProject(data, data.projects[1].id)?.id).toBe(data.projects[1].id)
  expect(resolveProject(data, "0")?.id).toBe(data.projects[0].id)
})
it("backs up version 2 independently and keeps original IDs and numeric aliases", () => {
  const { data } = decodeProjects(legacy([first, first, second]))
  const raw = JSON.stringify({
    version: 2,
    state: { ...data, projects: data.projects.map(({ slug, ...project }) => project) },
  })
  localStorage.setItem(PROJECTS_KEY, raw)
  localStorage.setItem(RECOVERY_KEY, "original version 1 backup")
  const loaded = loadProjects(localStorage).data
  expect(loaded.projects.map((project) => project.id)).toEqual(data.projects.map((project) => project.id))
  expect(loaded.legacyAliases).toEqual(data.legacyAliases)
  expect(localStorage.getItem(PROJECTS_KEY + ".recovery-v2")).toBe(raw)
  expect(localStorage.getItem(RECOVERY_KEY)).toBe("original version 1 backup")
  expect(loadProjects(localStorage).data).toEqual(loaded)
})
it("rejects duplicate and reserved names on create and rename", () => {
  localStorage.setItem(PROJECTS_KEY, legacy([first, second]))
  const store = createProjectsStore(() => localStorage)
  store.getState().hydrate()
  const [a, b] = store.getState().projects
  expect(() => store.getState().addProject({ ...first, name: "first" })).toThrow("already used")
  expect(() => store.getState().updateProject(b.id, { ...second, name: "FIRST" })).toThrow("already used")
  expect(() => store.getState().addProject({ ...first, name: "0" })).toThrow("already used")
  expect(() => store.getState().addProject({ ...first, name: a.id })).toThrow("already used")
  store.getState().updateProject(b.id, { ...second, name: "New-name" })
  expect(resolveProject(store.getState(), "New-name")?.id).toBe(b.id)
  expect(resolveProject(store.getState(), b.id)?.slug).toBe("New-name")
  expect(resolveProject(store.getState(), "Second")).toBeUndefined()
})
it("keeps an old display name when only its URL is edited", () => {
  localStorage.setItem(PROJECTS_KEY, legacy([{ ...first, name: "My old app" }]))
  const store = createProjectsStore(() => localStorage)
  store.getState().hydrate()
  const project = store.getState().projects[0]
  store.getState().updateProject(project.id, { name: project.name, url: second.url })
  expect(store.getState().projects[0]).toEqual({ ...project, url: second.url })
})
it("allows purely numeric names when no legacy link reserves them", () => {
  const store = createProjectsStore(() => localStorage)
  store.getState().hydrate()
  store.getState().addProject({ ...first, name: "123" })
  expect(resolveProject(store.getState(), "123")?.name).toBe("123")
})
