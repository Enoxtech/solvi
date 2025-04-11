"use client"

import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApiEndpoint {
  name: string
  status: "operational" | "degraded" | "down"
  responseTime: number
  lastChecked: string
}

export function AdminApiStatus() {
  const apiEndpoints: ApiEndpoint[] = [
    {
      name: "Authentication API",
      status: "operational",
      responseTime: 120,
      lastChecked: "2 minutes ago",
    },
    {
      name: "Transactions API",
      status: "operational",
      responseTime: 145,
      lastChecked: "2 minutes ago",
    },
    {
      name: "User Management API",
      status: "degraded",
      responseTime: 350,
      lastChecked: "2 minutes ago",
    },
    {
      name: "Payments API",
      status: "operational",
      responseTime: 130,
      lastChecked: "2 minutes ago",
    },
    {
      name: "Notifications API",
      status: "down",
      responseTime: 0,
      lastChecked: "2 minutes ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational"
      case "degraded":
        return "Degraded"
      case "down":
        return "Down"
      default:
        return "Unknown"
    }
  }

  const getResponseTimeColor = (time: number, status: string) => {
    if (status === "down") return "text-red-500"
    if (time < 150) return "text-green-500"
    if (time < 300) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-4">
      {apiEndpoints.map((endpoint) => (
        <div
          key={endpoint.name}
          className={cn(
            "p-4 rounded-lg",
            endpoint.status === "operational"
              ? "bg-white/5"
              : endpoint.status === "degraded"
                ? "bg-yellow-500/10"
                : "bg-red-500/10",
          )}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {getStatusIcon(endpoint.status)}
              <div>
                <h3 className="text-white font-medium">{endpoint.name}</h3>
                <p
                  className={cn(
                    "text-xs",
                    endpoint.status === "operational"
                      ? "text-green-400"
                      : endpoint.status === "degraded"
                        ? "text-yellow-400"
                        : "text-red-400",
                  )}
                >
                  {getStatusText(endpoint.status)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("text-sm font-medium", getResponseTimeColor(endpoint.responseTime, endpoint.status))}>
                {endpoint.status === "down" ? "N/A" : `${endpoint.responseTime}ms`}
              </p>
              <p className="text-xs text-white/60">Last checked: {endpoint.lastChecked}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

