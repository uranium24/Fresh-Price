"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ForecastChart } from "./forecast-chart"
import { ForecastTable } from "./forecast-table"
import { ForecastAnalysis } from "./forecast-analysis"

interface ForecastResultsProps {
  commodity: string
  forecastData: {
    date: string
    forecast: number
  }[]
  historicalData: {
    date: string
    value: number
  }[]
  rmse: number
}

export function ForecastResults({ commodity, forecastData, historicalData, rmse }: ForecastResultsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        FreshPrice: Price Prediction for Agricultural Commodities
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{commodity} Price Forecast (2025-2029)</CardTitle>
        </CardHeader>
        <CardContent>
          <ForecastTable data={forecastData} />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <ForecastChart commodity={commodity} historicalData={historicalData} forecastData={forecastData} />
        </CardContent>
      </Card>

      <div className="text-sm text-gray-700 dark:text-gray-300 mb-6">
        <p>
          <strong>Model Accuracy:</strong> Training RMSE: {rmse.toFixed(4)}
        </p>
        <p className="mt-2 text-xs">Lower RMSE values indicate better prediction accuracy</p>
      </div>

      <div className="mb-10">
        <ForecastAnalysis commodity={commodity} historicalData={historicalData} forecastData={forecastData} />
      </div>
    </div>
  )
}
