export type StatsXray = {
  fingerprint: string
  policy_id: string
  asset_name: string
  asset_name_sscii: string
  decimals: number
  minting_tx_hash: string
  total_supply: number
  incentive_supply: number
  circulating_supply: number
  circulating_supply_pct: number
  creation_time: number
  total_transactions: number
  wallets_staked: number
  wallets_unstaked: number
  wallets_addresses: number
  dev_address: string
  incentive_address: string
  catalyst_wins: number
  tokenomics: {
    stage1: number
    stage1_withdrawn_by_users: number
    stage1_dropped: number
    stage1_distributed: number
    stage1_distributed_pct: number
    stage1_left: number
    stage1_left_pct: number
    stage2: number
    stage2_distributed: number
    stage2_distributed_pct: number
    stage2_left: number
    stage2_left_pct: number
    dev_fund: number
    dev_fund_distributed: number
    dev_fund_distributed_pct: number
    dev_fund_left: number
    dev_fund_left_pct: number
    founders_fund: number
  }
}

export type StatsXrayPool = {
  live_stake: string
  active_stake: string
  blocks_count: number
  nodes_count: number
  pools: {
    pool_id_bech32: string
    pool_id_hex: string
    active_epoch_no: number
    vrf_key_hash: string
    margin: number
    fixed_cost: string
    pledge: string
    deposit: string | null
    reward_addr: string
    reward_addr_delegated_drep: string
    owners: string[]
    relays: {
      dns: string | null
      srv: string | null
      ipv4: string | null
      ipv6: string | null
      port: number | null
    }[]
    meta_url: string
    meta_hash: string
    meta_json: {
      name: string
      ticker: string
      homepage: string
      description: string
    }
    pool_status: string
    retiring_epoch: number | null
    op_cert: string
    op_cert_counter: number
    active_stake: string
    sigma: number
    block_count: number
    live_pledge: string
    live_stake: string
    live_delegators: number
    live_saturation: number
    voting_power: string
  }[]
}

export type StatsPrice = {
  bitcoin: CurrencyRates
  cardano: CurrencyRates
  ethereum: CurrencyRates
  "ray-network": CurrencyRates
}

type CurrencyRates = {
  usd: number
  eur: number
  gbp: number
  jpy: number
  cny: number
}

export type CounterStats = {
  total: number
  counters: {
    name: string
    network: string
    value: number
  }[]
}

export type HealthStats = {
  host: string
  service: string
  network: string
  healthy: boolean
}[]

export type StatsStage1 = {
  max_rate: number
  max_tvl: number
  participants: number
  xdiamond: number
  xray: number
}

export type StatsStage1Ispo = {
  accrued: number
  undelivered: number
  history: {
    epoch: number
    snapshot: number
    max: number
    accrued: number
    rate: number
  }[]
}

export type StatsStage1XrayStaking = {
  total: number
  history: {
    base_apy: number
    fingerprint: string
    id: string
    name: string
    status: string
    total: string
    history: {
      accrued: number
      block: number
      boost: number
      lp_token_total: number
      rate: number
      total: number
    }[]
  }[]
}

export type StatsStage1Participants = {
  d: {
    addr: string
    tx: string
    x: number
    xd: number
  }
  k: string
  u: {
    x: number
    xd: number
  }
  x: number
  xd: number
}[]

export type StatsStage2 = {
  id: number
  tx_hash: string
  amount: number
  timestamp: number
  description: string
}

export type StatsDevFund = {
  id: number
  tx_hash: string
  amount: number
  timestamp: number
  description: string
}

export type StatsFunding = {
  id: number
  date: string
  description: string
  amount: string
  link: string
}

export type StatsGithub = {
  author: string
  author_avatar: string
  author_url: string
  branch_name: string
  branch_url: string
  date: string
  message: string
  repo_name: string
  repo_private: boolean
  repo_stars: number
  repo_watchers: number
  sha: string
  url: string
}

// withdrawal_details: Array<{
//   k: string
//   x: number
//   xd: number
//   u: {
//     x: number
//     xd: number
//   }
//   d: {
//     x: number
//     xd: number
//     tx: string
//     addr: string
//   }
// }>
// epoch_history: {
//   accrued: number
//   undelivered: number
//   history: Array<{
//     epoch: number
//     snapshot: number
//     max: number
//     accrued: number
//     rate: number
//   }>
// }
// stake_history: {
//   total: number
//   history: Array<{
//     id: string
//     total: number
//     name: string
//     fingerprint: string
//     status: string
//     base_apy: number
//     history: Array<{
//       block: number
//       accrued: number
//       boost: number
//       total: number
//       rate: number
//       lp_token_total: number
//     }>
//   }>
// }
