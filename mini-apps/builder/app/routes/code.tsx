import type { Route } from "./+types/code"
import Code from "@/components/pages/Code"

export default function CodePage({ loaderData, actionData, params, matches }: Route.ComponentProps) {
  return <Code id={params.id} />
}
