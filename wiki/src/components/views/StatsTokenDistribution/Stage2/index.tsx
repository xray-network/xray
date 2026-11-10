import { useState, useEffect } from "react"
import { Skeleton, Table } from "antd"
import Informers from "@/components/informers"
import type { StatsXray, StatsStage2 } from "../../types"
import type { ColumnsType } from "antd/es/table"
import * as Utils from "@/utils"
import style from "../style.module.css"

const columns: ColumnsType<StatsStage2> = [
  {
    title: "#",
    key: "id",
    dataIndex: "id",
    width: "50px",
    render: (record) => <div>{record}</div>,
  },
  {
    title: "Amount",
    key: "amount",
    dataIndex: "amount",
    render: (record) => (
      <div>
        <strong>{Utils.quantityWithCommas(record)} XRAY</strong>
      </div>
    ),
  },
  {
    title: "Date",
    key: "timestamp",
    dataIndex: "timestamp",
    render: (record) => <div>{Utils.dateFormat(record * 1000)}</div>,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    render: (record) => <div>{record}</div>,
  },
  {
    title: "Tx",
    key: "tx_hash",
    dataIndex: "tx_hash",
    render: (record) => (
      <div>
        {record ? (
          <Informers.Text
            value={<span className="font-weight-normal text-muted">{Utils.truncate(record)}</span>}
            copy={record}
          />
        ) : (
          "—"
        )}
      </div>
    ),
  },
]

const Stage2 = () => {
  const [xrayStats, setXrayStats] = useState<StatsXray>()
  const [stage2Stats, setStage2Stats] = useState<StatsStage2[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const requests = [
        fetch("https://graph.xray.app/output/stats/xray-tokenomics"),
        fetch("https://graph.xray.app/output/stats/stage2"),
      ]
      const [xrayStatsResponse, stage2Response] = await Promise.all(requests)
      const [xrayStats, stage2] = await Promise.all([xrayStatsResponse.json(), stage2Response.json()])
      setXrayStats(xrayStats?.data)
      setStage2Stats(stage2)
      setLoading(false)
    }
    getStats()
  }, [])

  const allocated = Number(xrayStats?.tokenomics?.stage2 || 0)
  const distributed = Number(xrayStats?.tokenomics?.stage2_distributed || 0)
  const distributedPct = Number(xrayStats?.tokenomics?.stage2_distributed_pct || 0).toFixed(2)
  const left = Number(xrayStats?.tokenomics?.stage2_left || 0)
  const leftPct = Number(xrayStats?.tokenomics?.stage2_left_pct || 0).toFixed(2)
  const distributionsCount = Number(stage2Stats?.length || 0)

  return (
    <div>
      <p className={style.description}>
        This stage is designed to reward adopters and DApps that are actively using the XRAY token. The distribution is
        handled through a community-driven governance process, where holders can vote on proposals to allocate tokens to
        specific projects or initiatives. This ensures that the distribution is aligned with the needs and interests of
        the community.
      </p>
      <div className="xray-container mb-4">
        {loading && (
          <div>
            <Skeleton active paragraph={{ rows: 2 }} title={false} />
          </div>
        )}
        {!loading && (
          <div className={style.informerContainer}>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(allocated)} XRAY`}
                title="Funds Allocated"
                help="Total funds allocated for this stage"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(left)} XRAY`}
                title="Funds Left"
                help="Total funds left after distribution"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text value={`${leftPct}%`} title="Funds Left, %" help="Total funds left in percentage" />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(distributed)} XRAY`}
                title="Funds Distributed"
                help="Total funds distributed"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${distributedPct}%`}
                title="Funds Distributed, %"
                help="Total funds left in percentage"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(distributionsCount)}`}
                title="Number of distributions"
                help="Number of Distributions made"
              />
            </div>
          </div>
        )}
      </div>
      <div className="xray-table">
        <Table
          rowKey={(i) => i.id}
          dataSource={[...(stage2Stats || [])].reverse()}
          columns={columns}
          size="middle"
          pagination={false}
          locale={{
            emptyText: <div className="py-4 mb-1">No Data</div>,
          }}
        />
      </div>
    </div>
  )
}

export default Stage2
