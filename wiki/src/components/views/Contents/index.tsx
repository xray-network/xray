import { Row, Col } from "antd"
import { menuConfig } from "@/config/menu"
import { Link } from "@rspress/core/runtime"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import style from "./style.module.css"

const Contents = () => {
  return (
    <div>
      {menuConfig.map((section, index) => {
        if (section.link === "/") return null
        return (
          <div key={index}>
            <div className={style.title}>{section.text}</div>
            <div className={style.section}>
              <Row gutter={[24, 24]}>
                {section.items?.map((item, index) => (
                  <Col xs={24} sm={12} key={index} className="mb-4">
                    <Link to={item.link} className={style.link}>
                      <div className={style.linkIcon}>{item.icon}</div>
                      <div className={style.linkContent}>
                        <div className={style.linkTitle}>{item.text}</div>
                        <div className={style.linkDescr}>{item.description}</div>
                      </div>
                      <ArrowRightIcon className={style.linkArrow} strokeWidth={2} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Contents
