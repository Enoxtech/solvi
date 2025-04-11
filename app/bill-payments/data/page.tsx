"use client"

import { useState, useEffect } from "react"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { providers, type Provider, type DataPlan } from "../data/providers"
import { ProviderSelectionDialog } from "../components/provider-selection-dialog"
import { DataPlanDialog } from "../components/data-plan-dialog"
import { BillPaymentLayout } from "../components/bill-payment-layout"
import { FormField } from "../components/form-field"
import { SelectionButton } from "../components/selection-button"
import { ActionButton } from "../components/action-button"
import { PaymentTabs } from "../components/payment-tabs"
import { SuccessPage } from "../components/success-page"

export default function BuyData() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [providerDialogOpen, setProviderDialogOpen] = useState(false)
  const [dataPlanDialogOpen, setDataPlanDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("beneficiary")

  // Filter providers to only show data providers
  const dataProviders = providers.filter((provider) => provider.type === "airtime") // Using airtime providers for demo

  // Set default provider
  useEffect(() => {
    if (dataProviders.length > 0 && !selectedProvider) {
      setSelectedProvider(dataProviders[0])
    }
  }, [dataProviders, selectedProvider])

  const handleContinue = () => {
    if (!phoneNumber || !selectedProvider || !selectedPlan) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleBuyAgain = () => {
    setPhoneNumber("")
    setSelectedPlan(null)
    setIsSuccess(false)
  }

  const handleDone = () => {
    router.push("/dashboard")
  }

  if (isSuccess && selectedProvider && selectedPlan) {
    return (
      <SuccessPage
        type="data"
        providerName={selectedProvider.name}
        phoneNumber={phoneNumber}
        amount={selectedPlan.amount}
        planName={selectedPlan.name}
        onDone={handleDone}
        onBuyAgain={handleBuyAgain}
      />
    )
  }

  return (
    <BillPaymentLayout title="Buy Data">
      {/* Form Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 space-y-5">
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

        {/* Data Plan */}
        <FormField label="Data Plan">
          <SelectionButton
            selected={!!selectedPlan}
            onClick={() => selectedProvider?.plans && setDataPlanDialogOpen(true)}
            placeholder="Select Data Plan"
            primaryText={selectedPlan?.name}
            secondaryText={
              selectedPlan ? `₦${selectedPlan.amount.toLocaleString()} - ${selectedPlan.validity}` : undefined
            }
          />
        </FormField>

        {/* Save as Beneficiary */}
        <div className="flex items-center justify-between">
          <label htmlFor="saveBeneficiary" className="text-white">
            Save as Beneficiary
          </label>
          <Switch id="saveBeneficiary" checked={saveAsBeneficiary} onCheckedChange={setSaveAsBeneficiary} />
        </div>
      </div>

      {/* Continue Button */}
      <ActionButton
        onClick={handleContinue}
        disabled={!phoneNumber || !selectedProvider || !selectedPlan || isProcessing}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </ActionButton>

      {/* Tabs */}
      <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Provider Selection Dialog */}
      <ProviderSelectionDialog
        open={providerDialogOpen}
        onOpenChange={setProviderDialogOpen}
        providers={dataProviders}
        selectedProvider={selectedProvider}
        onSelect={setSelectedProvider}
      />

      {/* Data Plan Dialog */}
      {selectedProvider && selectedProvider.plans && (
        <DataPlanDialog
          open={dataPlanDialogOpen}
          onOpenChange={setDataPlanDialogOpen}
          plans={selectedProvider.plans}
          selectedPlan={selectedPlan}
          onSelect={setSelectedPlan}
        />
      )}
    </BillPaymentLayout>
  )
}

