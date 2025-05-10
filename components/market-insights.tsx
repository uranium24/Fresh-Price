"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, TrendingUp, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getMarketInsights } from "@/lib/api"

interface MarketInsightsProps {
  commodity: string
}

interface MarketData {
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

export function MarketInsights({ commodity }: MarketInsightsProps) {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMarketData() {
      try {
        setLoading(true)
        const data = await getMarketInsights(commodity)
        setMarketData(data)
      } catch (err) {
        console.error("Error fetching market data:", err)
        setError("Failed to load market insights. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (commodity) {
      fetchMarketData()
    }
  }, [commodity])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Market Insights</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex justify-center items-center">
          <div className="animate-pulse space-y-4 w-full">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Market Insights</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!marketData) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Market Insights for {commodity}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="markets">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="markets" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Top Markets</span>
            </TabsTrigger>
            <TabsTrigger value="prices" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Price Range</span>
            </TabsTrigger>
            <TabsTrigger value="seasonality" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Seasonality</span>
            </TabsTrigger>
            <TabsTrigger value="supply" className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Supply</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="markets" className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">Top APMCs with highest trading volume</h3>
            <div className="space-y-3">
              {marketData.topMarkets.map((market, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{market.apmc}</h4>
                      <p className="text-sm text-muted-foreground">{market.state}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{market.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{market.arrivals.toLocaleString()} qtl arrivals</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prices">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Minimum</p>
                  <p className="text-xl font-bold">₹{marketData.priceRange.min.toFixed(2)}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-xl font-bold">₹{marketData.priceRange.avg.toFixed(2)}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Maximum</p>
                  <p className="text-xl font-bold">₹{marketData.priceRange.max.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <p className="text-sm font-medium">Price Spread</p>
                <div className="mt-2 relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-primary"
                    style={{
                      left: `${((marketData.priceRange.min - marketData.priceRange.min * 0.9) / (marketData.priceRange.max * 1.1 - marketData.priceRange.min * 0.9)) * 100}%`,
                      width: `${((marketData.priceRange.max - marketData.priceRange.min) / (marketData.priceRange.max * 1.1 - marketData.priceRange.min * 0.9)) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute h-full w-1 bg-black dark:bg-white"
                    style={{
                      left: `${((marketData.priceRange.avg - marketData.priceRange.min * 0.9) / (marketData.priceRange.max * 1.1 - marketData.priceRange.min * 0.9)) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>₹{(marketData.priceRange.min * 0.9).toFixed(0)}</span>
                  <span>₹{(marketData.priceRange.max * 1.1).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seasonality">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Best buying month</p>
                  <p className="text-lg font-medium">{marketData.seasonality.worstMonth}</p>
                  <Badge variant="outline" className="mt-1">
                    Lowest prices
                  </Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Best selling month</p>
                  <p className="text-lg font-medium">{marketData.seasonality.bestMonth}</p>
                  <Badge variant="outline" className="mt-1">
                    Highest prices
                  </Badge>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Price Volatility</p>
                  <Badge
                    variant={
                      marketData.seasonality.volatilityScore < 3
                        ? "outline"
                        : marketData.seasonality.volatilityScore < 7
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {marketData.seasonality.volatilityScore < 3
                      ? "Low"
                      : marketData.seasonality.volatilityScore < 7
                        ? "Medium"
                        : "High"}
                  </Badge>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      marketData.seasonality.volatilityScore < 3
                        ? "bg-green-500"
                        : marketData.seasonality.volatilityScore < 7
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${(marketData.seasonality.volatilityScore / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="supply">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Supply Trend</h3>
                <div className="flex items-center mt-2">
                  {marketData.supplyTrend === "increasing" ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <p>
                        Supply is <span className="font-medium">increasing</span> in markets
                      </p>
                    </>
                  ) : marketData.supplyTrend === "decreasing" ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-red-500 mr-2 rotate-180" />
                      <p>
                        Supply is <span className="font-medium">decreasing</span> in markets
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="h-5 w-5 border-t-2 border-gray-400 mr-2" />
                      <p>
                        Supply is <span className="font-medium">stable</span> in markets
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  {marketData.supplyTrend === "increasing" ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Prices may decrease due to increasing supply. Consider waiting for better rates.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Monitor quality as increased supply may lead to quality variations.</span>
                      </li>
                    </>
                  ) : marketData.supplyTrend === "decreasing" ? (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Prices may increase due to decreasing supply. Consider buying soon.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Secure long-term contracts with suppliers to ensure availability.</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Stable supply indicates predictable pricing. Good time for medium-term planning.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>Focus on quality differentiation and value-added services.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
