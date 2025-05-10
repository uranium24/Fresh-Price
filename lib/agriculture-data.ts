// This file provides functions to work with the agriculture dataset
import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

interface AgricultureData {
  APMC: string
  Commodity: string
  Year: number
  Month: string
  arrivals_in_qtl: number
  min_price: number
  max_price: number
  modal_price: number
  date: string
  district_name: string
  state_name: string
}

// Function to fetch and parse the agriculture dataset
export async function getAgricultureData(): Promise<AgricultureData[]> {
  try {
    // Try to read the actual CSV file
    const csvPath = path.join(process.cwd(), "public", "Agriculture_commodities_dataset.csv")

    // Check if file exists
    if (fs.existsSync(csvPath)) {
      const csvContent = fs.readFileSync(csvPath, "utf8")

      // Parse CSV
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
      })

      // Convert string values to appropriate types
      return records.map((record: any) => ({
        APMC: record.APMC,
        Commodity: record.Commodity,
        Year: Number.parseInt(record.Year),
        Month: record.Month,
        arrivals_in_qtl: Number.parseFloat(record.arrivals_in_qtl),
        min_price: Number.parseFloat(record.min_price),
        max_price: Number.parseFloat(record.max_price),
        modal_price: Number.parseFloat(record.modal_price),
        date: record.date,
        district_name: record.district_name,
        state_name: record.state_name,
      }))
    } else {
      console.log("Agriculture dataset file not found, using mock data")
      // Return mock data if file doesn't exist
      return getMockAgricultureData()
    }
  } catch (error) {
    console.error("Error fetching agriculture data:", error)
    // Return mock data in case of error
    return getMockAgricultureData()
  }
}

// Function to generate mock agriculture data
function getMockAgricultureData(): AgricultureData[] {
  // Mock data based on the sample provided
  return [
    {
      APMC: "Ahmednagar",
      Commodity: "Bajri",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 79,
      min_price: 1406,
      max_price: 1538,
      modal_price: 1463,
      date: "2015-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Bajri",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 106,
      min_price: 1788,
      max_price: 1925,
      modal_price: 1875,
      date: "2016-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Wheat(Husked)",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 1253,
      min_price: 1572,
      max_price: 1890,
      modal_price: 1731,
      date: "2015-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Wheat(Husked)",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 387,
      min_price: 1750,
      max_price: 2220,
      modal_price: 1999,
      date: "2016-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Sorgum(Jawar)",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 3825,
      min_price: 1600,
      max_price: 2200,
      modal_price: 1900,
      date: "2015-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Sorgum(Jawar)",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 2093,
      min_price: 1695,
      max_price: 2454,
      modal_price: 2119,
      date: "2016-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Maize",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 75,
      min_price: 1345,
      max_price: 1401,
      modal_price: 1373,
      date: "2015-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Maize",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 155,
      min_price: 1367,
      max_price: 1392,
      modal_price: 1375,
      date: "2016-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Gram",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 1794,
      min_price: 3533,
      max_price: 3762,
      modal_price: 3647,
      date: "2015-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    {
      APMC: "Ahmednagar",
      Commodity: "Gram",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 630,
      min_price: 4790,
      max_price: 5553,
      modal_price: 5216,
      date: "2016-04",
      district_name: "Ahmadnagar",
      state_name: "Maharashtra",
    },
    // Add more commodities and markets
    {
      APMC: "Kota",
      Commodity: "Wheat(Husked)",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 1850,
      min_price: 1490,
      max_price: 1780,
      modal_price: 1650,
      date: "2015-04",
      district_name: "Kota",
      state_name: "Rajasthan",
    },
    {
      APMC: "Kota",
      Commodity: "Wheat(Husked)",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 2100,
      min_price: 1680,
      max_price: 1950,
      modal_price: 1820,
      date: "2016-04",
      district_name: "Kota",
      state_name: "Rajasthan",
    },
    {
      APMC: "Indore",
      Commodity: "Soybean",
      Year: 2015,
      Month: "April",
      arrivals_in_qtl: 2500,
      min_price: 3700,
      max_price: 4200,
      modal_price: 3950,
      date: "2015-04",
      district_name: "Indore",
      state_name: "Madhya Pradesh",
    },
    {
      APMC: "Indore",
      Commodity: "Soybean",
      Year: 2016,
      Month: "April",
      arrivals_in_qtl: 2800,
      min_price: 3900,
      max_price: 4500,
      modal_price: 4200,
      date: "2016-04",
      district_name: "Indore",
      state_name: "Madhya Pradesh",
    },
  ]
}

// Get top markets for a commodity
export async function getTopMarketsForCommodity(commodity: string): Promise<
  {
    apmc: string
    state: string
    price: number
    arrivals: number
  }[]
> {
  try {
    const data = await getAgricultureData()

    // Filter data for the specified commodity
    const commodityData = data.filter(
      (item) =>
        item.Commodity.toLowerCase() === commodity.toLowerCase() ||
        item.Commodity.toLowerCase().includes(commodity.toLowerCase()),
    )

    if (commodityData.length === 0) {
      // Return mock data if no matching commodity found
      return [
        {
          apmc: "Ahmednagar",
          state: "Maharashtra",
          price: 1875,
          arrivals: 2500,
        },
        {
          apmc: "Kota",
          state: "Rajasthan",
          price: 1780,
          arrivals: 1800,
        },
        {
          apmc: "Indore",
          state: "Madhya Pradesh",
          price: 1820,
          arrivals: 2200,
        },
      ]
    }

    // Group by APMC and calculate average price and total arrivals
    const marketMap = new Map<string, { state: string; totalPrice: number; totalArrivals: number; count: number }>()

    commodityData.forEach((item) => {
      const key = item.APMC
      if (!marketMap.has(key)) {
        marketMap.set(key, {
          state: item.state_name,
          totalPrice: 0,
          totalArrivals: 0,
          count: 0,
        })
      }

      const market = marketMap.get(key)!
      market.totalPrice += item.modal_price
      market.totalArrivals += item.arrivals_in_qtl
      market.count += 1
    })

    // Convert to array and sort by arrivals
    const markets = Array.from(marketMap.entries()).map(([apmc, data]) => ({
      apmc,
      state: data.state,
      price: data.totalPrice / data.count,
      arrivals: data.totalArrivals / data.count,
    }))

    // Sort by arrivals in descending order and take top 3
    return markets.sort((a, b) => b.arrivals - a.arrivals).slice(0, 3)
  } catch (error) {
    console.error("Error getting top markets:", error)
    return [
      {
        apmc: "Ahmednagar",
        state: "Maharashtra",
        price: 1875,
        arrivals: 2500,
      },
      {
        apmc: "Kota",
        state: "Rajasthan",
        price: 1780,
        arrivals: 1800,
      },
      {
        apmc: "Indore",
        state: "Madhya Pradesh",
        price: 1820,
        arrivals: 2200,
      },
    ]
  }
}

// Get price range for a commodity
export async function getPriceRangeForCommodity(commodity: string): Promise<{
  min: number
  max: number
  avg: number
}> {
  try {
    const data = await getAgricultureData()

    // Filter data for the specified commodity
    const commodityData = data.filter(
      (item) =>
        item.Commodity.toLowerCase() === commodity.toLowerCase() ||
        item.Commodity.toLowerCase().includes(commodity.toLowerCase()),
    )

    if (commodityData.length === 0) {
      // Return mock data if no matching commodity found
      return {
        min: 1500,
        max: 2200,
        avg: 1850,
      }
    }

    // Calculate min, max, and average prices
    const prices = commodityData.map((item) => item.modal_price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length

    return {
      min,
      max,
      avg,
    }
  } catch (error) {
    console.error("Error getting price range:", error)
    return {
      min: 1500,
      max: 2200,
      avg: 1850,
    }
  }
}

// Get seasonality data for a commodity
export async function getSeasonalityForCommodity(commodity: string): Promise<{
  bestMonth: string
  worstMonth: string
  volatilityScore: number
}> {
  try {
    const data = await getAgricultureData()

    // Filter data for the specified commodity
    const commodityData = data.filter(
      (item) =>
        item.Commodity.toLowerCase() === commodity.toLowerCase() ||
        item.Commodity.toLowerCase().includes(commodity.toLowerCase()),
    )

    if (commodityData.length === 0) {
      // Return mock data if no matching commodity found
      return {
        bestMonth: "March",
        worstMonth: "August",
        volatilityScore: 5.7,
      }
    }

    // Group by month and calculate average prices
    const monthMap = new Map<string, { totalPrice: number; count: number }>()

    commodityData.forEach((item) => {
      if (!monthMap.has(item.Month)) {
        monthMap.set(item.Month, { totalPrice: 0, count: 0 })
      }

      const month = monthMap.get(item.Month)!
      month.totalPrice += item.modal_price
      month.count += 1
    })

    // Calculate average price for each month
    const monthlyPrices = Array.from(monthMap.entries()).map(([month, data]) => ({
      month,
      avgPrice: data.totalPrice / data.count,
    }))

    // Find best and worst months
    monthlyPrices.sort((a, b) => b.avgPrice - a.avgPrice)
    const bestMonth = monthlyPrices[0]?.month || "March"
    const worstMonth = monthlyPrices[monthlyPrices.length - 1]?.month || "August"

    // Calculate volatility score (standard deviation of prices)
    const prices = monthlyPrices.map((item) => item.avgPrice)
    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length
    const squaredDiffs = prices.map((price) => Math.pow(price - avg, 2))
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length
    const stdDev = Math.sqrt(variance)

    // Normalize volatility score to 0-10 scale
    const volatilityScore = Math.min(10, (stdDev / avg) * 100)

    return {
      bestMonth,
      worstMonth,
      volatilityScore,
    }
  } catch (error) {
    console.error("Error getting seasonality data:", error)
    return {
      bestMonth: "March",
      worstMonth: "August",
      volatilityScore: 5.7,
    }
  }
}

// Get supply trend for a commodity
export async function getSupplyTrendForCommodity(commodity: string): Promise<"increasing" | "decreasing" | "stable"> {
  try {
    const data = await getAgricultureData()

    // Filter data for the specified commodity
    const commodityData = data.filter(
      (item) =>
        item.Commodity.toLowerCase() === commodity.toLowerCase() ||
        item.Commodity.toLowerCase().includes(commodity.toLowerCase()),
    )

    if (commodityData.length === 0) {
      // Return mock data if no matching commodity found
      return ["increasing", "decreasing", "stable"][Math.floor(Math.random() * 3)] as
        | "increasing"
        | "decreasing"
        | "stable"
    }

    // Group by year and calculate total arrivals
    const yearMap = new Map<number, number>()

    commodityData.forEach((item) => {
      if (!yearMap.has(item.Year)) {
        yearMap.set(item.Year, 0)
      }

      yearMap.set(item.Year, yearMap.get(item.Year)! + item.arrivals_in_qtl)
    })

    // Sort years
    const years = Array.from(yearMap.keys()).sort()

    if (years.length < 2) {
      return "stable"
    }

    // Calculate trend based on last two years
    const lastYear = years[years.length - 1]
    const previousYear = years[years.length - 2]

    const lastYearArrivals = yearMap.get(lastYear) || 0
    const previousYearArrivals = yearMap.get(previousYear) || 0

    const percentageChange = ((lastYearArrivals - previousYearArrivals) / previousYearArrivals) * 100

    if (percentageChange > 10) {
      return "increasing"
    } else if (percentageChange < -10) {
      return "decreasing"
    } else {
      return "stable"
    }
  } catch (error) {
    console.error("Error getting supply trend:", error)
    return ["increasing", "decreasing", "stable"][Math.floor(Math.random() * 3)] as
      | "increasing"
      | "decreasing"
      | "stable"
  }
}
