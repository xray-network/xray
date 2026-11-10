import type { Sidebar } from "@rspress/core"

export const documentationSections = [
  {
    text: "Docs",
    href: "/",
    paths: ["/", "/adr"],
    icon: "M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9",
    sidebar: [
      { sectionHeaderText: "Overview" },
      { text: "XRAY Cardano Lib", link: "/" },
      { sectionHeaderText: "Architecture decisions" },
      {
        text: "Repository",
        collapsed: true,
        items: [
          { text: "Legacy XRAY adoption", link: "/adr/repository/0001-xray-updates-standard" }
        ]
      },
      {
        text: "TypeScript",
        collapsed: true,
        items: [
          { text: "Lossless CBOR and encoding metadata", link: "/adr/typescript/0001-lossless-cbor-and-encoding-metadata" },
          { text: "Cryptography dependency policy", link: "/adr/typescript/0002-cryptography-dependency-policy" },
          { text: "Upstream evidence and package ownership", link: "/adr/typescript/0003-upstream-evidence-and-package-ownership" },
          { text: "Cryptography primitives", link: "/adr/typescript/0004-cryptography-primitives" },
          { text: "Conway duplicate map keys", link: "/adr/typescript/0005-conway-duplicate-map-keys" }
        ]
      }
    ]
  }
] satisfies { text: string; href: string; paths: string[]; icon: string; sidebar: Sidebar[string] }[]
