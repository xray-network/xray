import { Popconfirm, Button } from "antd"
import { ArrowUpRightIcon, ExclamationTriangleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router"
import { useProjectsStore } from "@/store/projects"
import ProjectStorageNotice from "@/components/common/ProjectStorageNotice"

export default function Home() {
  const { projects, removeProject, modalProjectsSet, hydration } = useProjectsStore()
  return (
    <div className="mx-auto max-w-4xl p-6 py-10">
      <header className="flex flex-wrap gap-3 items-center mb-8">
        <h1 className="text-2xl font-black me-auto">Mini App Builder</h1>
        <Button href="https://wiki.xraynetwork.io" shape="round" target="_blank" rel="noopener noreferrer">
          Wiki <ArrowUpRightIcon className="size-4" />
        </Button>
        <Button type="primary" shape="round" onClick={() => modalProjectsSet(true)} disabled={hydration !== "ready"}>
          <PlusIcon className="size-4" /> New project
        </Button>
      </header>
      <ProjectStorageNotice />
      <h2 className="text-xl font-bold mt-6 mb-2">Local development</h2>
      <p className="text-gray-500 mb-6">
        Use your own editor and terminal. Connect your development URL to preview your mini app with XRAY.
      </p>
      {hydration === "loading" && <p role="status">Loading saved projects…</p>}
      {hydration === "ready" && !projects.length && (
        <p className="py-8 text-gray-500">No projects yet. Add your development URL to get started.</p>
      )}
      {hydration === "ready" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="relative border border-gray-200 dark:border-gray-800 rounded-2xl p-5 min-w-0"
            >
              <Popconfirm
                title="Remove project?"
                okText="Remove"
                onConfirm={() => {
                  try {
                    removeProject(project.id)
                  } catch {
                    /* Storage notice supplies recovery. */
                  }
                }}
              >
                <Button
                  type="text"
                  shape="circle"
                  aria-label="Remove"
                  title="Remove project"
                  className="absolute! top-3 right-3 text-gray-400! hover:text-red-500!"
                  icon={<XMarkIcon className="size-4" />}
                />
              </Popconfirm>
              <span className="text-xs text-gray-500">Local development</span>
              <h3 className="font-bold text-lg truncate mt-1 pe-10">
                <Link to={`/code/${project.slug}/`}>{project.name}</Link>
              </h3>
              <p className="text-sm text-gray-500 break-all mt-1 mb-5">{project.url}</p>
              <div className="flex flex-wrap gap-2">
                <Link to={`/code/${project.slug}/`}>
                  <Button type="primary" shape="round">
                    Open
                  </Button>
                </Link>
                <Button shape="round" onClick={() => modalProjectsSet(true, project.id)}>
                  Edit
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
      <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
        <h2 className="text-xl font-bold mb-2">
          In-browser development <span className="text-sm font-normal text-gray-500">Coming later</span>
        </h2>
        <p className="text-gray-500 mb-6">Create and edit a mini app directly in your browser.</p>
        <p className="py-8 text-gray-500">No projects yet. In-browser development is coming later.</p>
      </section>
    </div>
  )
}
