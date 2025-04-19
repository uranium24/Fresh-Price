// SARIMAX implementation in JavaScript
// This is a simplified version for demonstration purposes
function sarimax(data: number[], steps: number): number[] {
  // Simple forecasting logic (in a real app, you'd use a proper SARIMAX implementation)
  const lastValue = data[data.length - 1]

  // Calculate average change using differences
  const avgChange = data.slice(1).reduce((sum, val, i) => sum + (val - data[i]), 0) / (data.length - 1)

  // Calculate standard deviation for randomization
  const sum = data.reduce((acc, val) => acc + val, 0)
  const mean = sum / data.length
  const squaredDifferences = data.map((val) => Math.pow(val - mean, 2))
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / data.length
  const stdDev = Math.sqrt(variance) * 0.1 // Use 10% of std dev for noise

  // Generate forecast with some randomness to simulate SARIMAX behavior
  return Array.from({ length: steps }, (_, i) => {
    const trend = lastValue + avgChange * (i + 1)
    const seasonality = Math.sin((i / 12) * Math.PI * 2) * (avgChange * 2) // Seasonal component
    const randomness = (Math.random() - 0.5) * stdDev // Small random component based on data variance
    return trend + seasonality + randomness
  })
}

// Calculate RMSE
function calculateRMSE(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length) {
    throw new Error("Arrays must have the same length")
  }

  const squaredErrors = actual.map((val, i) => Math.pow(val - predicted[i], 2))
  const meanSquaredError = squaredErrors.reduce((sum, val) => sum + val, 0) / actual.length
  return Math.sqrt(meanSquaredError)
}

import { getHistoricalData } from "./csv-parser"

export async function generateForecast(commodity: string) {
  try {
    // Get historical data from CSV
    const historicalData = getHistoricalData(commodity)

    if (!historicalData) {
      throw new Error(`Commodity ${commodity} not found in dataset`)
    }

    // Extract values from historical data
    const values = historicalData.map((item) => item.value)

    // Generate forecast for next 5 years (60 months)
    const forecastValues = sarimax(values, 60)

    // Generate dates for forecast
    const lastHistoricalDate = new Date(historicalData[historicalData.length - 1].date)
    const forecastDates = Array.from({ length: 60 }, (_, i) => {
      const date = new Date(lastHistoricalDate)
      date.setMonth(date.getMonth() + i + 1)
      return date
    })

    // Create forecast data array
    const forecastData = forecastDates.map((date, i) => ({
      date: date.toISOString(),
      forecast: forecastValues[i],
    }))

    // Calculate RMSE using a portion of historical data
    const trainingSize = Math.floor(values.length * 0.8)
    const trainingData = values.slice(0, trainingSize)
    const validationData = values.slice(trainingSize)
    const validationPredictions = sarimax(trainingData, validationData.length)
    const rmse = calculateRMSE(validationData, validationPredictions)

    return {
      historical: historicalData,
      forecast: forecastData,
      rmse,
    }
  } catch (error) {
    console.error("Error generating forecast:", error)
    throw error
  }
}
