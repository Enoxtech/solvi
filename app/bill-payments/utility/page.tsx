"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Zap, Droplet, Wifi, Home } from "lucide-react"
import Link from "next/link"
import { PageBackground } from "@/components/PageBackground"
import { useWallet } from "@/contexts/WalletContext"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface UtilityOption {
  icon: React.ReactNode
  title: string
  description: string
  path: string
  color: string
}

export default function UtilityPayments() {
  const { formattedBalance } = useWallet()
  const router = useRouter()

  const utilityOptions: UtilityOption[] = [
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Electricity",
      description: "Pay for prepaid or postpaid electricity",
      path: "/bill-payments/utility/electricity",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <Droplet className="h-8 w-8 text-white" />,
      title: "Water",
      description: "Pay your water bills",
      path: "/bill-payments/utility/water",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Wifi className="h-8 w-8 text-white" />,
      title: "Internet",
      description: "Pay for internet services",
      path: "/bill-payments/utility/internet",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Home className="h-8 w-8 text-white" />,
      title: "Housing",
      description: "Pay for rent and housing services",
      path: "/bill-payments/utility/housing",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen relative">
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
          <h1 className="text-3xl font-bold text-white text-center flex-1">Utility Payments</h1>
          <div className="w-6"></div>
        </motion.div>

        {/* Wallet Balance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 rounded-2xl shadow-lg shadow-black/30">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm opacity-80">Wallet Balance:</span>
              <span className="font-bold text-lg">{formattedBalance}</span>
            </div>
          </Card>
        </motion.div>

        {/* Utility Options */}
        <div className="grid gap-4">
          {utilityOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => router.push(option.path)}
              className="cursor-pointer"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors">
                <div className="flex items-center">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mr-4`}
                  >
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{option.title}</h3>
                    <p className="text-white/70 text-sm">{option.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

