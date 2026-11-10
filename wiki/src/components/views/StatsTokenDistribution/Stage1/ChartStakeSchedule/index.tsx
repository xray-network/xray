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
import Lodash from "lodash"
import { StatsStage1XrayStaking } from "../../../types"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler)

const ChartStakeSchedule = () => {
  const [history, setHistory] = useState<StatsStage1XrayStaking>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      const historyResponse = await fetch("https://cdn.xray.app/data/stage1_xray_staking_history.json")
      const historyData = await historyResponse.json()
      setHistory(historyData)
      setLoading(false)
    }
    getStats()
  }, [])

  const isLight =
    typeof document === "undefined" ||
    (!document.documentElement.classList.contains("rp-dark") && !document.documentElement.classList.contains("dark"))

  const colors = ["#647ee6", "#355aeb", "#647ee6", "#355aeb"]
  const emptyColor = isLight ? "#efefef" : "#787878"
  const hoverColor = isLight ? "#000" : "#fff"

  const firstBlock = history?.history[0]?.history[0]?.block || 0
  const historyLength = history?.history[0]?.history?.length || 0
  const lastBlock = history?.history[0]?.history[historyLength - 1]?.block || 0
  const step = 2000
  const labels = Lodash.range(firstBlock, lastBlock + step, step)

  const datasets =
    history?.history?.map((program: any, index: any) => {
      return {
        type: "bar",
        label: program?.name,
        data:
          labels.map((block) => {
            return program?.history?.filter((a: any) => a.block === block)[0]?.total
          }) || [],
        fill: true,
        stepped: "before",
        radius: 0,
        backgroundColor: [colors[index] || emptyColor],
        hoverBackgroundColor: [hoverColor],
      }
    }) || []

  const chartData = {
    labels: labels || [],
    datasets: datasets,
  } as any

  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    interaction: {
      intersect: true,
      mode: "index",
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Block Number",
          color: isLight ? "#8484AD" : "#4f4f7a",
        },
        stacked: true,
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
        stacked: true,
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
          title: (tooltipItem: any) => `Block ${tooltipItem[0].label} Snapshot`,
          label: (tooltipItem: any) => {
            return [`${tooltipItem.dataset.label} Rewards: ${tooltipItem.formattedValue} XRAY`]
          },
        },
      },
      legend: {},
    },
  } as any

  return (
    <div style={{ userSelect: "none" }}>
      <Line data={chartData} options={options} height={300} />
    </div>
  )
}

export default React.memo(ChartStakeSchedule)
