import Informers from "@/components/informers"
import type { StatsPrice, StatsXray, StatsXrayPool, CounterStats, StatsFunding, HealthStats } from "../../types"
import * as Utils from "@/utils"
import { Skeleton } from "antd"
import style from "../style.module.css"

const Metrics = ({
  price,
  xrayStats,
  xrayPools,
  counterStats,
  funding,
  healthStats,
  loading,
}: {
  price?: StatsPrice
  xrayStats?: StatsXray
  xrayPools?: StatsXrayPool
  counterStats?: CounterStats
  funding?: StatsFunding[]
  healthStats?: HealthStats
  loading?: boolean
}) => {
  const xrayPrice = Number(price?.["ray-network"]?.usd?.toFixed(6) || 0)
  const xrayPriceADA = Number(((price?.["ray-network"]?.usd || 0) / (price?.cardano?.usd || 0) || 0).toFixed(6))
  const adaPrice = Number(price?.cardano?.usd?.toFixed(6) || 0)
  const marketCap = Number((xrayPrice * (xrayStats?.circulating_supply || 0)).toFixed(0))
  const marketFdv = Number((xrayPrice * (xrayStats?.total_supply || 0)).toFixed(0))
  const maxSupply = Number(xrayStats?.total_supply || 0)
  const circulatingSupply = Number(xrayStats?.circulating_supply || 0)
  const circulatingSupplyPercent = Number(xrayStats?.circulating_supply_pct || 0).toFixed(2)
  const xrayTransactions = Number(xrayStats?.total_transactions || 0)
  const xrayHolders = Number(xrayStats?.wallets_addresses || 0)
  const apiCalls = Number(counterStats?.total || 0)
  const nodesAdaDelegated = Number(xrayPools?.live_stake || 0)
  const blocksProduced = Number(xrayPools?.blocks_count || 0)
  const nodesCount = Number(xrayPools?.nodes_count || 0)
  const serversCount = Number(healthStats?.length || 0)
  const fundingSources = Number(funding?.length || 0)

  return (
    <div className="xray-container">
      {loading && (
        <div>
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      )}
      {!loading && (
        <div className={style.informerContainer}>
          <p className={style.description}>XRAY/Network Key Indicators</p>
          <div className={style.informerContainerInner}>
            <div className={style.informer}>
              <Informers.Text value={`$${xrayPrice}`} title="XRAY Price" help="Current XRAY price" />
            </div>
            <div className={style.informer}>
              <Informers.Text value={`${xrayPriceADA} ADA`} title="XRAY Price" help="Current XRAY price" />
            </div>
            <div className={style.informer}>
              <Informers.Text value={`$${adaPrice}`} title="ADA Price" help="Current ADA price" />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`$${Utils.quantityWithCommas(marketCap)}`}
                title="XRAY Market Cap"
                help="The total market value of a cryptocurrency's circulating supply"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`$${Utils.quantityWithCommas(marketFdv)}`}
                title="XRAY Fully-Diluted Value"
                help="The market cap if the max supply was in circulation"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(maxSupply)} XRAY`}
                title="Max Supply"
                help="The maximum amount of tokens that will ever exist"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(circulatingSupply)} XRAY`}
                title="Total Supply"
                help="Total tokens unlocked and circulating"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${circulatingSupplyPercent}%`}
                title="Total Supply, %"
                help="Total tokens unlocked and circulating in percentage"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(xrayTransactions)}`}
                title="XRAY Transactions"
                help="Total transactions with XRAY tokens"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(xrayHolders)}`}
                title="XRAY Holders"
                help="Total wallets holding XRAY"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(apiCalls)}`}
                title="XRAY/Graph API Calls"
                help="Total XRAY/Graph API calls"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(nodesAdaDelegated)} ADA`}
                title="Cardano Nodes Delegated"
                help="Total ADA delegated to XRAY/Network's nodes"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(blocksProduced)}`}
                title="Blocks Produced"
                help="Total Cardano blocks produced by XRAY pools"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(nodesCount)}`}
                title="Cardano Nodes"
                help="Total block producing nodes"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(serversCount)}`}
                title="Infrastructure Servers"
                help="Total infrastructure servers"
              />
            </div>
            <div className={style.informer}>
              <Informers.Text
                value={`${Utils.quantityWithCommas(fundingSources)}`}
                title="Funding Sources"
                help="Funding sources to develop XRAY/Network"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Metrics
