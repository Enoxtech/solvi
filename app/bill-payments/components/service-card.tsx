"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  label: string
  color: string
  onClick: () => void
}

export function ServiceCard({ icon, label, color, onClick }: ServiceCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full h-32 rounded-2xl overflow-hidden shadow-lg ${color} before:absolute before:inset-0 before:bg-gradient-to-br before:z-0 hover:shadow-xl transition-shadow`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/10 z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative z-20 h-full flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-white/20 rounded-full p-3 mb-2 backdrop-blur-sm">{icon}</div>
        <span className="text-white font-medium">{label}</span>
      </div>
    </motion.button>
  )
}

