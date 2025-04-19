"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { getCommodities } from "@/lib/api"

export function HomeForm() {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("")
  const [commodities, setCommodities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadCommodities() {
      try {
        const data = await getCommodities()
        setCommodities(data)
      } catch (error) {
        console.error("Failed to load commodities:", error)
        // Fallback in case of error
        setCommodities([
          "Atta (Wheat)",
          "Rice",
          "Maize",
          "Soybean",
          "Potato",
          "Onion",
          "Tomato",
          "Sugar",
          "Salt Pack (Iodised)",
        ])
      } finally {
        setLoading(false)
      }
    }

    loadCommodities()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCommodity) {
      router.push(`/forecast/${encodeURIComponent(selectedCommodity)}`)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <CardHeader className="flex flex-col items-center pt-10">
        <div className="h-16 w-16 text-green-500 mb-4">
          <Leaf className="h-full w-full" />
        </div>
        <h1 className="text-3xl font-bold text-center">FreshPrice</h1>
        <p className="text-muted-foreground text-center mt-2">Price Prediction for Agricultural Commodities</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              <label htmlFor="commodity" className="text-sm font-medium">
                Choose a Commodity
              </label>
            </div>
            <Select value={selectedCommodity} onValueChange={setSelectedCommodity} disabled={loading}>
              <SelectTrigger id="commodity">
                <SelectValue placeholder={loading ? "Loading commodities..." : "Select commodity"} />
              </SelectTrigger>
              <SelectContent>
                {commodities.map((commodity) => (
                  <SelectItem key={commodity} value={commodity}>
                    {commodity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={!selectedCommodity || loading}
          >
            Generate Forecast
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
