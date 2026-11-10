import React, { useEffect, useState } from "react"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { StatsGithub } from "../types"
import * as Utils from "@/utils"
import style from "./style.module.css"

const columns: ColumnsType<StatsGithub> = [
  {
    title: "Author",
    dataIndex: "author_avatar",
    key: "author_avatar",
    width: "60px",
    render: (record, records) => (
      <div>
        <a href={records.author_url}>
          <img src={record} alt={records.author} className={style.avatar} />
        </a>
      </div>
    ),
  },
  {
    title: "Repository",
    dataIndex: "repo",
    key: "repo",
    render: (record, records) => (
      <div>
        <div>
          <a href={records.branch_url}>{records.repo_name}</a>
        </div>
        <div className="font-size-12">Branch: {records.branch_name}</div>
      </div>
    ),
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    render: (record) => <span className="text-wrap">{record}</span>,
  },
  {
    title: "Commit",
    dataIndex: "sha",
    key: "sha",
    render: (record, records) => <a href={records.url}>{record.substring(0, 7)}</a>,
  },
  {
    title: "Visibility",
    dataIndex: "repo",
    key: "repo",
    render: (record, records) => (records.repo_private ? "Private" : "Public"),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (record) => {
      return Utils.dateFormatWithTime(record)
    },
  },
]

const GithubUpdates = () => {
  const [githubStats, setGithubStats] = useState<StatsGithub[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const githubStatsResponse = await fetch("https://graph.xray.app/output/stats/git-commits")
      const githubStats = await githubStatsResponse.json()
      setGithubStats(githubStats?.data)
      setLoading(false)
    }
    getStats()
  }, [])

  return (
    <div className="shared-table-with-pagination">
      <Table
        rowKey={(i) => Utils.randomString()}
        dataSource={githubStats}
        columns={columns}
        size="middle"
        pagination={{
          position: ["bottomRight", "topRight"],
          size: "default",
          showSizeChanger: true,
          showPrevNextJumpers: false,
          defaultPageSize: 25,
          pageSizeOptions: [25, 50, 100],
          showTotal: (total) => <div>{Utils.quantityWithCommas(total)} Commits</div>,
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

export default GithubUpdates
