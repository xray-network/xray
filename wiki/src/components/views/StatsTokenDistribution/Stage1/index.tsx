import React, { useEffect, useState } from "react"
import { Tabs, Skeleton, Table } from "antd"
import Informers from "@/components/informers"
import type { StatsXray, StatsStage1 } from "../../types"
import * as Utils from "@/utils"
import ChartIspoSchedule from "./ChartIspoSchedule"
import ChartStakeSchedule from "./ChartStakeSchedule"
import TableParticipants from "./TableParticipants"
import style from "../style.module.css"

const Stage1 = () => {
  const [xrayStats, setXrayStats] = useState<StatsXray>()
  const [stage1Stats, setStage1Stats] = useState<StatsStage1>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const requests = [
        fetch("https://graph.xray.app/output/stats/xray-tokenomics"),
        fetch("https://graph.xray.app/output/stats/stage1"),
      ]
      const [xrayStatsResponse, stage1Response] = await Promise.all(requests)
      const [xrayStats, stage1] = await Promise.all([xrayStatsResponse.json(), stage1Response.json()])
      setXrayStats(xrayStats?.data)
      setStage1Stats(stage1)
      setLoading(false)
    }
    getStats()
  }, [])

  const allocated = Number(xrayStats?.tokenomics?.stage1 || 0)
  const distributed = Number(xrayStats?.tokenomics?.stage1_distributed || 0)
  const distributedPct = Number(xrayStats?.tokenomics?.stage1_distributed_pct || 0).toFixed(2)
  const left = Number(xrayStats?.tokenomics?.stage1_left || 0)
  const leftPct = Number(xrayStats?.tokenomics?.stage1_left_pct || 0).toFixed(2)
  const byUsers = Number(xrayStats?.tokenomics?.stage1_withdrawn_by_users || 0)
  const dropped = Number(xrayStats?.tokenomics?.stage1_dropped || 0)

  return (
    <div>
      <p className={style.description}>
        This stage is designed to reward early adopters and XRAY token holders. ISPO participants receive a share of the
        XRAY token supply allocated for the 0% Fee ISPO, based on the amount of ADA they delegate to XRAY staking pools.
        An alternative way to earn rewards is through a snapshot-based distribution, which captures the state of the
        Cardano blockchain at a specific point in time, recording the number of XRAY tokens (or DEX LP tokens) held by
        each wallet. Any remaining tokens at the end of this stage were distributed among all participants
        proportionally, based on both the duration and the amount of tokens held.
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
                value={`${Utils.quantityWithCommas(byUsers)} XRAY`}
                title="Withdrawn by Users"
                help="Total funds withdrawn by users"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(dropped)} XRAY`}
                title="Dropped"
                help="Total funds dropped"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(stage1Stats?.participants)}`}
                title="Participants"
                help="Total participants in this stage"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(stage1Stats?.max_tvl)} ADA`}
                title="Max TVL"
                help="Total value locked in this stage"
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <Tabs
          items={[
            {
              key: "ispo",
              label: <strong>0% Fee ISPO</strong>,
              children: (
                <div>
                  <ChartIspoSchedule />
                </div>
              ),
            },
            {
              key: "stake",
              label: <strong>XRAY Staking</strong>,
              children: (
                <div>
                  <ChartStakeSchedule />
                </div>
              ),
            },
            {
              key: "participants",
              label: <strong>Participants</strong>,
              children: <TableParticipants />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Stage1
