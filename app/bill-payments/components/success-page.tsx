"use client"

import { motion } from "framer-motion"
import { CheckCircle, Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageBackground } from "@/components/PageBackground"

interface SuccessPageProps {
  type: "airtime" | "data" | "tv" | "electricity"
  providerName: string
  phoneNumber?: string
  cardNumber?: string
  meterNumber?: string
  amount: number
  planName?: string
  meterType?: "prepaid" | "postpaid"
  onDone: () => void
  onBuyAgain: () => void
}

export function SuccessPage({
  type,
  providerName,
  phoneNumber,
  cardNumber,
  meterNumber,
  amount,
  planName,
  meterType,
  onDone,
  onBuyAgain,
}: SuccessPageProps) {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)

  const getTitle = () => {
    switch (type) {
      case "airtime":
        return "Airtime Purchase Successful"
      case "data":
        return "Data Purchase Successful"
      case "tv":
        return "Cable TV Payment Successful"
      case "electricity":
        return "Electricity Payment Successful"
      default:
        return "Transaction Successful"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "airtime":
        return `Your airtime purchase of ${formattedAmount} was successful.`
      case "data":
        return `Your data purchase of ${planName} for ${formattedAmount} was successful.`
      case "tv":
        return `Your ${providerName} subscription for ${planName} was successful.`
      case "electricity":
        return `Your ${meterType} electricity payment of ${formattedAmount} to ${providerName} was successful.`
      default:
        return "Your transaction was successful."
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Use the app's PageBackground component */}
      <PageBackground />

      <div className="relative z-10 max-w-lg mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 w-full max-w-md flex flex-col items-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="bg-green-500/20 p-4 rounded-full mb-6"
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-2 text-center">{getTitle()}</h2>
          <p className="text-white/80 mb-6 text-center">{getDescription()}</p>

          <div className="w-full space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-white/70">Provider</span>
              <span className="text-white font-medium">{providerName}</span>
            </div>

            {phoneNumber && (
              <div className="flex justify-between">
                <span className="text-white/70">Phone Number</span>
                <span className="text-white font-medium">{phoneNumber}</span>
              </div>
            )}

            {cardNumber && (
              <div className="flex justify-between">
                <span className="text-white/70">Card/IUC Number</span>
                <span className="text-white font-medium">{cardNumber}</span>
              </div>
            )}

            {meterNumber && (
              <div className="flex justify-between">
                <span className="text-white/70">Meter Number</span>
                <span className="text-white font-medium">{meterNumber}</span>
              </div>
            )}

            {meterType && (
              <div className="flex justify-between">
                <span className="text-white/70">Meter Type</span>
                <span className="text-white font-medium capitalize">{meterType}</span>
              </div>
            )}

            {planName && (
              <div className="flex justify-between">
                <span className="text-white/70">Plan</span>
                <span className="text-white font-medium">{planName}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-white/70">Amount</span>
              <span className="text-white font-medium">{formattedAmount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/70">Date</span>
              <span className="text-white font-medium">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/70">Time</span>
              <span className="text-white font-medium">{new Date().toLocaleTimeString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-white/70">Status</span>
              <span className="text-green-400 font-medium">Successful</span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <Button
              onClick={onDone}
              className="w-full bg-white hover:bg-gray-100 text-primary font-semibold py-6 rounded-xl"
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            <Button
              onClick={onBuyAgain}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/20 font-medium py-6 rounded-xl"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {type === "electricity" ? "Pay Again" : type === "tv" ? "Pay Again" : "Buy Again"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

