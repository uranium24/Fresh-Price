import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

interface PredictionResponse {
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

export async function GET(request: NextRequest, { params }: { params: { commodity: string } }) {
  try {
    const commodity = decodeURIComponent(params.commodity)

    // In a real implementation, this would call the Python backend
    // For now, we'll simulate the model prediction with realistic data

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

    const mockPrediction: PredictionResponse = {
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

    return NextResponse.json(mockPrediction)
  } catch (error) {
    console.error("Error generating model prediction:", error)
    return NextResponse.json({ error: "Failed to generate model prediction" }, { status: 500 })
  }
}
