"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageBackground } from '@/components/PageBackground'
import { useWalletStore } from "@/stores/walletStore"
import { sendTransactionNotification } from '@/lib/email'

export default function CurrencyExchangePage() {
  const [mounted, setMounted] = useState(false)
  const [rmbRate, setRmbRate] = useState<{ rate: number; lastUpdated: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [amountToSend, setAmountToSend] = useState('')
  const [amountToReceive, setAmountToReceive] = useState('')

  const walletBalance = useWalletStore((state) => state.balance)
  const setWalletBalance = useWalletStore((state) => state.setBalance)

  useEffect(() => {
    setMounted(true)
    fetchRmbRate()
    const interval = setInterval(fetchRmbRate, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const fetchRmbRate = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
      const data = await response.json()
      setRmbRate({
        rate: data.rates.CNY,
        lastUpdated: new Date().toLocaleTimeString(),
      })
      setLoading(false)
    } catch (err) {
      console.error('Error fetching RMB rate:', err)
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchRmbRate()
  }

  const handleAmountToSendChange = (value: string) => {
    setAmountToSend(value)
    if (rmbRate && value) {
      const sendAmount = parseFloat(value)
      const receiveAmount = sendAmount * rmbRate.rate
      setAmountToReceive(receiveAmount.toFixed(2))
    } else {
      setAmountToReceive('')
    }
  }

  const handleAmountToReceiveChange = (value: string) => {
    setAmountToReceive(value)
    if (rmbRate && value) {
      const receiveAmount = parseFloat(value)
      const sendAmount = receiveAmount / rmbRate.rate
      setAmountToSend(sendAmount.toFixed(2))
    } else {
      setAmountToSend('')
    }
  }

  const isValid = () => {
    if (!amountToSend || !amountToReceive) return false
    const sendAmount = parseFloat(amountToSend)
    const receiveAmount = parseFloat(amountToReceive)
    return (
      !isNaN(sendAmount) &&
      !isNaN(receiveAmount) &&
      sendAmount > 0 &&
      receiveAmount >= 100 && // Minimum 100 RMB
      sendAmount <= walletBalance
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const sendAmount = parseFloat(amountToSend)

      // Simulate transaction processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a transaction ID
      const transactionId = `TXN${Date.now()}`

      // Send transaction notification email
      await sendTransactionNotification(
        'delivered@resend.dev', // Replace with actual user email in production
        'User', // Replace with actual username in production
        transactionId,
        amountToSend,
        'USD',
        'completed'
      )

      // Update wallet balance
      const newBalance = walletBalance - sendAmount
      setWalletBalance(newBalance)

      // Show success message
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        // Reset form
        setAmountToSend('')
        setAmountToReceive('')
      }, 3000)
    } catch (err) {
      setError('Failed to process transaction. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted || loading) return null

  return (
    <div className="min-h-screen">
      <PageBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <button
            onClick={handleRefresh}
            className="text-white/80 hover:text-white transition-colors"
          >
            <RefreshCw className="h-6 w-6" />
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white">
                Currency Exchange
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6 px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}
                {success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="text-sm text-green-700">
                      Transaction completed successfully!
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Amount to Send (USD)
                  </label>
                  <input
                    type="number"
                    value={amountToSend}
                    onChange={(e) => handleAmountToSendChange(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50"
                    placeholder="0.00"
                  />
                  <p className="text-sm text-white/60">
                    Available balance: ${walletBalance.toFixed(2)} USD
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">
                    Amount to Receive (RMB)
                  </label>
                  <input
                    type="number"
                    value={amountToReceive}
                    onChange={(e) => handleAmountToReceiveChange(e.target.value)}
                    min="100"
                    step="0.01"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-white/50"
                    placeholder="0.00"
                  />
                  <p className="text-sm text-white/60">
                    Current rate: 1 USD = {rmbRate?.rate.toFixed(4)} RMB
                    <br />
                    Last updated: {rmbRate?.lastUpdated}
                  </p>
                  <p className="text-sm text-white/60">
                    Minimum amount: 100 RMB
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isValid() || isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Exchange Currency'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

