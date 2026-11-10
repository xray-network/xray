import { create } from "zustand"
import { emptyProjects, loadProjects, saveProjects, validateProject, validateProjectName } from "./persistence"
import type { ProjectData, ProjectInput } from "./types"

interface ProjectsStoreState extends ProjectData {
  hydration: "loading" | "ready" | "error"
  storageError: string | null
  hydrate: () => void
  addProject: (input: ProjectInput) => void
  updateProject: (id: string, input: ProjectInput) => void
  removeProject: (id: string) => void
  modalProjects: boolean
  editingId: string | null
  modalProjectsSet: (open: boolean, id?: string) => void
}
export function createProjectsStore(getStorage: () => Storage = () => window.localStorage) {
  let persistedRaw: string | null = null
  return create<ProjectsStoreState>()((set, get) => {
    const commit = (data: ProjectData) => {
      if (get().hydration !== "ready") throw new Error("Load saved projects before making changes.")
      try {
        persistedRaw = saveProjects(getStorage(), data, persistedRaw)
        set({ ...data, storageError: null })
      } catch (error) {
        const message = error instanceof Error ? error.message : "Browser storage is unavailable."
        set({ storageError: message })
        throw new Error(message)
      }
    }
    const data = (): ProjectData => {
      const { projects, legacyAliases, recoveredEntries } = get()
      return { projects, legacyAliases, recoveredEntries }
    }
    return {
      ...emptyProjects(),
      hydration: "loading",
      storageError: null,
      hydrate: () => {
        try {
          const loaded = loadProjects(getStorage())
          persistedRaw = loaded.raw
          set({ ...loaded.data, hydration: "ready", storageError: null })
        } catch (error) {
          set({
            hydration: "error",
            storageError: error instanceof Error ? error.message : "Browser storage is unavailable.",
          })
        }
      },
      addProject: (input) => {
        const validated = validateProject(input)
        const slug = validateProjectName(validated.name, data())
        commit({
          ...data(),
          projects: [...get().projects, { id: crypto.randomUUID(), mode: "local", ...validated, slug }],
        })
      },
      updateProject: (id, input) => {
        const existing = get().projects.find((project) => project.id === id)
        if (!existing) throw new Error("Project not found.")
        // Existing display names remain editable without forcing an unrelated rename.
        const nameChanged = input.name.trim() !== existing.name
        const validated = validateProject({ ...input, name: nameChanged ? input.name : existing.slug })
        const slug = nameChanged ? validateProjectName(validated.name, data(), id) : existing.slug
        commit({
          ...data(),
          projects: get().projects.map((project) =>
            project.id === id
              ? { ...project, url: validated.url, name: nameChanged ? validated.name : existing.name, slug }
              : project
          ),
        })
      },
      removeProject: (id) => commit({ ...data(), projects: get().projects.filter((project) => project.id !== id) }),
      modalProjects: false,
      editingId: null,
      modalProjectsSet: (open, id) => set({ modalProjects: open, editingId: open ? (id ?? null) : null }),
    }
  })
}
export const useProjectsStore = createProjectsStore()
