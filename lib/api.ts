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
