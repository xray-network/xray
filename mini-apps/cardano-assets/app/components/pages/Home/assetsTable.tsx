import React, { useState } from "react"
import { Table, Tag, Input } from "antd"
import * as Utils from "@/utils"
import Informers from "@/components/informers"
import AssetImage from "@/components/common/AssetImage"
import * as Types from "@/types"
import type { ColumnsType } from "antd/es/table"
import style from "./style.module.css"

const AssetsTable = ({
  data,
  loading = false,
  bordered,
  size = "middle",
}: {
  data: Types.CardanoTypes.Balance["assets"]
  loading?: boolean
  bordered?: boolean
  size?: "small" | "middle" | "large"
}) => {
  const [pageSize, setPageSize] = useState(25)

  const columns: ColumnsType<Types.CardanoTypes.Balance["assets"][number]> = [
    {
      title: "",
      key: "image",
      width: "38.5px",
      className: "pe-0",
      render: (record, records) => (
        <div className={style.icon}>
          <AssetImage assetId={records.policyId + records.assetName} />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: ["assetName"],
      key: "token",
      width: "28%",
      sorter: (a, b) => (a.assetNameAscii || "").localeCompare(b.assetNameAscii || ""),
      render: (record, records) => {
        const assetName = Utils.decodeAssetName(records.assetName)?.assetNameFinal || ""
        return <strong>{assetName?.length > 32 ? Utils.truncate(assetName, 6, 12) : assetName}</strong>
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "25%",
      sorter: (a, b) =>
        Number(a.quantity) / Math.pow(10, a.decimals || 0) - Number(b.quantity) / Math.pow(10, b.decimals || 0),
      render: (record, records) => (
        <Informers.Asset
          policyId={records.policyId}
          assetName={""}
          quantity={records.quantity}
          decimals={records.decimals}
        />
      ),
    },
    {
      title: "Policy ID",
      dataIndex: ["policyId"],
      key: "policyId",
      align: "right",
      sorter: (a, b) => (a.fingerprint || "").localeCompare(b.fingerprint || ""),
      render: (record, records) => (
        <span className="text-gray-500">
          <Informers.Text value={Utils.truncate(records.policyId, 9, 4)} copy={records.policyId} />
        </span>
      ),
    },
    {
      title: "Fingerprint",
      dataIndex: ["fingerprint"],
      key: "fingerprint",
      align: "right",
      sorter: (a, b) => (a.fingerprint || "").localeCompare(b.fingerprint || ""),
      render: (record, records) => (
        <span className="text-gray-500">
          <Informers.Text value={Utils.truncate(records.fingerprint, 9, 4)} copy={records.fingerprint} />
        </span>
      ),
    },
  ]

  return (
    <div className="shared-table">
      <Table
        rowKey={(i) => i.fingerprint}
        onChange={(pagination) => {
          setPageSize(pagination.pageSize!)
        }}
        dataSource={data}
        columns={columns}
        size={size}
        bordered={bordered}
        pagination={{
          position: ["bottomRight", "topRight"],
          pageSize: pageSize,
          showSizeChanger: true,
          showPrevNextJumpers: false,
          pageSizeOptions: ["25", "50", "100"],
          showTotal: (total) => <div>{Utils.quantityWithCommas(total)} Assets</div>,
        }}
        loading={{
          spinning: loading,
          indicator: <i className="shared-spinner" />,
        }}
        locale={{
          emptyText: <div className="py-4 mb-1">No Data</div>,
        }}
      />
    </div>
  )
}

export default AssetsTable
