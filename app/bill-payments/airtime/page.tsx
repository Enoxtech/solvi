"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { providers, quickAmounts, type Provider } from "../data/providers"
import { ProviderSelectionDialog } from "../components/provider-selection-dialog"
import { BillPaymentLayout } from "../components/bill-payment-layout"
import { FormField } from "../components/form-field"
import { SelectionButton } from "../components/selection-button"
import { ActionButton } from "../components/action-button"
import { PaymentTabs } from "../components/payment-tabs"
import { AmountButton } from "../components/amount-button"
import { SuccessPage } from "../components/success-page"

export default function BuyAirtime() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState<number | "">("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [providerDialogOpen, setProviderDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("beneficiary")

  // Filter providers to only show airtime providers
  const airtimeProviders = providers.filter((provider) => provider.type === "airtime")

  // Set default provider
  useEffect(() => {
    if (airtimeProviders.length > 0 && !selectedProvider) {
      setSelectedProvider(airtimeProviders[0])
    }
  }, [airtimeProviders, selectedProvider])

  const handleContinue = () => {
    if (!phoneNumber || !amount || !selectedProvider) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleBuyAgain = () => {
    setPhoneNumber("")
    setAmount("")
    setIsSuccess(false)
  }

  const handleDone = () => {
    router.push("/dashboard")
  }

  if (isSuccess && selectedProvider) {
    return (
      <SuccessPage
        type="airtime"
        providerName={selectedProvider.name}
        phoneNumber={phoneNumber}
        amount={typeof amount === "number" ? amount : 0}
        onDone={handleDone}
        onBuyAgain={handleBuyAgain}
      />
    )
  }

  return (
    <BillPaymentLayout title="Buy Airtime">
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 space-y-5"
      >
        {/* Phone Number */}
        <FormField label="Phone Number">
          <div className="relative">
            <Input
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/50 pr-12 py-6 rounded-xl"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 rounded-full p-2">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </FormField>

        {/* Network Provider */}
        <FormField label="Network Provider">
          <SelectionButton
            selected={!!selectedProvider}
            onClick={() => setProviderDialogOpen(true)}
            placeholder="Select Provider"
            providerName={selectedProvider?.name}
            primaryText={selectedProvider?.name}
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
          {quickAmounts.slice(0, 4).map((quickAmount) => (
            <AmountButton
              key={quickAmount}
              amount={quickAmount}
              selected={amount === quickAmount}
              onClick={() => setAmount(quickAmount)}
            />
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
      <ActionButton onClick={handleContinue} disabled={!phoneNumber || !amount || isProcessing}>
        {isProcessing ? "Processing..." : "Continue"}
      </ActionButton>

      {/* Tabs */}
      <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Provider Selection Dialog */}
      <ProviderSelectionDialog
        open={providerDialogOpen}
        onOpenChange={setProviderDialogOpen}
        providers={airtimeProviders}
        selectedProvider={selectedProvider}
        onSelect={setSelectedProvider}
      />
    </BillPaymentLayout>
  )
}

