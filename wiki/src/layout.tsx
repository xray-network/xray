import { useEffect, useState, type ReactNode } from "react"
import { useDark, useLocation } from "@rspress/core/runtime"
import { clientPlatformV1 } from "@xray-network/xray-js/mini-app-bridge"
import AntdTheme from "@/styles/antdTheme"

type Theme = clientPlatformV1.Theme

function MiniAppBridge({ route, onTheme }: { route: string; onTheme: (theme: Theme) => void }) {
  useEffect(() => {
    let active = true
    const stopListening = clientPlatformV1.listen("theme", ({ payload }) => onTheme(payload))

    void clientPlatformV1
      .getTheme()
      .then((message) => {
        if (active && message) onTheme(message.payload)
      })
      .catch(() => undefined)

    return () => {
      active = false
      stopListening()
    }
  }, [onTheme])

  useEffect(() => {
    clientPlatformV1.routeChanged(route)
  }, [route])

  return null
}

export default function Layout({ children }: { children: ReactNode }) {
  const isDark = useDark()
  const location = useLocation()
  const route = location.pathname + location.search + location.hash
  const [mounted, setMounted] = useState(false)
  const [hostTheme, setHostTheme] = useState<Theme>()
  const theme: Theme = hostTheme ?? (isDark ? "dark" : "light")

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const html = document.documentElement
    html.classList.toggle("rp-dark", theme === "dark")
    html.classList.toggle("dark", theme === "dark")
    html.classList.toggle("light", theme === "light")
  }, [theme])

  return (
    <AntdTheme theme={theme}>
      {mounted && <MiniAppBridge route={route} onTheme={setHostTheme} />}
      {children}
    </AntdTheme>
  )
}
