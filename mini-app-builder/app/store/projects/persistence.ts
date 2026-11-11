import type { Project, ProjectData, ProjectInput } from "./types"

export const PROJECTS_KEY = "xray-mini-app-builder.projects"
export const RECOVERY_KEY = `${PROJECTS_KEY}.recovery-v1`
export const RECOVERY_V2_KEY = `${PROJECTS_KEY}.recovery-v2`
export const PROJECTS_VERSION = 3
export const PROJECT_NAME_PATTERN = /^[a-zA-Z0-9-]+$/
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

function parseProject(input: ProjectInput): ProjectInput {
  const name = input.name.trim()
  const url = input.url.trim()
  if (!name) throw new Error("Enter a project name.")
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error("Enter a complete HTTP or HTTPS development URL.")
  }
  if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
    throw new Error("Use HTTP or HTTPS without a username or password in the URL.")
  }
  return { name, url }
}
export function validateProjectName(name: string, data?: ProjectData, editingId?: string) {
  const value = name.trim()
  if (!value) throw new Error("Enter a project name.")
  if (!PROJECT_NAME_PATTERN.test(value)) throw new Error("Use only letters (a-z, A-Z), numbers, and hyphens (-).")
  if (data) {
    const taken = data.projects.some(
      (project) =>
        project.id !== editingId &&
        (project.slug.toLowerCase() === value.toLowerCase() || project.name.toLowerCase() === value.toLowerCase())
    )
    const reserved =
      Object.hasOwn(data.legacyAliases, value) ||
      data.projects.some((project) => project.id.toLowerCase() === value.toLowerCase())
    if (taken || reserved) throw new Error("This project name is already used by a saved project or link.")
  }
  return value
}
export function validateProject(input: ProjectInput): ProjectInput {
  const parsed = parseProject(input)
  return { ...parsed, name: validateProjectName(parsed.name) }
}
export const emptyProjects = (): ProjectData => ({ projects: [], legacyAliases: {}, recoveredEntries: 0 })

export function decodeProjects(
  raw: string,
  newId = () => crypto.randomUUID()
): { data: ProjectData; migrate: boolean } {
  const envelope: unknown = JSON.parse(raw)
  if (!record(envelope) || !record(envelope.state) || !Array.isArray(envelope.state.projects)) {
    throw new Error("Saved project data is unreadable. Your original data has been retained.")
  }
  const state = envelope.state
  const legacy = envelope.version === 1 || envelope.version === undefined
  if (!legacy && envelope.version !== 2 && envelope.version !== PROJECTS_VERSION)
    throw new Error("This project storage version is not supported.")
  const data = emptyProjects()
  for (const [index, item] of (state.projects as unknown[]).entries()) {
    let input: ProjectInput
    try {
      if (!record(item) || typeof item.name !== "string" || typeof item.url !== "string")
        throw new Error("Invalid project")
      input = parseProject({ name: item.name, url: item.url })
    } catch (error) {
      if (!legacy) throw error
      data.recoveredEntries++
      continue
    }
    // ID generation/storage failures are operational errors, not invalid user entries.
    const saved = item as Record<string, unknown>
    const id = legacy ? newId() : saved.id
    if (typeof id !== "string" || !UUID.test(id) || data.projects.some((project) => project.id === id))
      throw new Error("Could not assign a unique project ID.")
    if (!legacy && saved.mode !== "local") throw new Error("Unsupported development mode")
    data.projects.push({ id, mode: "local", ...input, slug: typeof saved.slug === "string" ? saved.slug : "" })
    if (legacy) data.legacyAliases[String(index)] = id
  }
  if (!legacy) {
    if (!record(state.legacyAliases)) throw new Error("Saved project links are unreadable.")
    for (const [index, id] of Object.entries(state.legacyAliases)) {
      if (!/^(0|[1-9]\d*)$/.test(index) || typeof id !== "string" || !UUID.test(id))
        throw new Error("Saved project links are unreadable.")
      data.legacyAliases[index] = id
    }
    data.recoveredEntries = typeof state.recoveredEntries === "number" ? state.recoveredEntries : 0
  }
  const migrate = envelope.version !== PROJECTS_VERSION
  const used = new Set([
    ...Object.keys(data.legacyAliases),
    ...data.projects.map((project) => project.id.toLowerCase()),
  ])
  // Preserve usable names first so a generated duplicate suffix cannot steal another project's name.
  const desiredNames = new Set(data.projects.map((project) => project.name.toLowerCase()))
  for (const project of data.projects) {
    if (migrate) {
      const base = PROJECT_NAME_PATTERN.test(project.name)
        ? project.name
        : project.name.replace(/[^a-zA-Z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "project"
      let slug = base
      let suffix = 2
      while (used.has(slug.toLowerCase()) || (slug !== project.name && desiredNames.has(slug.toLowerCase()))) {
        slug = `${base}-${suffix++}`
      }
      project.slug = slug
    }
    if (!PROJECT_NAME_PATTERN.test(project.slug) || used.has(project.slug.toLowerCase()))
      throw new Error("Saved project URL names are unreadable or duplicated.")
    used.add(project.slug.toLowerCase())
  }
  return { data, migrate }
}
export function encodeProjects(data: ProjectData) {
  return JSON.stringify({ state: data, version: PROJECTS_VERSION })
}
export function loadProjects(storage: Storage) {
  const raw = storage.getItem(PROJECTS_KEY)
  if (raw === null) return { data: emptyProjects(), raw }
  const { data, migrate } = decodeProjects(raw)
  if (!migrate) return { data, raw }
  // Preserve the original before writing a migration. Storage.setItem is atomic on failure.
  const recoveryKey = JSON.parse(raw).version === 2 ? RECOVERY_V2_KEY : RECOVERY_KEY
  const backup = storage.getItem(recoveryKey)
  if (backup !== null && backup !== raw)
    throw new Error(
      "A different recovery backup already exists. Export both storage values before replacing that backup and retrying."
    )
  if (backup === null) storage.setItem(recoveryKey, raw)
  const next = encodeProjects(data)
  storage.setItem(PROJECTS_KEY, next)
  return { data, raw: next }
}
export function saveProjects(storage: Storage, data: ProjectData, expectedRaw: string | null) {
  if (storage.getItem(PROJECTS_KEY) !== expectedRaw)
    throw new Error("Projects changed in another tab. Reload saved projects before trying again.")
  const raw = encodeProjects(data)
  storage.setItem(PROJECTS_KEY, raw)
  return raw
}
export function resolveProject(data: ProjectData, selector: string): Project | undefined {
  const id = Object.hasOwn(data.legacyAliases, selector) ? data.legacyAliases[selector] : selector
  return (
    data.projects.find((project) => project.id === id) ?? data.projects.find((project) => project.slug === selector)
  )
}
