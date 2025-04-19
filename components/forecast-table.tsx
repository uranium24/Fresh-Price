"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"

interface ForecastTableProps {
  data: {
    date: string
    forecast: number
  }[]
}

export function ForecastTable({ data }: ForecastTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Date</TableHead>
            <TableHead className="w-1/3">Year</TableHead>
            <TableHead className="w-1/3 text-right">Price Forecast</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const date = new Date(item.date)
            return (
              <TableRow key={index}>
                <TableCell className="font-mono text-xs">{format(date, "MMM-yyyy")}</TableCell>
                <TableCell>{format(date, "yyyy")}</TableCell>
                <TableCell className="text-right">₹{item.forecast.toFixed(2)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
