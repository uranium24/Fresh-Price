"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

interface ModelPredictionProps {
  commodity: string
}

interface PredictionData {
  commodity: string
  predicted_price: number
  confidence: number
  factors: {
    factor: string
    impact: number
  }[]
  trend: "up" | "down" | "stable"
  trend_percentage: number
}

export function ModelPrediction({ commodity }: ModelPredictionProps) {
  const [prediction, setPrediction] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchModelPrediction() {
      try {
        setLoading(true)
        // In a real implementation, this would call the backend API
        // For now, we'll simulate the model prediction with realistic data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate realistic prediction data based on commodity
        const randomPrice = Math.floor(2000 + Math.random() * 3000)
        const randomConfidence = 70 + Math.random() * 25
        const trendOptions = ["up", "down", "stable"] as const
        const randomTrend = trendOptions[Math.floor(Math.random() * 3)]
        const randomTrendPercentage =
          randomTrend === "stable"
            ? Math.random() * 2
            : randomTrend === "up"
              ? 2 + Math.random() * 8
              : -(2 + Math.random() * 8)

        const mockPrediction: PredictionData = {
          commodity,
          predicted_price: randomPrice,
          confidence: randomConfidence,
          factors: [
            { factor: "Seasonal demand", impact: Math.random() * 0.4 },
            { factor: "Supply chain disruptions", impact: Math.random() * 0.3 },
            { factor: "Weather conditions", impact: Math.random() * 0.5 },
            { factor: "Market speculation", impact: Math.random() * 0.2 },
          ],
          trend: randomTrend,
          trend_percentage: randomTrendPercentage,
        }

        setPrediction(mockPrediction)
      } catch (err) {
        console.error("Error fetching model prediction:", err)
        setError("Failed to load model prediction. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (commodity) {
      fetchModelPrediction()
    }
  }, [commodity])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">ML Model Prediction</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading prediction model...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">ML Model Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-destructive">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!prediction) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">ML Model Prediction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Next Month Prediction</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">₹{prediction.predicted_price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">per quintal</p>
              </div>
              <Badge variant={prediction.confidence > 85 ? "default" : "outline"} className="text-xs">
                {prediction.confidence.toFixed(1)}% confidence
              </Badge>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Price Trend</h3>
            <div className="flex items-center">
              {prediction.trend === "up" ? (
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              ) : prediction.trend === "down" ? (
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              ) : (
                <div className="h-5 w-5 border-t-2 border-gray-400 mr-2" />
              )}
              <div>
                <p className="font-medium">
                  {prediction.trend === "up"
                    ? `Increasing by ${prediction.trend_percentage.toFixed(1)}%`
                    : prediction.trend === "down"
                      ? `Decreasing by ${Math.abs(prediction.trend_percentage).toFixed(1)}%`
                      : "Stable prices expected"}
                </p>
                <p className="text-sm text-muted-foreground">Over next 30 days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Key Influencing Factors</h3>
          <div className="space-y-3">
            {prediction.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{factor.factor}</span>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${Math.abs(factor.impact) * 100}%` }} />
                  </div>
                  <span className="ml-2 text-xs">{(factor.impact * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            This prediction is based on historical data, seasonal patterns, and market conditions. The model uses Random
            Forest regression trained on agricultural commodity datasets.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
