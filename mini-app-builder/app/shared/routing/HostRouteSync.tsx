import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { clientPlatformV1 } from "@xray-network/xray-js/mini-app-bridge"

export default function HostRouteSync() {
  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname + location.search + location.hash

  useEffect(() => {
    clientPlatformV1.routeChanged(route)
  }, [route])

  useEffect(
    () =>
      clientPlatformV1.listen("routeChanged", ({ payload: nextRoute }) => {
        if (nextRoute !== route) void navigate(nextRoute, { replace: true })
      }),
    [navigate, route]
  )

  return null
}
