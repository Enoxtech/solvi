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
import { electricityProviders, type ElectricityProvider } from "../data/electricity-providers"
import { ElectricityProviderDialog } from "../components/electricity-provider-dialog"

export default function PayElectricity() {
  const router = useRouter()

  const [selectedProvider, setSelectedProvider] = useState<ElectricityProvider | null>(null)
  const [providerDialogOpen, setProviderDialogOpen] = useState(false)
  const [meterNumber, setMeterNumber] = useState("")
  const [amount, setAmount] = useState<number | "">("")
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
        amount={typeof amount === "number" ? amount : 0}
        meterType={meterType}
        onDone={handleDone}
        onBuyAgain={handlePayAgain}
      />
    )
  }

  return (
    <BillPaymentLayout title="Pay Electricity">
      {/* Form Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 space-y-5">
        {/* Provider Selection */}
        <FormField label="Electricity Provider">
          <SelectionButton
            selected={!!selectedProvider}
            onClick={() => setProviderDialogOpen(true)}
            placeholder="Select Electricity Provider"
            providerName={selectedProvider?.name}
            primaryText={selectedProvider?.name}
            secondaryText={selectedProvider?.shortName}
          />
        </FormField>

        {/* Meter Type */}
        <div>
          <label className="block text-white mb-2">Meter Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMeterType("prepaid")}
              className={`py-4 rounded-xl font-medium transition-colors ${
                meterType === "prepaid"
                  ? "bg-white text-primary-600"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              }`}
            >
              Prepaid
            </button>
            <button
              onClick={() => setMeterType("postpaid")}
              className={`py-4 rounded-xl font-medium transition-colors ${
                meterType === "postpaid"
                  ? "bg-white text-primary-600"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              }`}
            >
              Postpaid
            </button>
          </div>
        </div>

        {/* Meter Number */}
        <FormField label="Meter Number">
          <Input
            type="text"
            placeholder="Enter Meter Number"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
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
      <ActionButton onClick={handleContinue} disabled={!selectedProvider || !meterNumber || !amount || isProcessing}>
        {isProcessing ? "Processing..." : "Continue"}
      </ActionButton>

      {/* Tabs */}
      <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Provider Selection Dialog */}
      <ElectricityProviderDialog
        open={providerDialogOpen}
        onOpenChange={setProviderDialogOpen}
        providers={electricityProviders}
        selectedProvider={selectedProvider}
        onSelect={setSelectedProvider}
      />
    </BillPaymentLayout>
  )
}

