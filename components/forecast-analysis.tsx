"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"

interface ForecastAnalysisProps {
  commodity: string
  forecastData: {
    date: string
    forecast: number
  }[]
  historicalData: {
    date: string
    value: number
  }[]
}

export function ForecastAnalysis({ commodity, forecastData, historicalData }: ForecastAnalysisProps) {
  // Calculate trend analysis
  const firstForecast = forecastData[0]?.forecast || 0
  const lastForecast = forecastData[forecastData.length - 1]?.forecast || 0
  const trendPercentage = ((lastForecast - firstForecast) / firstForecast) * 100

  // Calculate volatility (standard deviation of percentage changes)
  const changes = forecastData.slice(1).map((item, i) => {
    const prevValue = forecastData[i].forecast
    return ((item.forecast - prevValue) / prevValue) * 100
  })

  const avgChange = changes.reduce((sum, val) => sum + val, 0) / changes.length
  const volatility = Math.sqrt(changes.reduce((sum, val) => sum + Math.pow(val - avgChange, 2), 0) / changes.length)

  // Find peak and lowest prices
  const peakPrice = Math.max(...forecastData.map((item) => item.forecast))
  const lowestPrice = Math.min(...forecastData.map((item) => item.forecast))

  // Find peak and lowest months
  const peakMonth = forecastData.find((item) => item.forecast === peakPrice)?.date
  const lowestMonth = forecastData.find((item) => item.forecast === lowestPrice)?.date

  // Format dates
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
  }

  // Determine if there's a seasonal pattern
  const seasonalPattern = Math.abs(volatility) > 2 ? "Seasonal variations detected" : "No significant seasonal pattern"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Market Analysis for {commodity}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {trendPercentage >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <h3 className="font-semibold">Price Trend</h3>
            </div>
            <p>
              {trendPercentage >= 0
                ? `Prices are projected to increase by ${trendPercentage.toFixed(2)}% over the forecast period.`
                : `Prices are projected to decrease by ${Math.abs(trendPercentage).toFixed(2)}% over the forecast period.`}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold">Price Volatility</h3>
            </div>
            <p>
              {volatility < 1
                ? "Low volatility expected. Prices should remain relatively stable."
                : volatility < 3
                  ? "Moderate volatility expected. Some price fluctuations likely."
                  : "High volatility expected. Significant price fluctuations likely."}
            </p>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Price Extremes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Highest Price:</p>
              <p className="font-medium">
                ₹{peakPrice.toFixed(2)} in {formatDate(peakMonth || "")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lowest Price:</p>
              <p className="font-medium">
                ₹{lowestPrice.toFixed(2)} in {formatDate(lowestMonth || "")}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Seasonal Patterns</h3>
          <p>{seasonalPattern}</p>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0 text-green-500" />
                <span>
                  {trendPercentage > 0
                    ? `Consider stocking up on ${commodity} before prices rise further.`
                    : `Good time to purchase ${commodity} as prices are expected to decrease.`}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0 text-green-500" />
                <span>
                  {volatility > 2
                    ? `Monitor ${commodity} prices closely due to expected volatility.`
                    : `${commodity} prices should remain relatively stable for planning purposes.`}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
