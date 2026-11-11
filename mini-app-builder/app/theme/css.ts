import { fontFamily, fontFamilyMono, palette, paletteDark, radius, semantic } from "./palette"

type TokenGroup = { [key: string]: string | number | TokenGroup }

const kebab = (key: string) => key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

const toVariables = (tokens: TokenGroup, prefix: string): string[] =>
  Object.entries(tokens).flatMap(([key, value]) => {
    const name = key === "DEFAULT" ? prefix : `${prefix}-${kebab(key)}`
    return typeof value === "object" ? toVariables(value, name) : [`  ${name}: ${value};`]
  })

export const themeCssVariables = [
  ":root {",
  ...toVariables({ ...palette, ...semantic.light }, "--xr"),
  `  --xr-font-sans: ${fontFamily};`,
  `  --xr-font-mono: ${fontFamilyMono};`,
  `  --xr-radius: ${radius.base}px;`,
  `  --xr-radius-lg: ${radius.lg}px;`,
  "}",
  '[data-theme="dark"] {',
  ...toVariables({ ...paletteDark, ...semantic.dark }, "--xr"),
  "}",
].join("\n")
