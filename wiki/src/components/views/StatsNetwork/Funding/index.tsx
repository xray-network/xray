import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { StatsFunding } from "../../types"

const columns: ColumnsType<StatsFunding> = [
  {
    title: "#",
    key: "id",
    dataIndex: "id",
    width: "50px",
    render: (record, records, index) => <div>{record}</div>,
  },
  {
    title: "Amount",
    key: "amount",
    dataIndex: "amount",
    render: (record, records) => (
      <div>
        <strong>{record}</strong>
      </div>
    ),
  },
  {
    title: "Date",
    key: "date",
    dataIndex: "date",
    render: (record, records) => <div>{record}</div>,
  },
  {
    title: "Description",
    key: "description",
    dataIndex: "description",
    render: (record, records) => <div>{record}</div>,
  },
  {
    title: "Link",
    key: "link",
    dataIndex: "link",
    render: (record, records) => (
      <div>
        {record ? (
          <a href={record} target="_blank">
            Link
          </a>
        ) : (
          "—"
        )}
      </div>
    ),
  },
]

const Servers = ({ funding }: { funding?: StatsFunding[] }) => {
  return (
    <div className="shared-table">
      <Table
        rowKey={(i) => i.id}
        dataSource={[...(funding || [])].reverse()}
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
