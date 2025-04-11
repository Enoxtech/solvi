"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, RefreshCcw } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useWallet } from "@/contexts/WalletContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCurrency } from "@/contexts/CurrencyContext"
import { WarningDialog } from "@/components/WarningDialog"
import { useRouter } from "next/navigation"
import { getRmbRate } from "@/app/actions/rmbRates"
import { motion } from "framer-motion"
import { useWalletStore } from "@/stores/walletStore"

// Define currency types without hardcoded RMB rates
const currencies = {
  NGN: {
    name: "Nigerian Naira",
    symbol: "₦",
    code: "NGN",
    flag: "🇳🇬",
    color: "#008751",
  },
  GHS: {
    name: "Ghana Cedis",
    symbol: "₵",
    code: "GHS",
    flag: "🇬🇭",
    color: "#006B3F",
  },
  KES: {
    name: "Kenya Shillings",
    symbol: "KSh",
    code: "KES",
    flag: "🇰🇪",
    color: "#BB0000",
  },
}

// Define relative exchange rates between currencies (relative to NGN)
const relativeCurrencyRates = {
  NGN: 1,
  GHS: 0.0945, // 1 NGN = 0.0945 GHS
  KES: 0.7513, // 1 NGN = 0.7513 KES
}

type CurrencyCode = keyof typeof currencies

export default function CurrencyExchange() {
  // Use both wallet context and store for consistency
  const { formattedBalance } = useWallet()
  const { getFormattedBalance } = useWalletStore()

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("NGN")
  const [sourceAmount, setSourceAmount] = useState("646464")
  const [rmbAmount, setRmbAmount] = useState("3084.27")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { currencySymbol } = useCurrency()
  const [showMinimumRmbWarning, setShowMinimumRmbWarning] = useState(false)
  const router = useRouter()
  const [rmbRate, setRmbRate] = useState<{ rate: number; lastUpdated: string } | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch the current RMB rate
  useEffect(() => {
    const fetchRmbRate = async () => {
      try {
        const rate = await getRmbRate()
        setRmbRate(rate)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch RMB rate:", error)
        setLoading(false)
      }
    }

    fetchRmbRate()

    // Set up polling for real-time updates every minute
    const intervalId = setInterval(fetchRmbRate, 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate currency rates based on the RMB rate for NGN and relative rates for other currencies
  const getCurrencyRate = (currency: CurrencyCode): number => {
    if (!rmbRate) return 0

    if (currency === "NGN") {
      return rmbRate.rate
    } else {
      // Calculate other currency rates based on their relation to NGN
      return (rmbRate.rate * relativeCurrencyRates[currency]) / relativeCurrencyRates.NGN
    }
  }

  // Calculate RMB amount when source amount changes
  const handleSourceAmountChange = (value: string) => {
    setSourceAmount(value)
    // Only calculate if there's a valid number and we have the RMB rate
    if (value && !isNaN(Number(value.replace(/,/g, ""))) && rmbRate) {
      const currencyRate = getCurrencyRate(selectedCurrency)
      const calculatedRmb = (Number(value.replace(/,/g, "")) / currencyRate).toFixed(2)
      setRmbAmount(calculatedRmb)
    } else {
      setRmbAmount("")
    }
  }

  // Calculate source amount when RMB amount changes
  const handleRmbChange = (value: string) => {
    setRmbAmount(value)
    // Only calculate if there's a valid number and we have the RMB rate
    if (value && !isNaN(Number(value.replace(/,/g, ""))) && rmbRate) {
      const currencyRate = getCurrencyRate(selectedCurrency)
      const calculatedSource = Math.round(Number(value.replace(/,/g, "")) * currencyRate).toString()
      setSourceAmount(calculatedSource)
    } else {
      setSourceAmount("")
    }
  }

  // Handle currency change
  const handleCurrencyChange = (currency: CurrencyCode) => {
    setSelectedCurrency(currency)
    // Recalculate the source amount based on the current RMB amount and new exchange rate
    if (rmbAmount && !isNaN(Number(rmbAmount.replace(/,/g, ""))) && rmbRate) {
      const currencyRate = getCurrencyRate(currency)
      const calculatedSource = Math.round(Number(rmbAmount.replace(/,/g, "")) * currencyRate).toString()
      setSourceAmount(calculatedSource)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const rate = await getRmbRate()
      setRmbRate(rate)

      // Recalculate amounts with new rate
      if (sourceAmount && !isNaN(Number(sourceAmount.replace(/,/g, "")))) {
        const currencyRate = getCurrencyRate(selectedCurrency)
        const calculatedRmb = (Number(sourceAmount.replace(/,/g, "")) / currencyRate).toFixed(2)
        setRmbAmount(calculatedRmb)
      } else if (rmbAmount && !isNaN(Number(rmbAmount.replace(/,/g, "")))) {
        const currencyRate = getCurrencyRate(selectedCurrency)
        const calculatedSource = Math.round(Number(rmbAmount.replace(/,/g, "")) * currencyRate).toString()
        setSourceAmount(calculatedSource)
      }
    } catch (error) {
      console.error("Failed to refresh RMB rate:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (!mounted || loading) return null

  const currentCurrency = currencies[selectedCurrency]
  const currencyRate = getCurrencyRate(selectedCurrency)

  // Check if RMB amount is valid and meets minimum requirement
  const isValidRmbAmount =
    rmbAmount && !isNaN(Number(rmbAmount.replace(/,/g, ""))) && Number(rmbAmount.replace(/,/g, "")) >= 50

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white">
        <Link href="/" className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold">Currency Exchange</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          className="text-white hover:text-white/80 hover:bg-white/10"
          disabled={isRefreshing}
        >
          <RefreshCcw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
        </Button>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 pb-32 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Wallet Balance Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 rounded-2xl shadow-lg shadow-black/30">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-80">Wallet Balance:</span>
                <span className="font-bold text-lg">{formattedBalance}</span>
              </div>
            </div>
          </Card>

          {/* Exchange Rate Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 rounded-2xl shadow-lg shadow-black/30">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-80">Current Rate:</span>
                <span className="font-bold text-lg">
                  1 RMB = {currencyRate.toFixed(2)} {currentCurrency.code}
                </span>
              </div>
              <span className="text-sm opacity-80">
                Updated: {rmbRate ? new Date(rmbRate.lastUpdated).toLocaleString() : "Loading..."}
              </span>
            </div>
          </Card>

          {/* Main Exchange Card */}
          <Card className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/30">
            <div className="p-6 space-y-6">
              {/* Amount to Convert */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-800">Amount to convert</h2>

                {/* Currency Selector */}
                <Select value={selectedCurrency} onValueChange={(value) => handleCurrencyChange(value as CurrencyCode)}>
                  <SelectTrigger className="w-full bg-[#F8F9FE] border-0 rounded-full">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currencies).map(([code, currency]) => (
                      <SelectItem key={code} value={code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>
                            {currency.name} ({currency.symbol})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-[#F8F9FE] rounded-full p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: currentCurrency.color }}
                    >
                      <span className="text-white text-xs">{currentCurrency.symbol}</span>
                    </div>
                    <span className="text-gray-600">{currentCurrency.code}</span>
                  </div>
                  <input
                    type="text"
                    value={sourceAmount}
                    onChange={(e) => handleSourceAmountChange(e.target.value)}
                    className="text-right bg-transparent text-xl font-semibold focus:outline-none w-40"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Amount to Receive */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-gray-800">Amount you&apos;ll receive</h2>
                <div className="bg-[#F8F9FE] rounded-full p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#DE2910] flex items-center justify-center">
                      <span className="text-white text-xs">¥</span>
                    </div>
                    <span className="text-gray-600">RMB</span>
                  </div>
                  <input
                    type="text"
                    value={rmbAmount}
                    onChange={(e) => handleRmbChange(e.target.value)}
                    className="text-right bg-transparent text-xl font-semibold focus:outline-none w-40"
                    placeholder="0.00"
                  />
                </div>
                {rmbAmount &&
                  !isNaN(Number(rmbAmount.replace(/,/g, ""))) &&
                  Number(rmbAmount.replace(/,/g, "")) < 50 && (
                    <p className="text-red-500 text-sm">Minimum purchase amount is 50 RMB</p>
                  )}
              </div>

              {/* Transaction Timing */}
              <div className="text-center space-y-1">
                <p className="text-gray-800 font-medium">Should be deposited within 5 Minutes</p>
                <p className="text-gray-500 text-sm italic">(For transactions done between 9am to 5pm)</p>
              </div>
            </div>
          </Card>

          {/* Buy RMB Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              className={cn(
                "w-full py-6 text-lg font-medium rounded-full",
                "bg-accent text-white hover:bg-accent-600",
                "shadow-nebula-lg hover:shadow-accent-glow transition-all duration-300",
                "border-2 border-transparent hover:border-accent-300",
                !isValidRmbAmount && "opacity-70 cursor-not-allowed",
              )}
              onClick={() => {
                // Check if RMB amount is less than 50
                if (!isValidRmbAmount) {
                  setShowMinimumRmbWarning(true)
                  return
                }

                // Store the current exchange details in localStorage
                localStorage.setItem(
                  "exchangeDetails",
                  JSON.stringify({
                    sourceCurrency: selectedCurrency,
                    sourceAmount,
                    rmbAmount,
                    currencySymbol: currencies[selectedCurrency].symbol,
                    currencyCode: currencies[selectedCurrency].code,
                    exchangeRate: currencyRate,
                  }),
                )

                // Navigate to the next page
                router.push("/currency-exchange/send-to")
              }}
              disabled={!isValidRmbAmount}
            >
              Buy RMB
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
        <WarningDialog
          open={showMinimumRmbWarning}
          onOpenChange={setShowMinimumRmbWarning}
          title="Minimum Purchase Required"
          message="The minimum RMB purchase amount is 50 RMB. Please increase your purchase amount."
          type="warning"
        />
        <p className="text-white/70">Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>
      </main>
    </div>
  )
}

