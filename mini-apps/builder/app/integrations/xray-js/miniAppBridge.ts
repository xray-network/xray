import {
  protocol,
  type PlatformRequest,
  type PlatformResponse,
  type PlatformEvent,
  type CardanoRequest,
  type CardanoResponse,
  type CardanoEvent,
  type Cip30Request,
  type Cip30Response,
  type Cip30Event,
} from "@xray-network/xray-js/mini-app-bridge"

export type MiniAppClientMessage = PlatformRequest | CardanoRequest | Cip30Request
export type MiniAppHostMessage =
  PlatformResponse | CardanoResponse | Cip30Response | PlatformEvent | CardanoEvent | Cip30Event

type PendingRequest = { scope: string; version: string; method: string; timer: ReturnType<typeof setTimeout> }

interface BridgeOptions {
  iframe: Window | null | undefined
  onClientMessage: (message: MiniAppClientMessage) => void
  onHostMessage: (message: MiniAppHostMessage, requestMethod?: string) => void
  previewOrigin?: string
  hostOrigin?: string
  onStatusResult?: (connected: boolean) => void
}

const parseClientMessage = (value: unknown): MiniAppClientMessage | null => {
  const envelope = protocol.requestMessageSchema.safeParse(value)
  if (!envelope.success) return null
  try {
    switch (envelope.data.scope) {
      case "platform":
        return protocol.parseRequest(protocol.platformV1Contract, value)
      case "cardano":
        return protocol.parseRequest(protocol.cardanoV1Contract, value)
      case "cardano-cip30":
        return protocol.parseRequest(protocol.cardanoCip30V1Contract, value)
      default:
        return null
    }
  } catch {
    return null
  }
}

const parseHostMessage = (value: unknown): MiniAppHostMessage | null => {
  const response = protocol.responseMessageSchema.safeParse(value)
  if (response.success) {
    try {
      switch (response.data.scope) {
        case "platform":
          return protocol.parseResponse(protocol.platformV1Contract, value)
        case "cardano":
          return protocol.parseResponse(protocol.cardanoV1Contract, value)
        case "cardano-cip30":
          return protocol.parseResponse(protocol.cardanoCip30V1Contract, value)
        default:
          return null
      }
    } catch {
      return null
    }
  }
  const event = protocol.eventMessageSchema.safeParse(value)
  if (!event.success) return null
  try {
    switch (event.data.scope) {
      case "platform":
        return protocol.parseEvent(protocol.platformV1Contract, value)
      case "cardano":
        return protocol.parseEvent(protocol.cardanoV1Contract, value)
      case "cardano-cip30":
        return protocol.parseEvent(protocol.cardanoCip30V1Contract, value)
      default:
        return null
    }
  } catch {
    return null
  }
}

const getHostWindow = () =>
  typeof window === "undefined" || !window.parent || window.parent === window ? null : window.parent

export const MAX_PENDING_REQUESTS = 256
export const REQUEST_TIMEOUT_MS = 5_000
export const INTERACTIVE_REQUEST_TIMEOUT_MS = 120_000

export function urlOrigin(url: string) {
  try {
    return new URL(url).origin
  } catch {
    return undefined
  }
}
export function hostOrigin() {
  return typeof document === "undefined" ? undefined : urlOrigin(document.referrer)
}

export const subscribeToMiniAppBridge = ({
  iframe,
  onClientMessage,
  onHostMessage,
  previewOrigin,
  hostOrigin: expectedHostOrigin,
  onStatusResult,
}: BridgeOptions) => {
  const upstreamHost = getHostWindow()
  const pending = new Map<string, PendingRequest>()
  const reset = () => {
    for (const request of pending.values()) clearTimeout(request.timer)
    pending.clear()
  }
  const handleMessage = (event: MessageEvent) => {
    if (iframe && event.source === iframe) {
      if (previewOrigin && event.origin !== previewOrigin) return
      const message = parseClientMessage(event.data)
      if (!message) return
      if (!(message.scope === "platform" && message.method === "routeChanged")) {
        // Reject duplicate IDs rather than letting a second request replace correlation.
        if (pending.has(message.requestId) || pending.size >= MAX_PENDING_REQUESTS) return
        const interactive =
          message.scope === "cardano-cip30"
            ? message.method !== "isEnabled"
            : message.scope === "cardano" && ["signTx", "submitTx", "signData"].includes(message.method)
        const timer = setTimeout(
          () => {
            pending.delete(message.requestId)
            if (message.scope === "platform" && message.method === "getStatus") onStatusResult?.(false)
          },
          interactive ? INTERACTIVE_REQUEST_TIMEOUT_MS : REQUEST_TIMEOUT_MS
        )
        pending.set(message.requestId, {
          scope: message.scope,
          version: message.version,
          method: message.method,
          timer,
        })
      }
      onClientMessage(message)
      return
    }
    if (!upstreamHost || event.source !== upstreamHost) return
    if (expectedHostOrigin && event.origin !== expectedHostOrigin) return
    const message = parseHostMessage(event.data)
    if (!message) return
    if (message.type === "xray.bridge.response") {
      const request = pending.get(message.requestId)
      if (
        !request ||
        request.scope !== message.scope ||
        request.version !== message.version ||
        request.method !== message.method
      )
        return
      const isStatus = request.scope === "platform" && request.method === "getStatus"
      clearTimeout(request.timer)
      pending.delete(message.requestId)
      if (isStatus) onStatusResult?.(message.ok)
      onHostMessage(message, request.method)
      return
    }
    onHostMessage(message)
  }
  window.addEventListener("message", handleMessage)
  const unsubscribe = () => {
    reset()
    window.removeEventListener("message", handleMessage)
  }
  return Object.assign(unsubscribe, { reset })
}

export const forwardToHost = (message: MiniAppClientMessage, origin = hostOrigin()) => {
  getHostWindow()?.postMessage(message, origin && origin !== "null" ? origin : "*")
}
export const forwardToMiniApp = (iframe: Window | null | undefined, message: MiniAppHostMessage, origin?: string) => {
  iframe?.postMessage(message, origin && origin !== "null" ? origin : "*")
}

export const getBridgeMessageLabel = (message: MiniAppClientMessage | MiniAppHostMessage) => {
  if (message.type === "xray.bridge.request") return `${message.scope}/${message.version}.${message.method}`
  if (message.type === "xray.bridge.event") return `${message.scope}/${message.version}.${message.event}`
  return `${message.scope}/${message.version}.${message.method}.${message.ok ? "response" : "error"}`
}
