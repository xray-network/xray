import React, { useState, useEffect } from "react"
import { Skeleton, Table } from "antd"
import Informers from "@/components/informers"
import type { StatsXray, StatsDevFund } from "../../types"
import type { ColumnsType } from "antd/es/table"
import * as Utils from "@/utils"
import style from "../style.module.css"

const columns: ColumnsType<StatsDevFund> = [
  {
    title: "#",
    key: "id",
    dataIndex: "id",
    width: "50px",
    render: (record, records, index) => <div>{record}</div>,
  },
  {
    title: "Amount",
    key: "amount",
    dataIndex: "amount",
    render: (record, records) => (
      <div>
        <strong>{Utils.quantityWithCommas(record)} XRAY</strong>
      </div>
    ),
  },
  {
    title: "Date",
    key: "timestamp",
    dataIndex: "timestamp",
    render: (record, records) => <div>{record ? Utils.dateFormat(record * 1000) : "—"}</div>,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    render: (record, records) => <div>{record}</div>,
  },
  {
    title: "Tx",
    key: "tx_hash",
    dataIndex: "tx_hash",
    render: (record, records) => (
      <div>{record ? <Informers.Text value={<span>{Utils.truncate(record)}</span>} copy={record} /> : "—"}</div>
    ),
  },
]

const DevFund = () => {
  const [xrayStats, setXrayStats] = useState<StatsXray>()
  const [devFundStats, setDevFundStats] = useState<StatsDevFund[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const requests = [
        fetch("https://graph.xray.app/output/stats/xray-tokenomics"),
        fetch("https://graph.xray.app/output/stats/dev-fund"),
      ]
      const [xrayStatsResponse, devFundResponse] = await Promise.all(requests)
      const [xrayStats, devFund] = await Promise.all([xrayStatsResponse.json(), devFundResponse.json()])
      setXrayStats(xrayStats?.data)
      setDevFundStats(devFund)
      setLoading(false)
    }
    getStats()
  }, [])

  const allocated = Number(xrayStats?.tokenomics?.dev_fund || 0)
  const distributed = Number(xrayStats?.tokenomics?.dev_fund_distributed || 0)
  const distributedPct = Number(xrayStats?.tokenomics?.dev_fund_distributed_pct || 0).toFixed(2)
  const left = Number(xrayStats?.tokenomics?.dev_fund_left || 0)
  const leftPct = Number(xrayStats?.tokenomics?.dev_fund_left_pct || 0).toFixed(2)
  const distributionsCount = Number(devFundStats?.length || 0)

  return (
    <div>
      <p className={style.description}>
        The XRAY/Network Dev & Marketing Fund is a dedicated allocation of XRAY tokens reserved to support the ongoing
        development, maintenance, and growth of the XRAY ecosystem. This fund is used to incentivize developers,
        contribute to protocol upgrades, finance infrastructure improvements, and accelerate innovation across the
        platform.
      </p>
      <div className="mb-4">
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
                title="Number of Distributions"
                help="Number of distributions made"
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <Table
          rowKey={(i) => i.id}
          dataSource={[...(devFundStats || [])].reverse()}
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

export default DevFund
