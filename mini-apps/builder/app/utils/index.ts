import { SLOT_CONFIG_NETWORK, SLOT_EPOCH_DURATION, SLOT_STARTING_EPOCH } from "@/config"
import type { CardanoTypes } from "@/types"

export const truncate = (value: string, start = 6, end = 6) => `${value.slice(0, start)}...${value.slice(-end)}`

export const quantityWithCommas = (value: number | string | bigint | undefined | null): string => {
  if (value === undefined || value === null) return "0"
  let text = typeof value === "bigint" ? value.toString() : String(value).trim()
  if (text === "" || text === "NaN") return "0"
  const isNegative = text.startsWith("-")
  if (isNegative) text = text.slice(1)
  const [integer, decimal] = text.split(".")
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const result = decimal ? `${formattedInteger}.${decimal}` : formattedInteger
  return isNegative ? `-${result}` : result
}

export const quantityFormat = (quantity: number | string | bigint | undefined, decimals = 6, skipZero = false) => {
  const raw = (quantity ?? 0).toString().replace(/^0+/, "")
  const isZero = raw === "" || /^0+$/.test(raw)

  if (skipZero && isZero) return { a: "0", b: "", final: "0" }
  if (decimals <= 0) {
    const formatted = quantityWithCommas(raw || "0")
    return { a: formatted, b: "", final: formatted }
  }

  const integer = raw.length > decimals ? raw.slice(0, -decimals) : "0"
  const fraction = raw.slice(-decimals).padStart(decimals, "0")
  const a = quantityWithCommas(integer)
  return { a, b: fraction, final: `${a}.${fraction}` }
}

export const capitalizeFirstLetter = (value: string): string =>
  value ? value.charAt(0).toUpperCase() + value.toLowerCase().slice(1) : value

export const timestampToDateTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleString()

export const epochStartTime = (epoch: number, network: CardanoTypes.NetworkName) => {
  const config = SLOT_CONFIG_NETWORK[network]
  const startingEpoch = SLOT_STARTING_EPOCH[network]
  const epochDuration = SLOT_EPOCH_DURATION[network]
  return (epoch * epochDuration + (config.zeroTime / 1000 - startingEpoch * 432000)) * 1000
}

export const epochEndTime = (epoch: number, network: CardanoTypes.NetworkName) =>
  epochStartTime(epoch, network) + SLOT_EPOCH_DURATION[network] * 1000

export const epochProgress = (epoch: number, network: CardanoTypes.NetworkName) => {
  const duration = SLOT_EPOCH_DURATION[network] * 1000
  if (duration <= 0) return "0.0"
  const progress = ((Date.now() - epochStartTime(epoch, network)) / duration) * 100
  return Math.max(0, Math.min(progress, 100)).toFixed(1)
}
