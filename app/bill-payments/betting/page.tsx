"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { PageBackground } from "@/components/PageBackground"

const bettingProviders = [
  { id: "bangbet", name: "BangBet" },
  { id: "bet9ja", name: "Bet9ja" },
  { id: "betking", name: "BetKing" },
  { id: "betland", name: "BetLand" },
  { id: "cloudbet", name: "CloudBet" },
  { id: "livescorebet", name: "LiveScoreBet" },
  { id: "merrybet", name: "MerryBet" },
  { id: "naijabet", name: "NaijaBet" },
  { id: "nairabet", name: "NairaBet" },
  { id: "supabet", name: "SupaBet" },
]

export default function BettingPage() {
  return (
    <div className="min-h-screen relative">
      <PageBackground />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/bill-payments" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white text-center flex-1">Betting</h1>
          <div className="w-6"></div>
        </motion.div>

        {/* Providers Grid */}
        <div className="grid grid-cols-2 gap-4">
          {bettingProviders.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/bill-payments/betting/${provider.id}`}>
                <Card className="bg-white/10 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="text-white font-medium">{provider.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

