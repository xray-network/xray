import { defineConfig } from "@rspress/core"

export default defineConfig({
  root: "src/pages",
  outDir: "build/mini-apps/cardano-assets",
  base: "/mini-apps/cardano-assets/",
  siteOrigin: "https://wiki.xraynetwork.io",
  icon: "/xray-blue.svg",
  themeDir: "src/theme",
  title: "Cardano Assets",
  logo: "/xray-blue.svg",
  logoText: "CARDANO ASSETS",
  description: "Explore your Cardano assets inside XRAY App.",
  route: { cleanUrls: true },
  themeConfig: {
    fallbackHeadingTitle: false,
    darkMode: "dark",
    enableAppearanceAnimation: false,
    nav: [{
        text: "Back to Wiki",
        link: "https://wiki.xraynetwork.io/",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h14"/></svg>',
        position: "left"
      }],
    sidebar: {},
  }
})
