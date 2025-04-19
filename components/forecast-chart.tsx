"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

interface ForecastChartProps {
  commodity: string
  historicalData: {
    date: string
    value: number
  }[]
  forecastData: {
    date: string
    forecast: number
  }[]
}

export function ForecastChart({ commodity, historicalData, forecastData }: ForecastChartProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [chartRendered, setChartRendered] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || chartRendered) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDarkMode = theme === "dark"
    const textColor = isDarkMode ? "#e5e7eb" : "#1f2937"
    const gridColor = isDarkMode ? "#374151" : "#e5e7eb"

    // Prepare data
    const historical = historicalData.map((item) => ({
      x: new Date(item.date),
      y: item.value,
    }))

    const forecast = forecastData.map((item) => ({
      x: new Date(item.date),
      y: item.forecast,
    }))

    // Find min and max values for scaling
    const allValues = [...historical.map((d) => d.y), ...forecast.map((d) => d.y)]
    const minValue = Math.floor(Math.min(...allValues) * 0.95)
    const maxValue = Math.ceil(Math.max(...allValues) * 1.05)

    const allDates = [...historical.map((d) => d.x), ...forecast.map((d) => d.x)]
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())))

    // Canvas setup
    const width = canvas.width
    const height = canvas.height
    const padding = { top: 40, right: 30, bottom: 60, left: 60 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw title
    ctx.fillStyle = textColor
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${commodity} Price Forecast (2025-2029)`, width / 2, 25)

    // Helper functions for scaling
    const scaleX = (date: Date) => {
      const range = maxDate.getTime() - minDate.getTime()
      return padding.left + ((date.getTime() - minDate.getTime()) / range) * chartWidth
    }

    const scaleY = (value: number) => {
      const range = maxValue - minValue
      return padding.top + chartHeight - ((value - minValue) / range) * chartHeight
    }

    // Draw axes
    ctx.strokeStyle = textColor
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top + chartHeight)
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.stroke()

    // Draw grid lines and labels
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5
    ctx.fillStyle = textColor
    ctx.font = "12px Arial"
    ctx.textAlign = "right"

    // Y-axis grid and labels
    const yStep = Math.ceil((maxValue - minValue) / 6) // Reduce number of labels
    for (let i = minValue; i <= maxValue; i += yStep) {
      const y = scaleY(i)

      // Grid line
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Label with rupee symbol
      ctx.fillText(`₹${i.toFixed(1)}`, padding.left - 10, y + 4)
    }

    // X-axis grid and labels
    const years = Array.from(
      new Set([...historical.map((d) => d.x.getFullYear()), ...forecast.map((d) => d.x.getFullYear())]),
    ).sort()

    ctx.textAlign = "center"
    years.forEach((year) => {
      const date = new Date(year, 0, 1)
      const x = scaleX(date)

      // Grid line
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, padding.top + chartHeight)
      ctx.stroke()

      // Label
      ctx.fillText(year.toString(), x, padding.top + chartHeight + 20)
    })

    // Axis labels
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Year", width / 2, height - 15)

    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Price (₹)", 0, 0)
    ctx.restore()

    // Draw historical data line
    ctx.strokeStyle = "#3b82f6" // Blue
    ctx.lineWidth = 2
    ctx.beginPath()
    historical.forEach((point, i) => {
      const x = scaleX(point.x)
      const y = scaleY(point.y)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw forecast data line
    ctx.strokeStyle = "#f59e0b" // Amber
    ctx.lineWidth = 2
    ctx.beginPath()
    forecast.forEach((point, i) => {
      const x = scaleX(point.x)
      const y = scaleY(point.y)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw legend
    const legendX = padding.left + 20
    const legendY = padding.top + 20

    // Historical data legend
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 30, legendY)
    ctx.stroke()

    ctx.fillStyle = textColor
    ctx.textAlign = "left"
    ctx.fillText(`Actual ${commodity} Prices`, legendX + 40, legendY + 4)

    // Forecast data legend
    ctx.strokeStyle = "#f59e0b"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 20)
    ctx.lineTo(legendX + 30, legendY + 20)
    ctx.stroke()

    ctx.fillText(`Forecasted ${commodity} Prices`, legendX + 40, legendY + 24)

    setChartRendered(true)
  }, [commodity, forecastData, historicalData, theme, chartRendered])

  // Reset chart when theme changes
  useEffect(() => {
    setChartRendered(false)
  }, [theme])

  return (
    <div className="w-full aspect-[16/9] relative">
      <canvas ref={canvasRef} width={800} height={500} className="w-full h-full" />
    </div>
  )
}
