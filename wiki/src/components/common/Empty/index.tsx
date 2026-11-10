import { ReactElement } from "react"
import style from "./style.module.css"

const Empty = ({
  title = "The page is still under development",
  descr = "Our team is working tirelessly to make this page live!",
}: {
  title?: string | ReactElement
  descr?: string | ReactElement
}) => {
  return (
    <div className={style.empty}>
      {title && (
        <div>
          <strong>{title}</strong>
        </div>
      )}
      {descr && <div className={style.item}>{descr}</div>}
    </div>
  )
}

export default Empty
