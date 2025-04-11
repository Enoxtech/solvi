"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, RefreshCw, Wallet, CreditCard, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FundWalletDialog } from "@/components/FundWalletDialog"
import { useWallet } from "@/contexts/WalletContext"
import { WarningDialog } from "@/components/WarningDialog"
import { useWalletStore } from "@/stores/walletStore"
import Image from 'next/image'

interface TransactionDetails {
  rmbAmount: string
  sourceAmount: string
  sourceCurrency: string
  currencySymbol: string
  currencyCode: string
  exchangeRate: number
  alipayName: string
  alipayId: string
  qrCodePreview: string
}

export default function ConfirmDetails() {
  // Add this near the top of the component
  const [, forceRender] = useState({})
  const forceUpdate = useCallback(() => forceRender({}), [])

  // Core state
  const { balance, formattedBalance, updateBalance, setIsFundWalletDialogOpen } = useWallet()
  const { deductFromWallet } = useWalletStore()
  const [details, setDetails] = useState<TransactionDetails | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const { toast } = useToast()
  const router = useRouter()

  // Debug wallet balance
  useEffect(() => {
    console.log(`Wallet balance: ${balance} kobo (₦${(balance / 100).toFixed(2)})`)
  }, [balance])

  // UI state
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Warning dialog state
  const [warningState, setWarningState] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning" as "error" | "warning" | "info",
    action: undefined as { label: string; onClick: () => void } | undefined,
  })

  // Refs to prevent re-renders
  const transactionAmountRef = useRef(0)
  const walletBalancePercentageRef = useRef(0)
  const amountNeededRef = useRef("0.00")
  const detailsLoadedRef = useRef(false)
  const qrWarningShownRef = useRef(false)

  // Load transaction details - only runs once
  useEffect(() => {
    if (detailsLoadedRef.current) return

    const loadDetails = () => {
      const recipientDetails = localStorage.getItem("currentTransaction")
      const exchangeDetails = localStorage.getItem("exchangeDetails")

      if (recipientDetails && exchangeDetails) {
        try {
          const parsedRecipient = JSON.parse(recipientDetails)
          const parsedExchange = JSON.parse(exchangeDetails)

          const loadedDetails = {
            ...parsedRecipient,
            rmbAmount: parsedExchange.rmbAmount || "66.33",
            sourceAmount: parsedExchange.sourceAmount || "13,899.97",
            sourceCurrency: parsedExchange.sourceCurrency || "NGN",
            currencySymbol: parsedExchange.currencySymbol || "₦",
            currencyCode: parsedExchange.currencyCode || "NGN",
            exchangeRate: parsedExchange.exchangeRate || 209.6,
          }

          // Recalculate the source amount based on the RMB amount and exchange rate
          // to ensure they are always in sync
          const rmbAmount = Number.parseFloat(loadedDetails.rmbAmount.replace(/,/g, ""))
          const calculatedSourceAmount = (rmbAmount * loadedDetails.exchangeRate).toFixed(2)
          loadedDetails.sourceAmount = calculatedSourceAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

          setDetails(loadedDetails)
          detailsLoadedRef.current = true

          // Calculate initial values
          calculateTransactionValues(loadedDetails)
        } catch (error) {
          console.error("Error parsing transaction details:", error)
          toast({
            title: "Error",
            description: "Could not load transaction details. Please try again.",
            variant: "destructive",
          })
          router.push("/currency-exchange/send-to")
        }
      } else {
        router.push("/currency-exchange/send-to")
      }
    }
    loadDetails()
  }, [router, toast])

  const calculateTransactionValues = useCallback(
    (detailsObj: TransactionDetails | null) => {
      if (!detailsObj) return

      try {
        // Parse the RMB amount and calculate the Naira equivalent
        const rmbAmount = Number.parseFloat(detailsObj.rmbAmount.replace(/,/g, ""))
        const sourceAmount = rmbAmount * detailsObj.exchangeRate

        if (isNaN(sourceAmount)) {
          throw new Error("Invalid source amount")
        }

        // Convert to kobo/cents (smallest currency unit)
        // Note: The balance is already in kobo (100 kobo = 1 naira)
        const newTransactionAmount = Math.round(sourceAmount * 100)

        // Calculate percentage of wallet balance
        const newWalletBalancePercentage = Math.min((balance / newTransactionAmount) * 100, 100)

        // Calculate amount needed - convert from kobo to naira for display
        const newAmountNeeded =
          newTransactionAmount > balance ? ((newTransactionAmount - balance) / 100).toFixed(2) : "0.00"

        // Update refs only
        transactionAmountRef.current = newTransactionAmount
        walletBalancePercentageRef.current = newWalletBalancePercentage
        amountNeededRef.current = newAmountNeeded

        // Debug calculations
        console.log(`Transaction amount: ${newTransactionAmount} kobo (₦${(newTransactionAmount / 100).toFixed(2)})`)
        console.log(`Wallet balance: ${balance} kobo (₦${(balance / 100).toFixed(2)})`)
        console.log(`Wallet percentage: ${newWalletBalancePercentage}%`)
        console.log(`Amount needed: ₦${newAmountNeeded}`)

        // Force a re-render to update the UI
        forceUpdate()
      } catch (error) {
        console.error("Error calculating transaction values:", error)
      }
    },
    [balance, forceUpdate],
  )

  // Update calculations when balance changes
  useEffect(() => {
    if (details) {
      calculateTransactionValues(details)
    }
  }, [balance, details, calculateTransactionValues])

  // Check for QR code requirement - runs when details change
  useEffect(() => {
    if (details && !qrWarningShownRef.current) {
      // Check if RMB amount is greater than 100 and QR code is missing
      const rmbAmountValue = Number.parseFloat(details.rmbAmount.replace(/,/g, ""))
      if (rmbAmountValue > 100 && !details.qrCodePreview) {
        qrWarningShownRef.current = true
        setWarningState({
          show: true,
          title: "QR Code Required",
          message: "QR code is required for transactions above 100 RMB. Please go back and upload a QR code.",
          type: "error",
          action: {
            label: "Go Back",
            onClick: () => {
              router.push("/currency-exchange/send-to")
            },
          },
        })
      }
    }
  }, [details, router])

  // Subscribe to wallet store changes to ensure real-time balance updates
  useEffect(() => {
    const unsubscribe = useWalletStore.subscribe((state) => {
      // Force re-render when wallet balance changes
      if (state.balance !== undefined) {
        forceUpdate()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [forceUpdate, useWalletStore])

  const handleRefresh = async () => {
    if (isRefreshing) return

    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Force a re-render to ensure we have the latest balance
      forceUpdate()
      toast({
        title: "Balance Updated",
        description: "Your wallet balance has been refreshed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not refresh wallet balance. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleBuyNow = async () => {
    // Prevent multiple clicks
    if (isProcessing) return

    // Check if a payment method is selected
    if (!paymentMethod) {
      setWarningState({
        show: true,
        title: "Please select a payment method",
        message: "Choose how you would like to pay for this transaction",
        type: "warning",
        action: undefined,
      })
      return
    }

    if (!details) {
      setWarningState({
        show: true,
        title: "Missing Details",
        message: "Transaction details are missing. Please try again.",
        type: "error",
        action: undefined,
      })
      return
    }

    setIsProcessing(true)

    try {
      // For wallet payments, check if balance is sufficient
      if (paymentMethod === "wallet") {
        // Calculate the exact transaction amount based on RMB amount and exchange rate
        const rmbAmount = Number.parseFloat(details.rmbAmount.replace(/,/g, ""))
        const exactNairaAmount = rmbAmount * details.exchangeRate
        const transactionAmountInKobo = Math.round(exactNairaAmount * 100)

        console.log(
          `Processing RMB purchase: ${rmbAmount} RMB at rate ${details.exchangeRate} = ${exactNairaAmount} NGN (${transactionAmountInKobo} kobo)`,
        )
        console.log(`Current wallet balance: ${balance} kobo (₦${(balance / 100).toFixed(2)})`)

        // Debug the comparison
        if (balance < transactionAmountInKobo) {
          console.log(`Insufficient funds: ${balance} < ${transactionAmountInKobo}`)
          setWarningState({
            show: true,
            title: "Insufficient Balance",
            message: `Your wallet balance is insufficient for this transaction. You need ₦${((transactionAmountInKobo - balance) / 100).toFixed(2)} more.`,
            type: "error",
            action: {
              label: "Fund Wallet",
              onClick: () => {
                // Open fund wallet dialog
                setIsFundWalletDialogOpen(true)
              },
            },
          })
          setIsProcessing(false)
          return
        } else {
          console.log(`Sufficient funds: ${balance} >= ${transactionAmountInKobo}`)
        }

        // Create a pending transaction with the exact amount
        const transactionId = deductFromWallet(
          transactionAmountInKobo,
          `Bought ${details.rmbAmount} RMB at ₦${details.exchangeRate.toFixed(2)}/RMB`,
          "RMB Purchase",
          "Pending", // Set status as Pending instead of Successful
          Number.parseFloat(details.rmbAmount.replace(/,/g, "")), // Original RMB amount
          details.exchangeRate, // Exchange rate used
        )

        if (!transactionId) {
          throw new Error("Failed to create transaction")
        }
      } else {
        // Simulate card payment processing
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      // Store the transaction in localStorage for the dashboard
      const transaction = {
        id: `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: "RMB Purchase",
        amount: details
          ? `${details.currencySymbol} ${(
              Number.parseFloat(details.rmbAmount.replace(/,/g, "")) * details.exchangeRate
            ).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "",
        description: `Bought ${details?.rmbAmount} RMB at ₦${details.exchangeRate.toFixed(2)}/RMB`,
        date: new Date().toISOString(),
        status: "Pending", // Set as pending
      }

      const transactions = JSON.parse(localStorage.getItem("recentTransactions") || "[]")
      transactions.unshift(transaction)
      localStorage.setItem("recentTransactions", JSON.stringify(transactions))

      // Show pending dialog instead of success
      setShowSuccessDialog(true)
    } catch (error) {
      console.error("Transaction error:", error)
      toast({
        title: "Transaction Failed",
        description: "Could not complete the transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    router.push("/")
  }

  const handleGoBack = () => {
    router.push("/currency-exchange/send-to")
  }

  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Format the source amount with commas if needed
  const formattedSourceAmount = details.sourceAmount.includes(",")
    ? details.sourceAmount
    : Number(details.sourceAmount).toLocaleString()

  // Check if RMB amount is greater than 100 for QR code requirement
  const rmbAmountValue = Number.parseFloat(details.rmbAmount.replace(/,/g, ""))
  const qrCodeRequired = rmbAmountValue > 100

  // Calculate transaction amount directly for display
  const rmbAmount = details ? Number.parseFloat(details.rmbAmount.replace(/,/g, "")) : 0
  const sourceAmountValue = details ? rmbAmount * details.exchangeRate : 0
  const transactionAmountInKobo = Math.round(sourceAmountValue * 100)
  const walletBalancePercentage = Math.min((balance / transactionAmountInKobo) * 100, 100)
  const amountNeededInNaira =
    transactionAmountInKobo > balance ? ((transactionAmountInKobo - balance) / 100).toFixed(2) : "0.00"

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Warning Alert */}
      <WarningDialog
        open={warningState.show}
        onOpenChange={(open) => setWarningState((prev) => ({ ...prev, show: open }))}
        title={warningState.title}
        message={warningState.message}
        type={warningState.type}
        action={warningState.action}
      />

      {/* Fund Wallet Dialog */}
      <FundWalletDialog />

      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/currency-exchange/send-to" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Confirm Details</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="bg-white/90 backdrop-blur-md p-6 rounded-2xl space-y-6 border-0 shadow-lg shadow-black/20">
            {qrCodeRequired && !details.qrCodePreview ? (
              <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-xl">
                <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                <p className="text-red-600 font-medium text-center">
                  QR code is required for transactions above 100 RMB
                </p>
                <Button onClick={handleGoBack} className="mt-3 bg-red-500 hover:bg-red-600 text-white">
                  Go Back & Upload QR Code
                </Button>
              </div>
            ) : details.qrCodePreview ? (
              <div className="flex justify-center">
                <Image 
                  src={details.qrCodePreview || "/placeholder.svg"}
                  alt="QR Code"
                  width={300}
                  height={300}
                  className="w-32 h-32 object-contain rounded-lg shadow-md"
                />
              </div>
            ) : null}

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Amount (RMB)</span>
                <span className="text-2xl font-semibold text-gray-900">¥ {details.rmbAmount}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Amount ({details.currencyCode})</span>
                <span className="text-2xl font-semibold text-gray-900">
                  {details.currencySymbol} {formattedSourceAmount}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Exchange Rate</span>
                <span className="text-lg font-medium text-gray-900">
                  1 RMB = {details.exchangeRate.toFixed(2)} {details.currencyCode}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Recipient</span>
                <span className="text-lg font-medium text-gray-900">{details.alipayName}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Alipay ID</span>
                <span className="text-lg font-medium text-gray-900">{details.alipayId}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Select Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <Card
                className={`bg-white/90 backdrop-blur-md rounded-2xl border-0 shadow-lg shadow-black/20 overflow-hidden transition-all duration-300 ${paymentMethod === "wallet" ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="wallet" id="wallet" className="text-blue-500" />
                    <div>
                      <Label htmlFor="wallet" className="text-base font-medium text-gray-900">
                        Pay from Wallet
                      </Label>
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-500">
                          Balance:{" "}
                          <span className="font-medium" data-testid="wallet-balance">
                            {formattedBalance}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRefresh}
                      className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      disabled={isRefreshing}
                    >
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-500 border-blue-500 hover:bg-blue-50"
                      onClick={() => setIsFundWalletDialogOpen(true)}
                    >
                      + Fund Wallet
                    </Button>
                  </div>
                </div>
                {paymentMethod === "wallet" && (
                  <div className="px-4 pb-4">
                    <Progress value={walletBalancePercentage} className="h-2" />
                    <p className="text-sm text-gray-500 mt-2 flex justify-between">
                      <span>
                        {walletBalancePercentage < 100
                          ? `You need ₦${amountNeededInNaira} more in your wallet`
                          : "Your wallet balance is sufficient for this transaction"}
                      </span>
                      <span className="font-medium">
                        {formattedBalance} / ₦
                        {(Number.parseFloat(details.rmbAmount.replace(/,/g, "")) * details.exchangeRate).toLocaleString(
                          "en-NG",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </Card>
              <Card
                className={`bg-white/90 backdrop-blur-md rounded-2xl border-0 shadow-lg overflow-hidden transition-all duration-300 ${paymentMethod === "card" ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <RadioGroupItem value="card" id="card" className="text-blue-500" />
                    <div>
                      <Label htmlFor="card" className="text-base font-medium text-gray-900">
                        Pay with Card
                      </Label>
                      <p className="text-sm text-gray-500">Debit/Credit Card</p>
                    </div>
                  </div>
                  <CreditCard className="h-6 w-6 text-gray-400" />
                </div>
              </Card>
            </RadioGroup>
          </div>

          {/* Buy Now Button */}
          <Button
            onClick={handleBuyNow}
            className="w-full py-6 text-lg font-medium rounded-full bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={(qrCodeRequired && !details.qrCodePreview) || isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 animate-spin" />
                Processing...
              </span>
            ) : (
              "Buy Now"
            )}
          </Button>
        </motion.div>
      </main>

      {/* Success/Pending Dialog */}
      <AnimatePresence>
        {showSuccessDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">RMB Purchase Pending</h2>
                <p className="text-gray-600 mb-6">
                  Your RMB purchase request has been submitted and is pending admin approval. You will receive a
                  notification once the transaction is approved.
                </p>
                <Button
                  onClick={handleCloseSuccessDialog}
                  className="w-full py-2 text-lg font-medium rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Go to Dashboard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-white/70">Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>
    </div>
  )
}

