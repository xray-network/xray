import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { Tooltip } from "antd"

type CopyState = "idle" | "copied" | "error"

const Copy = ({
  children,
  copy,
  tooltipMessage = "Copy to Clipboard",
  tooltipSuccess = "Copied!",
  tooltipError = "Unable to copy",
}: {
  children: ReactNode
  copy: string
  tooltipMessage?: string
  tooltipSuccess?: string
  tooltipError?: string
}) => {
  const [state, setState] = useState<CopyState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltip = state === "copied" ? tooltipSuccess : state === "error" ? tooltipError : tooltipMessage

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    []
  )

  const resetAfterDelay = useCallback((nextState: CopyState) => {
    setState(nextState)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setState("idle"), 2000)
  }, [])

  const copyToClipboard = useCallback(async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API is unavailable")
      await navigator.clipboard.writeText(copy)
      resetAfterDelay("copied")
    } catch {
      resetAfterDelay("error")
    }
  }, [copy, resetAfterDelay])

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    void copyToClipboard()
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={tooltip}
      onClick={() => void copyToClipboard()}
      onKeyDown={handleKeyDown}
    >
      <Tooltip title={tooltip}>{children}</Tooltip>
    </span>
  )
}

export default Copy
