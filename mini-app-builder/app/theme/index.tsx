import { useEffect } from "react"
import { App, ConfigProvider } from "antd"
import { HappyProvider } from "@ant-design/happy-work-theme"
import {
  ArrowPathIcon,
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useEffectiveTheme } from "@/integrations/xray-js/useEffectiveSettings"
import EscapeAntd from "./EscapeAntd"
import { darkTheme, lightTheme } from "./antd"
import { metaThemeColor } from "./palette"

const statusIcons = {
  successIcon: <CheckCircleIcon className="size-5 shrink-0" />,
  infoIcon: <InformationCircleIcon className="size-5 shrink-0" />,
  warningIcon: <ExclamationTriangleIcon className="size-5 shrink-0" />,
  errorIcon: <ExclamationCircleIcon className="size-5 shrink-0" />,
}
const closeIcon = <XMarkIcon className="size-5" />
const loadingIcon = <ArrowPathIcon className="size-5 animate-spin motion-reduce:animate-none" />

export default function Theme({ children }: { children: React.ReactNode }) {
  const theme = useEffectiveTheme()

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute("data-disable-transitions", "true")
    html.setAttribute("data-theme", theme)
    html.querySelector("meta[name='theme-color']")?.setAttribute("content", metaThemeColor[theme])
    const timeout = window.setTimeout(() => html.removeAttribute("data-disable-transitions"), 500)
    return () => window.clearTimeout(timeout)
  }, [theme])

  return (
    <ConfigProvider
      theme={theme === "dark" ? darkTheme : lightTheme}
      alert={{ ...statusIcons, closeIcon }}
      modal={{ ...statusIcons, closeIcon }}
      button={{ loadingIcon }}
      spin={{ indicator: loadingIcon }}
      tabs={{ more: { icon: <EllipsisHorizontalIcon className="size-5" /> } }}
    >
      <HappyProvider>
        <App>
          <EscapeAntd />
          {children}
        </App>
      </HappyProvider>
    </ConfigProvider>
  )
}
