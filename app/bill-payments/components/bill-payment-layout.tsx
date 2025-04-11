"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { PageBackground } from "@/components/PageBackground"

interface BillPaymentLayoutProps {
  children: ReactNode
  title: string
}

export function BillPaymentLayout({ children, title }: BillPaymentLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Use the app's PageBackground component */}
      <PageBackground />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/bill-payments" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white text-center flex-1">{title}</h1>
          <div className="w-6"></div>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

