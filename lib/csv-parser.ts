import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

// Function to read and parse CSV file
export function readCsvFile(filePath: string) {
  try {
    const csvPath = path.join(process.cwd(), "public", filePath)
    const csvContent = fs.readFileSync(csvPath, "utf8")

    // Parse CSV
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    })

    return records
  } catch (error) {
    console.error(`Error reading CSV file: ${error}`)
    return null
  }
}

// Get list of commodities from CSV
export function getCommoditiesFromCsv() {
  try {
    const records = readCsvFile("monthly_data.csv")
    if (!records) return []

    // Extract commodity names
    return records.map((record: any) => record.Commodities)
  } catch (error) {
    console.error(`Error getting commodities: ${error}`)
    return []
  }
}

// Create a function to get historical data for a commodity
export function getHistoricalData(commodity: string) {
  try {
    const records = readCsvFile("monthly_data.csv")
    if (!records) return null

    // Find the selected commodity
    const commodityData = records.find((record: any) => record.Commodities === commodity)

    if (!commodityData) {
      return null
    }

    // Extract historical data (excluding the Commodities column)
    const months = Object.keys(commodityData).filter((key) => key !== "Commodities")
    const values = months.map((month) => Number.parseFloat(commodityData[month]))

    // Generate dates for historical data
    const historicalDates = months.map((month) => {
      // Parse month format like "Jan-14" to a date
      const [monthStr, yearStr] = month.split("-")
      const monthMap: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      }

      const monthIndex = monthMap[monthStr]
      const year = 2000 + Number.parseInt(yearStr)
      return new Date(year, monthIndex, 1)
    })

    // Create historical data array
    const historicalData = historicalDates.map((date, i) => ({
      date: date.toISOString(),
      value: values[i],
    }))

    return historicalData
  } catch (error) {
    console.error(`Error getting historical data: ${error}`)
    return null
  }
}
