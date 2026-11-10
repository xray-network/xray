declare module "*.css" {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react"

  const Component: FunctionComponent<SVGProps<SVGSVGElement>>
  export default Component
}
