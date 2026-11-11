import { Alert, Button } from "antd"
import { useProjectsStore } from "@/store/projects"
export default function ProjectStorageNotice() {
  const { storageError, recoveredEntries, hydrate } = useProjectsStore()
  if (storageError)
    return (
      <Alert
        type="error"
        showIcon
        title="Projects could not be saved or loaded"
        description={
          <>
            <p>
              {storageError} Original saved data is retained. See README recovery instructions before editing browser
              storage.
            </p>
            <Button shape="round" onClick={hydrate}>
              Reload saved projects
            </Button>
          </>
        }
      />
    )
  if (recoveredEntries)
    return (
      <Alert
        type="warning"
        showIcon
        title="Some saved entries need repair"
        description={`${recoveredEntries} invalid entries were kept in the recovery backup. Valid projects are available below. See README to export and repair the backup.`}
      />
    )
  return null
}
