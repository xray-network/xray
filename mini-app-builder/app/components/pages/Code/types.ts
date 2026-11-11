export interface EventLogEntry {
  id: string
  type: string
  direction: "client" | "host"
  timestamp: number
  payload: unknown
}
