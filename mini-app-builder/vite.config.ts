import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import wasm from "vite-plugin-wasm"
import svgr from "vite-plugin-svgr"
import { fileURLToPath } from "node:url"

export default defineConfig({
  plugins: [wasm(), tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./app", import.meta.url)) },
  },
  ssr: {
    noExternal: [/^@xray-network\/xray-js(?:\/|$)/],
  },
})
