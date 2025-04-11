"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AdminMetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: string
}

export function AdminMetricCard({ title, value, change, trend, icon, color }: AdminMetricCardProps) {
  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
      <Card className={`bg-gradient-to-br ${color} border-none shadow-lg h-full overflow-hidden relative`}>
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
              <h3 className="text-white text-2xl font-bold">{value}</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
          </div>

          <div className="mt-4 flex items-center">
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-300 mr-1" />
            ) : trend === "down" ? (
              <ArrowDownRight className="h-4 w-4 text-red-300 mr-1" />
            ) : null}
            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-green-300" : trend === "down" ? "text-red-300" : "text-white/80"
              }`}
            >
              {change} from last month
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

