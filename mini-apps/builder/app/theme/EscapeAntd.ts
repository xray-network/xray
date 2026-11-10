import { useEffect } from "react"
import { App, message as antdMessage, notification as antdNotification } from "antd"

import type { MessageInstance } from "antd/es/message/interface"
import type { NotificationInstance } from "antd/es/notification/interface"

let message: MessageInstance = antdMessage
let notification: NotificationInstance = antdNotification

function EscapeAntd() {
  const staticFunctions = App.useApp()

  useEffect(() => {
    message = staticFunctions.message
    notification = staticFunctions.notification
  }, [staticFunctions.message, staticFunctions.notification])

  return null
}

export { message, notification }

export default EscapeAntd
