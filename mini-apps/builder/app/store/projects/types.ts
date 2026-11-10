export type Project = {
  id: string
  mode: "local"
  name: string
  slug: string
  url: string
}
export type ProjectInput = Pick<Project, "name" | "url">
export type ProjectData = {
  projects: Project[]
  legacyAliases: Record<string, string>
  recoveredEntries: number
}
