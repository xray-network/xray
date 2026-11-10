import { defineConfig } from "@rspress/core"
import { pluginSvgr } from "@rsbuild/plugin-svgr"
import { pluginTailwindcss } from "@rsbuild/plugin-tailwindcss"

const sidebar = [
  {
    text: "General",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "XRAY Tokenomics", link: "/xray-tokenomics" },
      { text: "Ecosystem Metrics", link: "/ecosystem-metrics" },
      { text: "Roadmap", link: "/roadmap" },
      { text: "Latest Updates", link: "/latest-updates" },
      { text: "GitHub Updates", link: "/github-updates" },
      { text: "Social Media", link: "/social-media" },
      { text: "Install App (PWA)", link: "/install-app-pwa" },
    ],
  },
  {
    text: "Ecosystem",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "XRAY/Network", link: "/xray-network" },
      { text: "XRAY/Foundation", link: "/xray-foundation" },
      { text: "XRAY/App", link: "/xray-app" },
      { text: "XRAY/Vault", link: "/xray-vault" },
      { text: "Mini Apps", link: "/mini-apps" },
    ],
  },
  {
    text: "Developers",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "XRAY/Builder", link: "/dev/xray-builder" },
      { text: "XRAY/Graph", link: "/dev/xray-graph" },
      { text: "XRAY/Vault", link: "/dev/xray-vault" },
      { text: "Mini Apps SDK", link: "/dev/mini-apps-sdk" },
      { text: "CardanoWeb3.js", link: "/dev/cardano-web3-js" },
    ],
  },
  {
    text: "Legal",
    collapsible: true,
    collapsed: false,
    items: [
      { text: "Terms of Service", link: "/terms-of-service" },
      { text: "Privacy Policy", link: "/privacy-policy" },
    ],
  },
]

export default defineConfig({
  root: "src/pages",
  outDir: "build",
  themeDir: "src/theme",
  title: "Wiki",
  description: "XRAY/Network ecosystem knowledge base and developer documentation.",
  icon: "src/public/favicon.svg",
  logo: "src/public/favicon.svg",
  route: {
    cleanUrls: true,
  },
  builderConfig: {
    html: {
      meta: {
        "theme-color": "#ffffff",
      },
    },
    plugins: [pluginSvgr(), pluginTailwindcss()],
  },
  themeConfig: {
    darkMode: "auto",
    enableAppearanceAnimation: false,
    nav: [
      { text: "Wiki", link: "https://wiki.xraynetwork.io/" },
      { text: "XRAY JS", link: "https://wiki.xraynetwork.io/xray-js/" },
      { text: "Cardano Lib", link: "https://wiki.xraynetwork.io/cardano-lib/" },
    ],
    sidebar: {
      "/": sidebar,
    },
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/xray-network",
      },
    ],
  },
})
