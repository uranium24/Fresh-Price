import { getCommoditiesFromCsv } from "@/lib/csv-parser"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const commodities = getCommoditiesFromCsv()
    return NextResponse.json(commodities)
  } catch (error) {
    console.error("Error fetching commodities:", error)
    return NextResponse.json({ error: "Failed to fetch commodities" }, { status: 500 })
  }
}
