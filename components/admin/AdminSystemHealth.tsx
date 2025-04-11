"use client"

import type React from "react"

import { CheckCircle, AlertTriangle, XCircle, Server, Database, Globe, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface SystemService {
  name: string
  icon: React.ElementType
  status: "operational" | "degraded" | "down"
  load: number
  uptime: string
}

export function AdminSystemHealth() {
  const systemServices: SystemService[] = [
    {
      name: "Web Servers",
      icon: Server,
      status: "operational",
      load: 42,
      uptime: "99.98%",
    },
    {
      name: "Database Cluster",
      icon: Database,
      status: "degraded",
      load: 78,
      uptime: "99.5%",
    },
    {
      name: "API Gateway",
      icon: Globe,
      status: "operational",
      load: 35,
      uptime: "99.99%",
    },
    {
      name: "Authentication Service",
      icon: Shield,
      status: "operational",
      load: 28,
      uptime: "100%",
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

  const getLoadColor = (load: number) => {
    if (load < 50) return "bg-green-500"
    if (load < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      {systemServices.map((service) => (
        <div
          key={service.name}
          className={cn(
            "p-4 rounded-lg",
            service.status === "operational"
              ? "bg-white/5"
              : service.status === "degraded"
                ? "bg-yellow-500/10"
                : "bg-red-500/10",
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/10 p-2 rounded-full">
              <service.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-medium">{service.name}</h3>
              <div className="flex items-center gap-1">
                {getStatusIcon(service.status)}
                <p
                  className={cn(
                    "text-xs",
                    service.status === "operational"
                      ? "text-green-400"
                      : service.status === "degraded"
                        ? "text-yellow-400"
                        : "text-red-400",
                  )}
                >
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-white/70">
              <span>Current Load</span>
              <span>{service.load}%</span>
            </div>
            <Progress
              value={service.load}
              className={cn("h-2 bg-white/10", getLoadColor(service.load))}
            />

            <div className="flex justify-between items-center text-xs text-white/70 mt-2">
              <span>Uptime</span>
              <span className="text-white font-medium">{service.uptime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

