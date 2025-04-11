"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PageBackground } from "@/components/PageBackground"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useWallet } from "@/contexts/WalletContext"
import { electricityProviders, type ElectricityProvider } from "../../data/electricity-providers"
import { ElectricityProviderDialog } from "../../components/electricity-provider-dialog"
import { SuccessPage } from "../../components/success-page"

export default function PayElectricity() {
  const router = useRouter()
  const { formattedBalance } = useWallet()

  const [selectedProvider, setSelectedProvider] = useState<ElectricityProvider | null>(null)
  const [providerDialogOpen, setProviderDialogOpen] = useState(false)
  const [meterNumber, setMeterNumber] = useState("")
  const [amount, setAmount] = useState<string>("")
  const [meterType, setMeterType] = useState<"prepaid" | "postpaid">("prepaid")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("beneficiary")

  const quickAmounts = [2000, 5000, 10000, 20000]

  const handleContinue = () => {
    if (!selectedProvider || !meterNumber || !amount) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handlePayAgain = () => {
    setMeterNumber("")
    setAmount("")
    setIsSuccess(false)
  }

  const handleDone = () => {
    router.push("/dashboard")
  }

  if (isSuccess && selectedProvider) {
    return (
      <SuccessPage
        type="electricity"
        providerName={selectedProvider.name}
        meterNumber={meterNumber}
        amount={Number.parseFloat(amount) || 0}
        meterType={meterType}
        onDone={handleDone}
        onBuyAgain={handlePayAgain}
      />
    )
  }

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
          <h1 className="text-3xl font-bold text-white text-center flex-1">Pay Electricity</h1>
          <div className="w-6"></div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 space-y-5 mb-5"
        >
          {/* Provider Selection */}
          <div>
            <label className="block text-white mb-2">Electricity Provider</label>
            <button
              onClick={() => setProviderDialogOpen(true)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-left px-4 py-4 rounded-xl flex justify-between items-center"
            >
              <span className="text-white/70">
                {selectedProvider ? selectedProvider.name : "Select Electricity Provider"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/70"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Meter Type */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMeterType("prepaid")}
              className={`py-4 rounded-xl font-medium transition-colors ${
                meterType === "prepaid"
                  ? "bg-white text-primary"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              }`}
            >
              Prepaid
            </button>
            <button
              onClick={() => setMeterType("postpaid")}
              className={`py-4 rounded-xl font-medium transition-colors ${
                meterType === "postpaid"
                  ? "bg-white text-primary"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              }`}
            >
              Postpaid
            </button>
          </div>

          {/* Meter Number */}
          <div>
            <label className="block text-white mb-2">Meter Number</label>
            <Input
              type="text"
              placeholder="Enter Meter Number"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/50 py-6 rounded-xl"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-white mb-2">Amount</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/[^0-9]/g, "")
                  setAmount(value)
                }}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/50 pl-10 py-6 rounded-xl"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-bold">₦</div>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className={`py-3 rounded-xl font-medium transition-colors ${
                  amount === quickAmount.toString()
                    ? "bg-white text-primary"
                    : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                }`}
              >
                ₦{quickAmount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Save as Beneficiary */}
          <div className="flex items-center justify-between">
            <label htmlFor="saveBeneficiary" className="text-white">
              Save as Beneficiary
            </label>
            <Switch id="saveBeneficiary" checked={saveAsBeneficiary} onCheckedChange={setSaveAsBeneficiary} />
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Button
            onClick={handleContinue}
            disabled={!selectedProvider || !meterNumber || !amount || isProcessing}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-6 rounded-xl disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Continue"}
          </Button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5"
        >
          <Tabs defaultValue="beneficiary" className="w-full">
            <TabsList className="grid grid-cols-2 bg-transparent">
              <TabsTrigger
                value="beneficiary"
                className={`py-3 border-b-2 ${
                  activeTab === "beneficiary" ? "border-red-500 text-white" : "border-transparent text-white/70"
                }`}
                onClick={() => setActiveTab("beneficiary")}
              >
                Beneficiary
              </TabsTrigger>
              <TabsTrigger
                value="frequent"
                className={`py-3 border-b-2 ${
                  activeTab === "frequent" ? "border-red-500 text-white" : "border-transparent text-white/70"
                }`}
                onClick={() => setActiveTab("frequent")}
              >
                Frequent pay
              </TabsTrigger>
            </TabsList>
            <TabsContent value="beneficiary" className="mt-4">
              <div className="text-center text-white/70 py-10">You don't have any beneficiary yet</div>
            </TabsContent>
            <TabsContent value="frequent" className="mt-4">
              <div className="text-center text-white/70 py-10">No frequent payments found</div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Provider Selection Dialog */}
      <ElectricityProviderDialog
        open={providerDialogOpen}
        onOpenChange={setProviderDialogOpen}
        providers={electricityProviders}
        onSelect={setSelectedProvider}
      />
    </div>
  )
}

