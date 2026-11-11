import { defineConfig } from "@rspress/core"

export default defineConfig({
  root: "src/pages",
  outDir: "build",
  base: "/",
  siteOrigin: "https://wiki.xraynetwork.io",
  icon: "/xray-blue.svg",
  themeDir: "src/theme",
  title: "XRAY/NETWORK WIKI",
  logo: "/xray-blue.svg",
  logoText: "XRAY/NETWORK WIKI",
  description: "The directory for XRAY projects, developer tools, standards, and mini apps.",
  route: { cleanUrls: true, exclude: ["dev/**", "ecosystem-metrics.mdx", "github-updates.mdx", "install-app-pwa.mdx", "latest-updates.mdx", "mini-apps.mdx", "privacy-policy.mdx", "roadmap.mdx", "social-media.mdx", "terms-of-service.mdx", "xray-app.mdx", "xray-foundation.mdx", "xray-network.mdx", "xray-tokenomics.mdx", "xray-vault.mdx"] },
  themeConfig: {
    fallbackHeadingTitle: false,
    darkMode: "dark",
    enableAppearanceAnimation: false,
    nav: [],
    sidebar: {},
  }
})
