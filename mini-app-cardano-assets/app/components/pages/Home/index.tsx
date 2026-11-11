import React, { useEffect, useState, useRef } from "react"
import { cardanoV1, platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import { Input, type InputRef } from "antd"
import * as Utils from "@/utils"
import AssetsTable from "./assetsTable"
import Empty from "@/components/common/Empty"
import Informers from "@/components/informers"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import style from "./style.module.css"

export default function HomePage() {
  const searchInput = useRef<InputRef>(null)
  const account = cardanoV1.useAccountState()
  const status = platformV1.useStatus()
  const accountState = account.data?.balanceStatus === "ready" ? account.data : null
  const standalone = typeof window !== "undefined" && window.parent === window
  const emptyState = standalone
    ? { title: "Standalone mode", descr: "Open this mini app inside XRAY App to access an account" }
    : status.error
      ? { title: "Connection error", descr: "Could not load platform status from XRAY App" }
      : !status.data
        ? { title: "Connecting", descr: "Waiting for XRAY App" }
        : !status.data.account
          ? { title: "No account selected", descr: "Select a Cardano account in XRAY App to access your information" }
          : account.error || account.data?.balanceStatus === "error"
            ? { title: "Account unavailable", descr: "XRAY App could not load the selected account balance" }
            : { title: "Loading account", descr: "Cardano account data is not yet available" }

  const assetsRaw = accountState?.state.balance.assets ?? []
  const [search, setSearch] = useState("")

  const assets = assetsRaw.filter((asset) => {
    return (
      Utils.decodeAssetName(asset.assetName)?.assetNameFinal.toLowerCase().includes(search.toLowerCase()) ||
      asset.fingerprint.toLowerCase().includes(search.toLowerCase()) ||
      asset.policyId.toLowerCase().includes(search.toLowerCase())
    )
  })

  useEffect(() => {
    const handleSearchFocus = (e: any) => {
      try {
        if (e.code === "Slash") searchInput.current?.focus()
      } catch {}
    }
    window?.addEventListener("keyup", handleSearchFocus)
    return () => {
      window?.removeEventListener("keyup", handleSearchFocus)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto pt-5">
      <div className="flex items-center mb-5">
        <h4 className="mb-0 text-2xl font-black">Assets</h4>
      </div>
      <div>
        {!accountState && <Empty title={emptyState.title} descr={emptyState.descr} />}
        {accountState && (
          <div>
            <div>
              <div className="flex items-center wrap -me-5">
                <div className="me-12 mb-8 text-2xl">
                  <Informers.Ada
                    title="Account Balance"
                    value={accountState.state.balance.value}
                    help="Current address balance"
                    hideable
                    // tooltip={
                    //   <div>
                    //     <div>Balance: {Utils.quantityFormat(accountState?.state?.balance.value || "0").final} ADA</div>
                    //     <div>Rewards: {Utils.quantityFormat(accountState?.delegation?.rewards || "0").final} ADA</div>
                    //     <div>Total Balance: {Utils.quantityFormat((accountState?.delegation?.rewards || 0n) + (accountState?.state?.balance.value || 0n)).final} ADA</div>
                    //   </div>
                    // }
                  />
                </div>
                <div className="me-12 mb-8 text-2xl">
                  <Informers.Ada
                    title="Rewards"
                    value={accountState.delegation?.rewards ?? 0n}
                    help="Rewards available for withdrawal"
                    hideable
                  />
                </div>
                <div className="me-12 mb-8 text-2xl">
                  <Informers.Text
                    title="Total Assets"
                    value={Utils.quantityWithCommas(accountState.state.balance.assets.length)}
                    help="Total number of assets in the account"
                  />
                </div>
              </div>
            </div>
            <div className="shared-line shared-line-dashed mb-10 mt-5" />
            <div className="mb-5 flex scroll">
              <div className="grow max-w-125">
                <Input
                  ref={searchInput}
                  allowClear
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  prefix={<MagnifyingGlassIcon className="size-5 text-gray-500" strokeWidth={2} />}
                  suffix={<i className="shared-search-suffix" />}
                  placeholder="Search by Asset Name, Fingerprint, or Policy ID"
                  size="large"
                />
              </div>
            </div>
            <AssetsTable data={assets} size="middle" />
          </div>
        )}
      </div>
    </div>
  )
}
