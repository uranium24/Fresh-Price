import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  getTopMarketsForCommodity,
  getPriceRangeForCommodity,
  getSeasonalityForCommodity,
  getSupplyTrendForCommodity,
} from "@/lib/agriculture-data"

interface MarketInsightsResponse {
  commodity: string
  topMarkets: {
    apmc: string
    state: string
    price: number
    arrivals: number
  }[]
  priceRange: {
    min: number
    max: number
    avg: number
  }
  seasonality: {
    bestMonth: string
    worstMonth: string
    volatilityScore: number
  }
  supplyTrend: "increasing" | "decreasing" | "stable"
}

export async function GET(request: NextRequest, { params }: { params: { commodity: string } }) {
  try {
    const commodity = decodeURIComponent(params.commodity)

    // Get data from agriculture dataset
    const topMarkets = await getTopMarketsForCommodity(commodity)
    const priceRange = await getPriceRangeForCommodity(commodity)
    const seasonality = await getSeasonalityForCommodity(commodity)
    const supplyTrend = await getSupplyTrendForCommodity(commodity)

    const marketInsights: MarketInsightsResponse = {
      commodity,
      topMarkets,
      priceRange,
      seasonality,
      supplyTrend,
    }

    return NextResponse.json(marketInsights)
  } catch (error) {
    console.error("Error generating market insights:", error)
    return NextResponse.json({ error: "Failed to generate market insights" }, { status: 500 })
  }
}
