"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Wallet, ArrowRightLeft, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { useWalletStore } from "@/stores/walletStore"
import { hapticFeedback } from "@/utils/haptics"

export function WalletBalanceCard() {
  const [showBalance, setShowBalance] = useState(true)
  const { balance, getFormattedBalance, openFundWalletDialog } = useWalletStore()

  // Force re-render when balance changes
  useEffect(() => {
    // This effect will run whenever the balance changes
    // The dependency array ensures it only runs when balance changes
    console.log("Balance updated in WalletBalanceCard:", balance)
  }, [balance])

  const toggleBalance = () => {
    hapticFeedback.light()
    setShowBalance(!showBalance)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{
        type: "spring",
        stiffness: 200, // Reduced stiffness for slower movement
        damping: 20, // Increased damping for slower movement
        duration: 0.5, // Longer duration
      }}
    >
      <Card className="wallet-card relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-none shadow-nebula-lg hover:shadow-nebula-glow transition-all duration-300">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-800/10 to-indigo-600/20"></div>
        <div className="absolute inset-0 bg-[url('/nebula-pattern.svg')] opacity-5"></div>
        <CardContent className="relative z-10 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white/90">Wallet Balance</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBalance}
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          <h2 className="text-4xl font-bold text-white">
            {showBalance
              ? getFormattedBalance()
              : getFormattedBalance().charAt(0) + "*".repeat(getFormattedBalance().length - 1)}
          </h2>
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-white hover:bg-white/90 text-purple-900 hover:text-purple-800 transition-colors"
              onClick={openFundWalletDialog}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Fund
            </Button>
            <Link href="/wallet/transfer" passHref className="flex-1">
              <Button
                variant="outline"
                className="w-full border-white/80 bg-white/10 text-white font-medium hover:bg-white/20 hover:text-white"
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Transfer
              </Button>
            </Link>
            <Link href="/transactions" passHref className="flex-1">
              <Button
                variant="outline"
                className="w-full border-white/80 bg-white/10 text-white font-medium hover:bg-white/20 hover:text-white"
              >
                <History className="mr-2 h-4 w-4" />
                History
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

