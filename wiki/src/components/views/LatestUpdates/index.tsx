import React, { useEffect, useState } from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import * as Utils from "@/utils"

type LatestUpdatesProp = {
  date: string
  items: string[]
}

const columns: ColumnsType<LatestUpdatesProp> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "60px",
    render: (record) => {
      return Utils.dateFormat(record)
    },
  },
  {
    title: "Update",
    dataIndex: "items",
    key: "items",
    render: (record, records) => (
      <div>
        {records.items.length > 0 && (
          <ol className="mb-0 ps-4">
            {records.items.map((item, index) => (
              <li key={index} className="text-wrap mb-0">
                <span>{item}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    ),
  },
]

const LatestUpdates = () => {
  const [latestUpdates, setLatestUpdates] = useState<LatestUpdatesProp[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const latestUpdatesResponse = await fetch(
        "https://raw.githubusercontent.com/xray-network/projects-map/refs/heads/main/data/latest_updates.json"
      )
      const latestUpdatesData = await latestUpdatesResponse.json()
      setLatestUpdates(latestUpdatesData)
      setLoading(false)
    }
    getStats()
  }, [])

  return (
    <div className="shared-table-with-pagination">
      <Table
        rowKey={(i) => Utils.randomString()}
        dataSource={latestUpdates}
        columns={columns}
        size="middle"
        pagination={{
          position: ["bottomRight", "topRight"],
          size: "default",
          showSizeChanger: true,
          showPrevNextJumpers: false,
          defaultPageSize: 25,
          pageSizeOptions: [25, 50, 100],
          showTotal: (total) => <div>{Utils.quantityWithCommas(total)} Records</div>,
        }}
        loading={{
          spinning: loading,
          indicator: <i className="xray-spinner" />,
        }}
        locale={{
          emptyText: <div className="py-4 mb-1">No Data</div>,
        }}
      />
    </div>
  )
}

export default LatestUpdates
