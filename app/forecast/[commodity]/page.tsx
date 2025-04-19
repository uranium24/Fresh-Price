import { ForecastResults } from "@/components/forecast-results"
import { generateForecast } from "@/lib/forecast"
import { notFound } from "next/navigation"

export default async function ForecastPage({
  params,
}: {
  params: { commodity: string }
}) {
  const commodity = decodeURIComponent(params.commodity)

  try {
    const forecastData = await generateForecast(commodity)

    if (!forecastData) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-gradient-to-b from-mint-50 to-mint-100 dark:from-gray-950 dark:to-gray-900 p-6">
        <ForecastResults
          commodity={commodity}
          forecastData={forecastData.forecast}
          historicalData={forecastData.historical}
          rmse={forecastData.rmse}
        />
      </main>
    )
  } catch (error) {
    console.error("Error generating forecast:", error)
    notFound()
  }
}
