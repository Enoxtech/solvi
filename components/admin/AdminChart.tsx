"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

const data = [
  { name: "Jan", revenue: 4000, transactions: 2400, users: 240 },
  { name: "Feb", revenue: 3000, transactions: 1398, users: 210 },
  { name: "Mar", revenue: 2000, transactions: 9800, users: 290 },
  { name: "Apr", revenue: 2780, transactions: 3908, users: 320 },
  { name: "May", revenue: 1890, transactions: 4800, users: 340 },
  { name: "Jun", revenue: 2390, transactions: 3800, users: 380 },
  { name: "Jul", revenue: 3490, transactions: 4300, users: 430 },
  { name: "Aug", revenue: 4000, transactions: 2400, users: 240 },
  { name: "Sep", revenue: 3000, transactions: 1398, users: 210 },
  { name: "Oct", revenue: 2000, transactions: 9800, users: 290 },
  { name: "Nov", revenue: 2780, transactions: 3908, users: 320 },
  { name: "Dec", revenue: 3490, transactions: 4300, users: 430 },
]

type ChartType = "line" | "area" | "bar"
type TimeRange = "1M" | "3M" | "6M" | "1Y" | "ALL"

export function AdminChart() {
  const [chartType, setChartType] = useState<ChartType>("area")
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y")

  // Filter data based on time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "1M":
        return data.slice(-1)
      case "3M":
        return data.slice(-3)
      case "6M":
        return data.slice(-6)
      case "1Y":
        return data
      case "ALL":
        return data
      default:
        return data
    }
  }

  const filteredData = getFilteredData()

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              transactions: {
                label: "Transactions",
                color: "hsl(var(--chart-2))",
              },
              users: {
                label: "New Users",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="var(--color-transactions)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "area":
        return (
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              transactions: {
                label: "Transactions",
                color: "hsl(var(--chart-2))",
              },
              users: {
                label: "New Users",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-transactions)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-transactions)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="transactions"
                  stroke="var(--color-transactions)"
                  fillOpacity={1}
                  fill="url(#colorTransactions)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "bar":
        return (
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              transactions: {
                label: "Transactions",
                color: "hsl(var(--chart-2))",
              },
              users: {
                label: "New Users",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="transactions" fill="var(--color-transactions)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChartType("line")}
            className={`border-white/20 text-white hover:bg-white/10 ${chartType === "line" ? "bg-white/20" : ""}`}
          >
            Line
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChartType("area")}
            className={`border-white/20 text-white hover:bg-white/10 ${chartType === "area" ? "bg-white/20" : ""}`}
          >
            Area
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChartType("bar")}
            className={`border-white/20 text-white hover:bg-white/10 ${chartType === "bar" ? "bg-white/20" : ""}`}
          >
            Bar
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("1M")}
            className={`border-white/20 text-white hover:bg-white/10 ${timeRange === "1M" ? "bg-white/20" : ""}`}
          >
            1M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("3M")}
            className={`border-white/20 text-white hover:bg-white/10 ${timeRange === "3M" ? "bg-white/20" : ""}`}
          >
            3M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("6M")}
            className={`border-white/20 text-white hover:bg-white/10 ${timeRange === "6M" ? "bg-white/20" : ""}`}
          >
            6M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("1Y")}
            className={`border-white/20 text-white hover:bg-white/10 ${timeRange === "1Y" ? "bg-white/20" : ""}`}
          >
            1Y
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeRange("ALL")}
            className={`border-white/20 text-white hover:bg-white/10 ${timeRange === "ALL" ? "bg-white/20" : ""}`}
          >
            ALL
          </Button>
        </div>
      </div>

      {renderChart()}
    </div>
  )
}

