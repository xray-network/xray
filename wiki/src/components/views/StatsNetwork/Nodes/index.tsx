import { Tag, Table } from "antd"
import Informers from "@/components/informers"
import type { ColumnsType } from "antd/es/table"
import type { StatsXrayPool, StatsPrice } from "../../types"
import * as Utils from "@/utils"

const Nodes = ({ xrayPools, price }: { xrayPools?: StatsXrayPool; price?: StatsPrice }) => {
  const columns: ColumnsType<StatsXrayPool["pools"][number]> = [
    {
      title: "#",
      key: "",
      dataIndex: "",
      width: "50px",
      render: (record, records, index) => <div>{index + 1}</div>,
    },
    {
      title: "Ticker",
      key: "service",
      dataIndex: ["meta_json", "ticker"],
      render: (record, records) => (
        <div>
          <strong>{record}</strong>
        </div>
      ),
    },
    {
      title: "Pool ID",
      key: "pool_id_bech32",
      dataIndex: "pool_id_bech32",
      render: (record, records) => <div>{<Informers.Text value={Utils.truncate(record)} copy={record} />}</div>,
    },
    {
      title: "Live Stake",
      key: "live_stake",
      dataIndex: "live_stake",
      render: (record, records) => (
        <div>
          <Informers.Ada value={record} shortened />
        </div>
      ),
    },
    {
      title: "In USD",
      key: "live_stake",
      dataIndex: "live_stake",
      render: (record, records) => (
        <div>
          <Informers.Text value={`$${Utils.quantityWithLetter((record / 1000000) * (price?.cardano?.usd || 0))}`} />
        </div>
      ),
    },
    {
      title: "Blocks",
      key: "block_count",
      dataIndex: "block_count",
      render: (record, records) => <div>{Utils.quantityWithCommas(record)}</div>,
    },
    {
      title: "Health",
      key: "healthy",
      dataIndex: "healthy",
      render: (record, records) => (
        <div>
          <Tag color="#3fcb9b">active</Tag>
        </div>
      ),
    },
  ]

  return (
    <div className="shared-table">
      <Table
        rowKey={(i) => i.pool_id_bech32}
        dataSource={xrayPools?.pools}
        columns={columns}
        size="middle"
        pagination={false}
        locale={{
          emptyText: <div className="py-4 mb-1">No Data</div>,
        }}
      />
    </div>
  )
}

export default Nodes
