"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Copy, CreditCard, Smartphone } from "lucide-react"
import { useWalletStore } from "@/stores/walletStore"
import { useToast } from "@/components/ui/use-toast"

export function FundWalletDialog() {
  const { isFundWalletDialogOpen, closeFundWalletDialog, balance, fundWallet } = useWalletStore()
  const { toast } = useToast()
  const [amount, setAmount] = useState<string>("500")
  const [step, setStep] = useState<number>(1)
  const [selectedMethod, setSelectedMethod] = useState<string>("card")
  const [copied, setCopied] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const resetDialog = () => {
    setStep(1)
    setAmount("500")
    setSelectedMethod("card")
  }

  const handleClose = () => {
    closeFundWalletDialog()
    setTimeout(() => resetDialog(), 300)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setAmount(value)
  }

  const handleContinue = () => {
    if (!amount || Number.parseInt(amount) < 100) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount of at least ₦100",
        variant: "destructive",
      })
      return
    }
    setStep(2)
  }

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
    setStep(3)
  }

  const handleCopyAccountDetails = () => {
    navigator.clipboard.writeText("0011223344 - Velocia Bank")
    setCopied(true)
    toast({
      title: "Account Details Copied",
      description: "Account details copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCompleteFunding = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const amountValue = Number.parseInt(amount)
      // Convert to kobo (smallest currency unit) - 100 kobo = 1 Naira
      const amountInKobo = amountValue * 100
      fundWallet(amountInKobo)

      // Add to transaction history
      setLoading(false)
      setStep(4)
    }, 1500)
  }

  const getButtonLabel = () => {
    if (step === 1) return "Continue"
    if (step === 3) {
      if (selectedMethod === "bank") return "I've Made the Transfer"
      return loading ? "Processing..." : "Pay ₦" + amount
    }
    if (step === 4) return "Done"
    return "Continue"
  }

  const handleButtonClick = () => {
    if (step === 1) handleContinue()
    else if (step === 3) handleCompleteFunding()
    else if (step === 4) handleClose()
  }

  return (
    <Dialog open={isFundWalletDialogOpen} onOpenChange={(open) => (open ? null : closeFundWalletDialog())}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-2xl border-0">
        <DialogHeader className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
          <DialogTitle className="text-xl font-bold">Fund Your Wallet</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    Enter Amount (₦)
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">₦</span>
                    </div>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      className="pl-7 text-lg font-medium"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["500", "1000", "2000"].map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      className={`${amount === preset ? "border-primary text-primary" : "border-gray-200"}`}
                      onClick={() => setAmount(preset)}
                    >
                      ₦{preset}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-800">Select Payment Method</h3>

                <div className="space-y-3">
                  <Card
                    className="border border-gray-200 hover:border-primary cursor-pointer transition-all duration-200"
                    onClick={() => handleMethodSelect("card")}
                  >
                    <div className="p-4 flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Debit Card</h4>
                        <p className="text-sm text-gray-500">Pay with Mastercard, Visa, etc.</p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className="border border-gray-200 hover:border-primary cursor-pointer transition-all duration-200"
                    onClick={() => handleMethodSelect("mobile")}
                  >
                    <div className="p-4 flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <Smartphone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Mobile Money</h4>
                        <p className="text-sm text-gray-500">Pay with USSD or mobile banking</p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className="border border-gray-200 hover:border-primary cursor-pointer transition-all duration-200"
                    onClick={() => handleMethodSelect("bank")}
                  >
                    <div className="p-4 flex items-center space-x-3">
                      <div className="bg-purple-100 rounded-full p-2">
                        <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Bank Transfer</h4>
                        <p className="text-sm text-gray-500">Pay via bank transfer</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {selectedMethod === "bank" ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Bank Transfer Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account Name</span>
                        <span className="font-medium">Velocia Ltd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">0011223344</span>
                          <button onClick={handleCopyAccountDetails} className="text-primary hover:text-primary/80">
                            {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bank</span>
                        <span className="font-medium">Velocia Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium">₦{amount}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Please transfer the exact amount to the account details above. Click the button below once you
                      have made the transfer.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {selectedMethod === "card" ? "Card Payment" : "Mobile Money Payment"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      You will be charged ₦{amount} for this transaction. Click the button below to proceed.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-center"
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-bold text-gray-800">Wallet Funded Successfully</h3>
                <p className="text-gray-600">
                  Your wallet has been credited with ₦{amount}. Thank you for using Velocia.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <Button
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white"
            onClick={handleButtonClick}
          >
            {getButtonLabel()}
          </Button>
          {step !== 4 && (
            <Button variant="ghost" className="w-full mt-2" onClick={handleClose}>
              Cancel
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

