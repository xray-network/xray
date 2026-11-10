import React, { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"
import * as Utils from "@/utils"
import { StatsStage1Ispo } from "../../../types"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler)

const ChartIspoSchedule = () => {
  const [history, setHistory] = useState<StatsStage1Ispo>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const historyResponse = await fetch("https://cdn.xray.app/data/stage1_ispo_history.json")
      const historyData = await historyResponse.json()
      setHistory(historyData)
      setLoading(false)
    }
    getStats()
  }, [])

  const distributed = history?.history || []
  const isLight =
    typeof document === "undefined" ||
    (!document.documentElement.classList.contains("rp-dark") && !document.documentElement.classList.contains("dark"))
  const hoverColor = isLight ? "#000" : "#fff"

  const chartData = {
    labels: distributed.map((epoch: any) => epoch.epoch),
    datasets: [
      {
        type: "line" as const,
        label: "Max Rewards",
        data: distributed.map((epoch: any) => epoch.max),
        fill: true,
        radius: 0,
        backgroundColor: ["rgba(54, 162, 235, 0.1)"],
        hoverBackgroundColor: [hoverColor],
        borderColor: ["#355aeb"],
        postfix: "XRAY",
      },
      {
        type: "bar" as const,
        label: "Epoch Rewards Distributed",
        data: distributed.map((epoch: any) => epoch.accrued),
        fill: true,
        stepped: "before",
        radius: 0,
        backgroundColor: ["#355aeb"],
        hoverBackgroundColor: [hoverColor],
        borderColor: ["#355aeb"],
        postfix: "XRAY",
      },
    ],
  } as any

  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Epoch Number",
          color: isLight ? "#8484AD" : "#4f4f7a",
        },
        grid: {
          color: isLight ? "#e4e9f0" : "#2e2e46",
        },
        ticks: {
          autoSkip: true,
          color: isLight ? "#8484AD" : "#4f4f7a",
        },
      },
      y: {
        title: {
          display: true,
          text: "XRAY Rewards",
          color: isLight ? "#8484AD" : "#4f4f7a",
        },
        grid: {
          color: isLight ? "#e4e9f0" : "#2e2e46",
        },
        ticks: {
          color: isLight ? "#8484AD" : "#4f4f7a",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItem: any) =>
            `Epoch ${tooltipItem[0].label} (for Epoch ${parseInt(tooltipItem[0].label, 10) - 2})`,
          label: (tooltipItem: any) => {
            const { datasetIndex } = tooltipItem
            const ds = chartData.datasets[datasetIndex]
            const arr = []
            arr.push(`${ds.label}: ${Utils.quantityWithCommas(ds.data[tooltipItem.dataIndex])} ${ds.postfix}`)
            if (datasetIndex === 1) {
              arr.push(`ADA per 1 XRAY: ${Utils.quantityFormat(distributed[tooltipItem.dataIndex].rate, 6).final} ADA`)
            }
            if (datasetIndex === 1) {
              arr.push(
                `Active Stake Snapshot: ${Utils.quantityFormat(distributed[tooltipItem.dataIndex].snapshot, 6).final} ADA`
              )
            }
            return arr
          },
        },
      },
    },
  } as any

  return (
    <div style={{ userSelect: "none", height: "300px" }}>
      <Line data={chartData} options={options} height={300} />
    </div>
  )
}

export default React.memo(ChartIspoSchedule)
