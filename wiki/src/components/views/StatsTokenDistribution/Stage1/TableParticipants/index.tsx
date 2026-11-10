import React, { useState, useRef, useEffect } from "react"
import * as Utils from "@/utils"
import { Table, Input } from "antd"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Informers from "@/components/informers"
import type { StatsXray, StatsStage1 } from "../../../types"
import type { ColumnsType } from "antd/es/table"
import { StatsStage1Participants } from "../../../types"

const columns: ColumnsType<StatsStage1Participants[number]> = [
  {
    title: "Stake Key",
    key: "k",
    dataIndex: "k",
    width: "20%",
    render: (record, records, index) => (
      <div>
        <Informers.Text value={Utils.truncate(record)} copy={record} />
      </div>
    ),
  },
  {
    title: "Drop Adress",
    key: "address",
    dataIndex: ["d", "addr"],
    width: "20%",
    render: (record, records, index) => (
      <div>
        <Informers.Text value={Utils.truncate(record)} copy={record} />
      </div>
    ),
  },
  {
    title: "Withdrawn",
    key: "withdrawn",
    dataIndex: ["u", "x"],
    width: "20%",
    render: (record, records, index) => <div>{Utils.quantityWithCommas(record)} XRAY</div>,
    sorter: (a, b) => (a.u.x > b.u.x ? 1 : -1),
  },
  {
    title: "Dropped",
    key: "dropped",
    dataIndex: ["d", "x"],
    width: "20%",
    render: (record, records, index) => <div>{Utils.quantityWithCommas(record)} XRAY</div>,
    sorter: (a, b) => (a.d.x > b.d.x ? 1 : -1),
  },
  {
    title: "Total",
    key: "total",
    dataIndex: "x",
    width: "20%",
    render: (record, records, index) => <div>{Utils.quantityWithCommas(record)} XRAY</div>,
    sorter: (a, b) => (a.x > b.x ? 1 : -1),
  },
]

const TableParticipants = () => {
  const [details, setDetails] = useState<StatsStage1Participants>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const historyResponse = await fetch("https://cdn.xray.app/data/stage1_participants.json")
      const historyData = await historyResponse.json()
      setDetails(historyData)
      setLoading(false)
    }
    getStats()
  }, [])

  const searchInputRef = useRef<any>(null)
  const [searchInput, setSearchInput] = useState<string>("")

  const filteredDetails = details.filter((item) => {
    const searchValue = searchInput.toLowerCase()
    return item.k.toLowerCase().includes(searchValue) || item.d.addr.toLowerCase().includes(searchValue)
  })

  useEffect(() => {
    const handleSearchFocus = (e: any) => {
      try {
        if (e.code === "Slash") searchInputRef.current?.focus()
      } catch {}
    }
    window?.addEventListener("keyup", handleSearchFocus)
    return () => {
      window?.removeEventListener("keyup", handleSearchFocus)
    }
  }, [])

  return (
    <div>
      <div className="d-flex mb-4">
        <div className="grow w-max-500 w-min-150 me-2">
          <Input
            ref={searchInputRef}
            prefix={<MagnifyingGlassIcon className="size-4 me-1 text-muted" />}
            suffix={<i className="xray-search-suffix" />}
            size="large"
            value={searchInput}
            placeholder="Search by Stake Key or Address"
            onChange={(e) => setSearchInput(e.target.value)}
            allowClear
          />
        </div>
      </div>
      <div className="shared-table">
        <Table
          rowKey={(i) => i.k}
          dataSource={filteredDetails}
          columns={columns}
          size="middle"
          pagination={{
            position: ["bottomRight", "topRight"],
            size: "default",
            showSizeChanger: true,
            showPrevNextJumpers: false,
            defaultPageSize: 25,
            pageSizeOptions: [25, 50, 100],
            showTotal: (total) => <div>{Utils.quantityWithCommas(total)} Accounts</div>,
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
    </div>
  )
}

export default TableParticipants
