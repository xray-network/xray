import { Layout as BasicLayout } from "@rspress/core/theme-original"
import AppLayout from "@/layout"
import "@/styles.css"
import "./theme.css"

const Layout = () => (
  <AppLayout>
    <BasicLayout />
  </AppLayout>
)

export { Layout }
export * from "@rspress/core/theme-original"
export { HeroArtwork } from "./hero/HeroArtwork"
export { HeroDiagram } from "./hero/HeroDiagram"
