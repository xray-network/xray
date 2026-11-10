import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { HealthStats } from "../../types"

const columns: ColumnsType<HealthStats[number]> = [
  {
    title: "#",
    key: "",
    dataIndex: "",
    width: "50px",
    render: (record, records, index) => <div>{index + 1}</div>,
  },
  {
    title: "Service",
    key: "service",
    dataIndex: "service",
    render: (record, records) => (
      <div>
        <strong>{`${record} API`}</strong>
      </div>
    ),
  },
  {
    title: "Network",
    key: "network",
    dataIndex: "network",
    render: (record, records) => <div>{record}</div>,
  },
  {
    title: "Host",
    key: "host",
    dataIndex: "host",
    render: (record, records) => <i>hidden</i>,
  },
  {
    title: "Ports",
    key: "host",
    dataIndex: "host",
    render: (record, records) => <i>hidden</i>,
  },
  {
    title: "Health",
    key: "healthy",
    dataIndex: "healthy",
    render: (record, records) => (
      <div>{record === true ? <Tag color="#3fcb9b">healthy</Tag> : <Tag color="#dc4446">down</Tag>}</div>
    ),
  },
]

const Servers = ({ healthStats }: { healthStats?: HealthStats }) => {
  return (
    <div className="shared-table">
      <Table
        rowKey={(i) => i.host}
        dataSource={healthStats}
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

export default Servers
