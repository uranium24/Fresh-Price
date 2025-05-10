// API client for communicating with the local Next.js API routes

export async function getCommodities(): Promise<string[]> {
  try {
    const response = await fetch("/api/commodities")

    if (!response.ok) {
      throw new Error(`Failed to fetch commodities: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching commodities:", error)
    throw error
  }
}

export async function getForecast(commodity: string) {
  try {
    const response = await fetch(`/api/forecast/${encodeURIComponent(commodity)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch forecast: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching forecast:", error)
    throw error
  }
}

export async function getModelPrediction(commodity: string) {
  try {
    const response = await fetch(`/api/model-prediction/${encodeURIComponent(commodity)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch model prediction: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching model prediction:", error)
    throw error
  }
}

export async function getMarketInsights(commodity: string) {
  try {
    const response = await fetch(`/api/market-insights/${encodeURIComponent(commodity)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch market insights: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching market insights:", error)
    throw error
  }
}
