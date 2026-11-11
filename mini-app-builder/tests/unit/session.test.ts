import { expect, it } from "vitest"
import { connectionLabel, initialPreviewState, previewReducer } from "../../app/components/pages/Code/session"
it("does not confuse load, SDK activity, or host presence with a confirmed round trip", () => {
  let s = initialPreviewState()
  expect(connectionLabel(s, true)).toBe("Loading preview")
  s = previewReducer(s, "loaded")
  expect(connectionLabel(s, true)).toBe("Waiting for SDK activity")
  s = previewReducer(s, "sdk")
  expect(connectionLabel(s, true)).toBe("SDK detected · Waiting for XRAY")
  s = previewReducer(s, "timeout")
  expect(connectionLabel(s, true)).toBe("XRAY connection unavailable")
  s = previewReducer(s, "connected")
  expect(connectionLabel(s, true)).toBe("Connected to XRAY")
  expect(connectionLabel(s, false)).toContain("Standalone")
  expect(previewReducer(s, "timeout")).toBe(s)
  s = previewReducer(s, "unavailable")
  expect(s.connected).toBe(false)
  expect(previewReducer(s, "reset")).toEqual(initialPreviewState())
})
