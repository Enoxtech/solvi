"use client"

import { useEffect, useState } from "react"
import { DollarSign, RefreshCw } from "lucide-react"
import { getRmbRate } from "@/app/actions/rmbRates"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface RmbRateDisplayProps {
  showRefresh?: boolean
  className?: string
  showAdminLink?: boolean
}

export function SharedRmbRateDisplay({
  showRefresh = false,
  className = "",
  showAdminLink = false,
}: RmbRateDisplayProps) {
  const [rmbRate, setRmbRate] = useState<{ rate: number; lastUpdated: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchRate = async () => {
    try {
      const rate = await getRmbRate()
      setRmbRate(rate)
    } catch (error) {
      console.error("Failed to fetch RMB rate:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRate()

    // Set up polling for real-time updates every 5 minutes
    const intervalId = setInterval(fetchRate, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchRate()
    setRefreshing(false)
  }

  if (loading) {
    return (
      <div className={`rounded-lg border bg-white/5 backdrop-blur-md p-4 shadow-lg ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white/70">Current RMB Rate</h3>
            <div className="h-7 w-24 bg-white/10 animate-pulse rounded mt-1"></div>
          </div>
          <div className="rounded-full bg-white/10 p-3">
            <DollarSign className="h-6 w-6 text-white/50" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md p-4 shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/70">Current RMB Rate</h3>
          <p className="text-2xl font-bold text-white">₦{rmbRate?.rate.toFixed(2)}</p>
        </div>
        {showRefresh ? (
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        ) : (
          <div className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-white/50">
        Last updated: {rmbRate ? new Date(rmbRate.lastUpdated).toLocaleString() : "Unknown"}
      </p>

      {showAdminLink && (
        <div className="mt-3">
          <Link href="/admin/rmb-rates">
            <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs">
              Manage RMB Rates →
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}

