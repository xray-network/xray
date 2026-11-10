import React, { useState, useEffect } from "react"
import { Timeline, Tooltip } from "antd"
import classNames from "classnames"
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline"
import style from "./style.module.css"

export type TimelineItem = {
  year: string
  title: string
  data: TimelineData[]
}

export type TimelineData = {
  status: "in_progress" | "completed"
  title: string
  description?: string
  areas?: string[]
  items?: {
    status: "in_progress" | "awaiting" | "completed"
    type: string
    description: string
  }[]
}

const RoadmapSection = ({ items }: { items: TimelineData[] }) => {
  const getStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed:"
      case "in_progress":
        return "In Progress:"

      default:
        return "Awaiting:"
    }
  }

  return (
    <Timeline
      className={style.roadmap}
      items={items.map((item, index) => {
        return {
          dot:
            item.status === "completed" ? (
              <CheckCircleIcon className="size-7 text-green-500" strokeWidth={2} />
            ) : (
              <ClockIcon className="size-7 text-blue-500" strokeWidth={2} />
            ),
          children: (
            <div key={index}>
              <strong className="text-xl">{item.title}</strong>
              {(item?.areas?.length || 0) > 0 && (
                <div className="pt-2 text-gray-500">
                  {item.areas?.map((area, index) => (
                    <span className="shared-tag shared-tag-gray me-2 mb-2" key={index}>
                      {area}
                    </span>
                  ))}
                </div>
              )}
              {item.description && <div className="text-gray-500 mb-3">{item.description}</div>}
              {(item.items?.length || 0) > 0 && (
                <div className="text-gray-500">
                  <ol className="mb-5">
                    {item.items?.map((subItem, index) => (
                      <li key={index} className="border-b border-gray-200 dark:border-gray-800">
                        <small>{getStatus(subItem.status)}</small> {subItem.description}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ),
        }
      })}
    />
  )
}

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState<TimelineItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const roadmapItemsResponse = await fetch(
        "https://raw.githubusercontent.com/xray-network/projects-map/refs/heads/main/data/roadmap.json"
      )
      const roadmapItemsData = await roadmapItemsResponse.json()
      setRoadmapItems(roadmapItemsData)
      setLoading(false)
    }
    getStats()
  }, [])

  return (
    <div>
      {roadmapItems.map((item, index) => {
        return (
          <div key={index} className="mb-10">
            <h4 className="text-2xl text-black dark:text-white mb-5">
              {item.year} — {item.title}
            </h4>
            <RoadmapSection items={item.data} />
          </div>
        )
      })}
    </div>
  )
}

export default Roadmap
