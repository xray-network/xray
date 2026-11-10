import { Tabs, Tag } from "antd"
import Stage1 from "./Stage1"
import Stage2 from "./Stage2"
import DevFund from "./DevFund"

const StatsTokenDistribution = () => {
  return (
    <div>
      <p className="mb-4">
        The XRAY token distribution is designed to ensure a fair and equitable allocation of tokens across various
        stakeholders. The distribution events include two stages and Dev Fund:
      </p>
      <Tabs
        items={[
          {
            key: "dev_fund",
            label: (
              <strong>
                Dev & Marketing Fund{" "}
                <Tag color="#3fcb9b" className="me-0 ms-1">
                  live
                </Tag>{" "}
              </strong>
            ),
            children: <DevFund />,
          },
          {
            key: "stage1",
            label: (
              <strong>
                Stage 1{" "}
                <Tag color="default" className="me-0 ms-1">
                  end
                </Tag>
              </strong>
            ),
            children: <Stage1 />,
          },
          {
            key: "stage2",
            label: (
              <strong>
                Stage 2{" "}
                <Tag color="#3fcb9b" className="me-0 ms-1">
                  live
                </Tag>
              </strong>
            ),
            children: <Stage2 />,
          },
        ]}
      />
    </div>
  )
}

export default StatsTokenDistribution
