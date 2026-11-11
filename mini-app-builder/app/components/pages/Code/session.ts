export const CONNECTION_WAIT_MS = 10_000
export const MAX_EVENTS = 200
export type PreviewState = { loaded: boolean; sdkSeen: boolean; connected: boolean; timedOut: boolean }
export const initialPreviewState = (): PreviewState => ({
  loaded: false,
  sdkSeen: false,
  connected: false,
  timedOut: false,
})
export type PreviewEvent = "loaded" | "sdk" | "connected" | "unavailable" | "timeout" | "reset"
export function previewReducer(state: PreviewState, event: PreviewEvent): PreviewState {
  switch (event) {
    case "loaded":
      return { ...state, loaded: true }
    case "sdk":
      return { ...state, sdkSeen: true }
    case "connected":
      return { ...state, sdkSeen: true, connected: true, timedOut: false }
    case "unavailable":
      return { ...state, connected: false, timedOut: true }
    case "timeout":
      return state.connected ? state : { ...state, timedOut: true }
    case "reset":
      return initialPreviewState()
  }
}
export function connectionLabel(state: PreviewState, embedded: boolean) {
  if (!embedded) return "Standalone · XRAY host unavailable"
  if (state.connected) return "Connected to XRAY"
  if (state.timedOut) return "XRAY connection unavailable"
  if (state.sdkSeen) return "SDK detected · Waiting for XRAY"
  if (!state.loaded) return "Loading preview"
  return "Waiting for SDK activity"
}
