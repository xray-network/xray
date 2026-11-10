import http from "node:http"
import { readFile } from "node:fs/promises"
const servers = []
for (const [port, filename] of [
  [7211, "host.html"],
  [7212, "preview.html"],
]) {
  const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    if (req.url.startsWith("/blocked")) res.setHeader("Content-Security-Policy", "frame-ancestors 'none'")
    res.end(await readFile(new URL(filename, import.meta.url)))
  })
  server.listen(port, "127.0.0.1")
  servers.push(server)
}
const stop = () => {
  for (const server of servers) server.close()
  process.exit(0)
}
process.on("SIGINT", stop)
process.on("SIGTERM", stop)
