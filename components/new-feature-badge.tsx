"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NewFeatureBadgeProps {
  featureId: string
  className?: string
  durationInDays?: number
}

export function NewFeatureBadge({ featureId, className, durationInDays = 7 }: NewFeatureBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the feature is new by comparing the current date with the feature's added date
    const checkIfNew = () => {
      const featureAddedDates = JSON.parse(localStorage.getItem("featureAddedDates") || "{}")

      // If the feature doesn't exist in localStorage, add it with the current date
      if (!featureAddedDates[featureId]) {
        featureAddedDates[featureId] = new Date().toISOString()
        localStorage.setItem("featureAddedDates", JSON.stringify(featureAddedDates))
        setIsVisible(true)
        return
      }

      // Check if the feature was added less than durationInDays ago
      const addedDate = new Date(featureAddedDates[featureId])
      const currentDate = new Date()
      const diffTime = currentDate.getTime() - addedDate.getTime()
      const diffDays = diffTime / (1000 * 3600 * 24)

      setIsVisible(diffDays < durationInDays)
    }

    checkIfNew()
  }, [featureId, durationInDays])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
        className,
      )}
    >
      New
    </motion.div>
  )
}

