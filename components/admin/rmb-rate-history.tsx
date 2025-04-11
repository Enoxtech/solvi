"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, TrendingDown, Filter } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Sample historical data
const historicalData = [
  { date: "2025-03-01", rate: 148.25 },
  { date: "2025-03-02", rate: 148.5 },
  { date: "2025-03-03", rate: 149.0 },
  { date: "2025-03-04", rate: 149.75 },
  { date: "2025-03-05", rate: 150.25 },
  { date: "2025-03-06", rate: 150.5 },
  { date: "2025-03-07", rate: 150.75 },
  { date: "2025-03-08", rate: 150.25 },
  { date: "2025-03-09", rate: 149.75 },
  { date: "2025-03-10", rate: 149.5 },
  { date: "2025-03-11", rate: 150.0 },
  { date: "2025-03-12", rate: 150.25 },
  { date: "2025-03-13", rate: 150.5 },
  { date: "2025-03-14", rate: 150.75 },
  { date: "2025-03-15", rate: 150.75 },
]

// Sample rate change logs
const rateChangeLogs = [
  {
    id: "1",
    date: "2025-03-15 14:30:00",
    oldRate: 150.5,
    newRate: 150.75,
    changedBy: "Admin User",
    reason: "Market fluctuation adjustment",
  },
  {
    id: "2",
    date: "2025-03-13 10:15:00",
    oldRate: 150.25,
    newRate: 150.5,
    changedBy: "System",
    reason: "Automated daily update",
  },
  {
    id: "3",
    date: "2025-03-12 09:45:00",
    oldRate: 150.0,
    newRate: 150.25,
    changedBy: "Admin User",
    reason: "Adjusted based on market trends",
  },
  {
    id: "4",
    date: "2025-03-11 16:20:00",
    oldRate: 149.5,
    newRate: 150.0,
    changedBy: "System",
    reason: "Automated daily update",
  },
  {
    id: "5",
    date: "2025-03-09 11:30:00",
    oldRate: 150.25,
    newRate: 149.75,
    changedBy: "Admin User",
    reason: "Weekend rate adjustment",
  },
]

type TimeRange = "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL"

export function RmbRateHistory() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")

  // Filter data based on time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "1W":
        return historicalData.slice(-7)
      case "1M":
        return historicalData
      case "3M":
        return [...historicalData, ...historicalData.slice(-15)]
      case "6M":
        return [...historicalData, ...historicalData, ...historicalData.slice(-10)]
      case "1Y":
        return [...historicalData, ...historicalData, ...historicalData, ...historicalData]
      case "ALL":
        return [...historicalData, ...historicalData, ...historicalData, ...historicalData]
      default:
        return historicalData
    }
  }

  const filteredData = getFilteredData()

  return (
    <div className="space-y-6">
      {/* Chart Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h3 className="text-xl font-semibold text-white">Rate Trend</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTimeRange("1W")}
              className={`border-white/20 text-white hover:bg-white/10 ${timeRange === "1W" ? "bg-white/20" : ""}`}
            >
              1W
            </Button>
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

        <div className="bg-white/5 rounded-lg p-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: "rgba(255,255,255,0.7)" }}
                domain={["dataMin - 1", "dataMax + 1"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 30, 60, 0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: "#1a1a3a" }}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#fff" }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rate Change Logs */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Rate Change History</h3>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="space-y-3">
          {rateChangeLogs.map((log) => (
            <Card key={log.id} className="bg-white/5 border-white/10 p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    {log.newRate > log.oldRate ? (
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        ₦{log.oldRate.toFixed(2)} → ₦{log.newRate.toFixed(2)}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          log.newRate > log.oldRate ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {(((log.newRate - log.oldRate) / log.oldRate) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{log.reason}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-1 text-white/70 text-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(log.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/70 text-sm">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{new Date(log.date).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-white/70 text-sm mt-1">By: {log.changedBy}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

