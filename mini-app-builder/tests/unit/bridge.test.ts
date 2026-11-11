import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  MAX_PENDING_REQUESTS,
  REQUEST_TIMEOUT_MS,
  INTERACTIVE_REQUEST_TIMEOUT_MS,
  getBridgeMessageLabel,
  subscribeToMiniAppBridge,
} from "../../app/integrations/xray-js/miniAppBridge"
const context = { blockchain: "cardano", network: "preview" }
const request = (requestId = "status", scope = "platform", method = "getStatus", payload: unknown = null) => ({
  type: "xray.bridge.request",
  scope,
  version: "v1",
  method,
  requestId,
  payload,
})
const response = (
  requestId = "status",
  scope = "platform",
  payload: unknown = { host: "xray.app" },
  method = "getStatus"
) => ({
  type: "xray.bridge.response",
  scope,
  version: "v1",
  requestId,
  method,
  ok: true,
  payload,
  context,
})
let frame: HTMLIFrameElement
let host: Window
let client = vi.fn(),
  upstream = vi.fn(),
  status = vi.fn()
let stop: ReturnType<typeof subscribeToMiniAppBridge>
const send = (
  source: Window,
  data: unknown,
  origin = source === host ? "https://host.test" : "http://localhost:7220"
) => window.dispatchEvent(new MessageEvent("message", { source, data, origin }))
beforeEach(() => {
  vi.useFakeTimers()
  frame = document.createElement("iframe")
  document.body.append(frame)
  host = {} as Window
  vi.stubGlobal("parent", host)
  client = vi.fn()
  upstream = vi.fn()
  status = vi.fn()
  stop = subscribeToMiniAppBridge({
    iframe: frame.contentWindow,
    previewOrigin: "http://localhost:7220",
    hostOrigin: "https://host.test",
    onClientMessage: client,
    onHostMessage: upstream,
    onStatusResult: status,
  })
})
afterEach(() => {
  stop()
  frame.remove()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})
describe("expected-window relay", () => {
  it("identifies out-of-order responses by request ID without changing their messages", () => {
    send(frame.contentWindow!, request("theme", "platform", "getTheme"))
    send(frame.contentWindow!, request("status"))
    send(frame.contentWindow!, request("tip", "cardano", "getTip"))
    const replies = [
      response("tip", "cardano", null, "getTip"),
      response("status"),
      response("theme", "platform", "dark", "getTheme"),
    ]
    for (const reply of replies) send(host, reply)
    expect(upstream.mock.calls.map(([message]) => message)).toEqual(replies)
    expect(upstream.mock.calls.map(([message, method]) => getBridgeMessageLabel(message))).toEqual([
      "cardano/v1.getTip.response",
      "platform/v1.getStatus.response",
      "platform/v1.getTheme.response",
    ])
  })
  it("confirms only the preview's correlated successful getStatus", () => {
    send(host, response())
    expect(status).not.toHaveBeenCalled()
    send(frame.contentWindow!, request())
    expect(client).toHaveBeenCalledOnce()
    expect(status).not.toHaveBeenCalled()
    send(host, response())
    expect(upstream).toHaveBeenCalledOnce()
    expect(status).toHaveBeenCalledWith(true)
    send(host, response())
    expect(upstream).toHaveBeenCalledOnce()
  })
  it("rejects wrong windows, origins, identities, scopes, and versions", () => {
    send(window, request())
    send(frame.contentWindow!, request(), "https://wrong.test")
    expect(client).not.toHaveBeenCalled()
    send(frame.contentWindow!, request())
    send(window, response())
    send(host, response(), "https://wrong.test")
    send(host, response("status", "cardano"))
    send(host, { ...response(), version: "v2" })
    send(host, response("status", "platform", { host: "other" }))
    send(host, { ...response(), context: { blockchain: "other", network: "preview" } })
    expect(upstream).not.toHaveBeenCalled()
    expect(status).not.toHaveBeenCalled()
    send(host, response())
    expect(status).toHaveBeenCalledWith(true)
  })
  it.each([
    ["platform", "getTheme", null],
    ["platform", "routeChanged", "/path"],
    ["cardano", "getTip", null],
    ["cardano", "signData", { address: "addr", data: "abc" }],
    ["cardano-cip30", "enable", { extensions: [{ cip: 95 }] }],
    ["cardano-cip30", "getUtxos", { paginate: { page: 0, limit: 10 } }],
    ["cardano-cip30", "signTx", { tx: "tx", partialSign: true }],
  ])("preserves %s.%s", (scope, method, payload) => {
    send(frame.contentWindow!, request("r", scope as string, method as string, payload))
    expect(client).toHaveBeenCalledOnce()
    if (method !== "routeChanged") {
      const value =
        scope === "platform"
          ? "dark"
          : method === "signData"
            ? { data: "signed" }
            : method === "enable"
              ? true
              : method === "signTx"
                ? "witnesses"
                : null
      send(host, response("r", scope as string, value, method as string))
      expect(upstream).toHaveBeenCalledOnce()
    }
    expect(status).not.toHaveBeenCalled()
  })
  it.each([
    { ...request(), extra: true },
    { ...request(), requestId: "" },
    { ...request(), method: "unknown" },
    request("r", "platform", "getStatus", {}),
    request("r", "cardano", "signData", { address: "a" }),
    request("r", "cardano-cip30", "signTx", { tx: "x", partialSign: "yes" }),
  ])("ignores malformed requests", (message) => {
    send(frame.contentWindow!, message)
    expect(client).not.toHaveBeenCalled()
  })
  it("rejects duplicates and bounds pending requests without evicting existing ones", () => {
    send(frame.contentWindow!, request("r"))
    send(frame.contentWindow!, request("r", "cardano", "getTip"))
    for (let i = 1; i < MAX_PENDING_REQUESTS + 2; i++) send(frame.contentWindow!, request(String(i)))
    expect(client).toHaveBeenCalledTimes(MAX_PENDING_REQUESTS)
    send(host, response("r"))
    expect(status).toHaveBeenCalledWith(true)
    vi.advanceTimersByTime(REQUEST_TIMEOUT_MS)
    send(frame.contentWindow!, request("new"))
    expect(client).toHaveBeenCalledTimes(MAX_PENDING_REQUESTS + 1)
  })
  it("expires requests and rejects responses after a session reset", () => {
    send(frame.contentWindow!, request())
    vi.advanceTimersByTime(REQUEST_TIMEOUT_MS)
    expect(status).toHaveBeenCalledWith(false)
    send(host, response())
    expect(upstream).not.toHaveBeenCalled()
    send(frame.contentWindow!, request("second"))
    stop.reset()
    send(host, response("second"))
    expect(upstream).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })
  it("relays errors without showing connected", () => {
    send(frame.contentWindow!, request())
    send(host, {
      type: "xray.bridge.response",
      scope: "platform",
      version: "v1",
      requestId: "status",
      method: "getStatus",
      ok: false,
      error: { code: "HOST_ERROR", message: "Unavailable" },
    })
    expect(upstream).toHaveBeenCalledOnce()
    expect(status).toHaveBeenCalledWith(false)
    const [message, method] = upstream.mock.calls[0]
    expect(getBridgeMessageLabel(message)).toBe("platform/v1.getStatus.error")
  })
  it("relays validated events only from the host and cleans up", () => {
    const event = {
      type: "xray.bridge.event",
      scope: "platform",
      version: "v1",
      event: "status",
      payload: { host: "xray.app" },
      context,
    }
    send(window, event)
    send(host, { ...event, payload: { host: "other" } })
    expect(upstream).not.toHaveBeenCalled()
    send(host, event)
    expect(upstream).toHaveBeenCalledOnce()
    const [message, method] = upstream.mock.calls[0]
    expect(getBridgeMessageLabel(message)).toBe("platform/v1.status")
    expect(status).not.toHaveBeenCalled()
    stop()
    send(frame.contentWindow!, request())
    expect(client).not.toHaveBeenCalled()
  })
  it("rejects obsolete and wrong-method replies and preserves new error codes", () => {
    send(frame.contentWindow!, request("theme", "platform", "getTheme"))
    const current = response("theme", "platform", "dark", "getTheme")
    const { ok, method, payload, ...legacy } = current
    send(host, { ...legacy, result: payload })
    send(host, { ...current, method: "getLocale" })
    send(host, { ...current, payload: 42 })
    expect(upstream).not.toHaveBeenCalled()
    const { context: ignoredContext, ...metadata } = legacy
    send(host, { ...metadata, method, ok: false, error: { code: "OPERATION_FAILED", message: "Unavailable" } })
    expect(upstream).toHaveBeenCalledOnce()
  })
  it("keeps interactive correlation open beyond the ordinary request deadline", () => {
    send(frame.contentWindow!, request("sign", "cardano", "signTx", "unsigned"))
    vi.advanceTimersByTime(REQUEST_TIMEOUT_MS + 1)
    send(host, response("sign", "cardano", { hash: "hash", cbor: "signed", witnessSet: "witnesses" }, "signTx"))
    expect(upstream).toHaveBeenCalledOnce()
    send(frame.contentWindow!, request("late", "cardano-cip30", "enable", { extensions: [] }))
    vi.advanceTimersByTime(INTERACTIVE_REQUEST_TIMEOUT_MS)
    send(host, response("late", "cardano-cip30", true, "enable"))
    expect(upstream).toHaveBeenCalledOnce()
    expect(vi.getTimerCount()).toBe(0)
  })
})
