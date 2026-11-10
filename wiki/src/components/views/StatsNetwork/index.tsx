import { useEffect, useState } from "react"
import { Tabs } from "antd"
import Metrics from "./Metrics"
import Nodes from "./Nodes"
import Servers from "./Servers"
import Funding from "./Funding"
import type { StatsPrice, StatsXray, StatsXrayPool, CounterStats, StatsFunding, HealthStats } from "../types"

const StatsNetwork = () => {
  const [price, setPrice] = useState<StatsPrice>()
  const [xrayStats, setXrayStats] = useState<StatsXray>()
  const [xrayPools, setXrayPools] = useState<StatsXrayPool>()
  const [counterStats, setCounterStats] = useState<CounterStats>()
  const [funding, setFunding] = useState<StatsFunding[]>()
  const [healthStats, setHealthStats] = useState<HealthStats>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const requests = [
        fetch("https://graph.xray.app/output/stats/fiat-prices"),
        fetch("https://graph.xray.app/output/stats/xray-tokenomics"),
        fetch("https://graph.xray.app/output/stats/xray-pools"),
        fetch("https://graph.xray.app/output/stats/services-counter"),
        fetch("https://graph.xray.app/output/stats/funding"),
        fetch("https://graph.xray.app/output/stats/services-health-cached"),
      ]

      const [priceResponse, xrayStatsResponse, xrayPoolsResponse, graphStatsResponse, fundingResponse, healthResponse] =
        await Promise.all(requests)
      const [prices, xrayStats, xrayPools, counterStats, funding, healthStats] = await Promise.all([
        priceResponse.json(),
        xrayStatsResponse.json(),
        xrayPoolsResponse.json(),
        graphStatsResponse.json(),
        fundingResponse.json(),
        healthResponse.json(),
      ])
      setPrice(prices?.data)
      setXrayStats(xrayStats?.data)
      setXrayPools(xrayPools)
      setCounterStats(counterStats)
      setFunding(funding)
      setHealthStats(healthStats?.data)
      setLoading(false)
    }
    getStats()
  }, [])

  return (
    <div>
      <Tabs
        items={[
          {
            key: "stats",
            label: <strong>Key Metrics</strong>,
            children: (
              <Metrics
                price={price}
                xrayStats={xrayStats}
                xrayPools={xrayPools}
                counterStats={counterStats}
                healthStats={healthStats}
                funding={funding}
                loading={loading}
              />
            ),
            forceRender: true,
          },
          {
            key: "nodes",
            label: <strong>Cardano Nodes</strong>,
            children: <Nodes xrayPools={xrayPools} price={price} />,
            forceRender: true,
          },
          {
            key: "servers",
            label: <strong>Infrastructure Servers</strong>,
            children: <Servers healthStats={healthStats} />,
            forceRender: true,
          },
          {
            key: "funding",
            label: <strong>Funding</strong>,
            children: <Funding funding={funding} />,
            forceRender: true,
          },
        ]}
      />
    </div>
  )
}

export default StatsNetwork
