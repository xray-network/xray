import React, { ReactElement } from "react"
import { Col, Row } from "antd"
import { SVGX, SVGTelegram, SVGDiscord, SVGBluesky, SVGMedium, SVGYoutube, SVGGithub } from "@/components/svg"
import style from "./style.module.css"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"

const list: { icon: ReactElement; social: string; username: string; url: string }[] = [
  {
    icon: <SVGX />,
    social: "X",
    username: "@xray_network",
    url: "https://x.com/xray_network",
  },
  {
    icon: <SVGTelegram />,
    social: "Telegram",
    username: "@xray_community",
    url: "https://t.me/xray_community",
  },
  {
    icon: <SVGDiscord />,
    social: "Discord",
    username: "XRAY/Network",
    url: "https://discord.gg/WhZmm46APN",
  },
  {
    icon: <SVGBluesky />,
    social: "Bluesky",
    username: "@xray-network",
    url: "https://bsky.app/profile/xray-network.bsky.social",
  },
  {
    icon: <SVGMedium />,
    social: "Medium",
    username: "@xray-network",
    url: "https://xray-network.medium.com",
  },
  {
    icon: <SVGYoutube />,
    social: "YouTube",
    username: "@xray-network",
    url: "https://www.youtube.com/@xray-network",
  },
  {
    icon: <SVGGithub />,
    social: "GitHub",
    username: "@xray-network",
    url: "https://github.com/xray-network",
  },
]

const SocialMedia = () => {
  return (
    <Row gutter={[24, 24]}>
      {list.map((item, index) => (
        <Col xs={24} sm={12} key={index}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={style.item}>
            <div className="flex items-center">
              <span className={style.itemIcon}>{item.icon}</span>
              <span className={style.itemTitle}>
                <small>{item.username}</small>
                <span>{item.social}</span>
              </span>
            </div>
            <ArrowUpRightIcon className={style.ext} strokeWidth={2} />
          </a>
        </Col>
      ))}
    </Row>
  )
}

export default SocialMedia
