import { generateForecast } from "@/lib/forecast"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { commodity: string } }) {
  try {
    const commodity = decodeURIComponent(params.commodity)
    const forecastData = await generateForecast(commodity)

    return NextResponse.json(forecastData)
  } catch (error) {
    console.error("Error generating forecast:", error)
    return NextResponse.json({ error: "Failed to generate forecast" }, { status: 500 })
  }
}
