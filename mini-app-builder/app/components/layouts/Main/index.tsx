import { Outlet } from "react-router"
import CreateProject from "@/components/modals/CreateProject"

export default function LayoutMain() {
  return (
    <>
      <Outlet />
      <CreateProject />
    </>
  )
}
