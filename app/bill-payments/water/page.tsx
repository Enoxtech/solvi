"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { BillPaymentLayout } from "../components/bill-payment-layout"
import { FormField } from "../components/form-field"
import { SelectionButton } from "../components/selection-button"
import { ActionButton } from "../components/action-button"
import { PaymentTabs } from "../components/payment-tabs"
import { SuccessPage } from "../components/success-page"

// Mock water providers
const waterProviders = [
  { id: "lwrc", name: "Lagos Water Corporation", shortName: "LWC" },
  { id: "kwrc", name: "Kaduna Water Corporation", shortName: "KWC" },
  { id: "rswb", name: "Rivers State Water Board", shortName: "RSWB" },
]

export default function PayWater() {
  const router = useRouter()

  const [selectedProvider, setSelectedProvider] = useState<any | null>(null)
  const [providerDialogOpen, setProviderDialogOpen] = useState(false)
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState<number | "">("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("beneficiary")

  const quickAmounts = [1000, 2000, 5000, 10000]

  const handleContinue = () => {
    if (!selectedProvider || !accountNumber || !amount) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handlePayAgain = () => {
    setAccountNumber("")
    setAmount("")
    setIsSuccess(false)
  }

  const handleDone = () => {
    router.push("/dashboard")
  }

  if (isSuccess && selectedProvider) {
    return (
      <SuccessPage
        type="tv" // Reusing TV type for now
        providerName={selectedProvider.name}
        cardNumber={accountNumber}
        amount={typeof amount === "number" ? amount : 0}
        planName="Water Bill"
        onDone={handleDone}
        onBuyAgain={handlePayAgain}
      />
    )
  }

  return (
    <BillPaymentLayout title="Pay Water Bill">
      {/* Form Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 space-y-5">
        {/* Provider Selection */}
        <FormField label="Water Provider">
          <SelectionButton
            selected={!!selectedProvider}
            onClick={() => setProviderDialogOpen(true)}
            placeholder="Select Water Provider"
            primaryText={selectedProvider?.name}
            secondaryText={selectedProvider?.shortName}
          />
        </FormField>

        {/* Account Number */}
        <FormField label="Account Number">
          <Input
            type="text"
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/50 py-6 rounded-xl"
          />
        </FormField>

        {/* Amount */}
        <FormField label="Amount">
          <div className="relative">
            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/50 pl-10 py-6 rounded-xl"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white font-bold">₦</div>
          </div>
        </FormField>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className={`py-3 rounded-xl font-medium transition-colors ${
                amount === quickAmount
                  ? "bg-white text-primary-600"
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
      </div>

      {/* Continue Button */}
      <ActionButton onClick={handleContinue} disabled={!selectedProvider || !accountNumber || !amount || isProcessing}>
        {isProcessing ? "Processing..." : "Continue"}
      </ActionButton>

      {/* Tabs */}
      <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </BillPaymentLayout>
  )
}

