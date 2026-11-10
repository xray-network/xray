export function miniAppRoute(pathname: string, search = "", hash = "") {
  return (pathname.replace(/^\/code\/[^/]+/, "") || "/") + search + hash
}
export function projectRoute(id: string, route: string) {
  const prefix = `/code/${id}`
  const relative = route === prefix || route.startsWith(`${prefix}/`) ? route.slice(prefix.length) : route
  const path = relative.startsWith("/") ? relative : `/${relative}`
  // Resolve dot segments inside the app before adding its project prefix.
  const app = new URL(path.replace(/^\/+/, "/"), "https://mini-app.invalid")
  return `${prefix}${app.pathname}${app.search}${app.hash}`
}
