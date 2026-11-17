import "./theme.css"
import { createElement, forwardRef, Fragment } from "react"
import { Layout as DefaultLayout, Link as DefaultLink, type LayoutProps, type LinkProps } from "@rspress/core/theme-original"
import pkg from "../../package.json"

// The wiki's version from its package.json (bumped by hand or by an agent on release), before the search box.
export const Layout = (props: LayoutProps) =>
  createElement(DefaultLayout, {
    ...props,
    beforeNavMenu: createElement(Fragment, null, pkg.version ? createElement("span", { className: "wiki-version" }, `v${pkg.version}`) : null, props.beforeNavMenu),
  })

// Each wiki is an independent app. Cross-wiki links must load its own router.
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) =>
  createElement(DefaultLink, {
    ...props,
    ref,
    ...(props.href?.startsWith("https://wiki.xraynetwork.io") ? { target: "_self" } : {})
  })
)
Link.displayName = "Link"

export * from "@rspress/core/theme-original"
export { HeroArtwork } from "./hero/HeroArtwork"
