import { defineConfig } from "@rspress/core"

export default defineConfig({
  root: "src/pages",
  outDir: "build/mini-apps/cardano-wallet",
  base: "/mini-apps/cardano-wallet/",
  siteOrigin: "https://wiki.xraynetwork.io",
  icon: "/xray-blue.svg",
  themeDir: "src/theme",
  title: "Cardano Wallet",
  logo: "/xray-blue.svg",
  logoText: "CARDANO WALLET",
  description: "Your Cardano wallet inside XRAY App.",
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
