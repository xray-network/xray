import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Alert, Button, Form, Input, Modal, Radio } from "antd"
import { useProjectsStore } from "@/store/projects"
import { validateProject, validateProjectName, resolveProject } from "@/store/projects/persistence"
import { miniAppRoute, projectRoute } from "@/store/projects/routes"
import type { ProjectInput } from "@/store/projects/types"

export default function CreateProject() {
  const { projects, addProject, updateProject, modalProjects, modalProjectsSet, editingId, hydration } =
    useProjectsStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm<ProjectInput>()
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (!modalProjects) return
    const project = projects.find((item) => item.id === editingId)
    form.setFieldsValue({ name: project?.name ?? "", url: project?.url ?? "" })
    setError(null)
  }, [modalProjects, editingId, form])
  const save = (values: ProjectInput) => {
    try {
      if (editingId) {
        const selector = location.pathname.match(/^\/code\/([^/]+)/)?.[1]
        const isActive =
          selector && resolveProject(useProjectsStore.getState(), decodeURIComponent(selector))?.id === editingId
        updateProject(editingId, values)
        const updated = useProjectsStore.getState().projects.find((project) => project.id === editingId)!
        if (isActive)
          void navigate(projectRoute(updated.slug, miniAppRoute(location.pathname, location.search, location.hash)), {
            replace: true,
          })
      } else addProject(values)
      modalProjectsSet(false)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not save project.")
    }
  }
  return (
    <Modal
      title={editingId ? "Edit local project" : "Create project"}
      open={modalProjects}
      onCancel={() => modalProjectsSet(false)}
      footer={null}
      width={550}
    >
      <Form form={form} layout="vertical" onFinish={save} requiredMark={false}>
        <Form.Item label="Development environment">
          <Radio.Group value="local" aria-label="Development environment" disabled={Boolean(editingId)}>
            <Radio.Button value="local">Local development</Radio.Button>
            <Radio.Button value="browser" disabled>
              In-browser · Coming later
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <p className="text-gray-500 mb-5">
          Start your mini app in your own editor and terminal, then enter its development URL to preview it with XRAY.
        </p>
        <Form.Item
          name="name"
          label="Project name"
          extra="Letters, numbers, and hyphens only. The name is used in your project URL."
          rules={[
            {
              validator: async (_, value) => {
                const existing = projects.find((project) => project.id === editingId)
                if (existing && typeof value === "string" && value.trim() === existing.name) return
                validateProjectName(value ?? "", useProjectsStore.getState(), editingId ?? undefined)
              },
            },
          ]}
        >
          <Input placeholder="my-mini-app" size="large" />
        </Form.Item>
        <Form.Item
          name="url"
          label="Development URL"
          rules={[
            {
              validator: async (_, value) => {
                validateProject({ name: "Project", url: value ?? "" })
              },
            },
          ]}
        >
          <Input placeholder="http://localhost:5173" size="large" />
        </Form.Item>
        {error && <Alert className="mb-4" type="error" showIcon title={error} />}
        <Button type="primary" htmlType="submit" size="large" shape="round" disabled={hydration !== "ready"}>
          {editingId ? "Save changes" : "Create project"}
        </Button>
      </Form>
    </Modal>
  )
}
