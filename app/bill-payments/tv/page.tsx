"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { cableProviders, type CableProvider, type CablePackage } from "../data/cable-providers"
import { PackageSelectionDialog } from "../components/package-selection-dialog"
import { ProviderSelectionDialog } from "../components/provider-selection-dialog"
import { BillPaymentLayout } from "../components/bill-payment-layout"
import { FormField } from "../components/form-field"
import { SelectionButton } from "../components/selection-button"
import { ActionButton } from "../components/action-button"
import { PaymentTabs } from "../components/payment-tabs"
import { SuccessPage } from "../components/success-page"

export default function CableTV() {
  const router = useRouter()

  const [selectedProvider, setSelectedProvider] = useState<CableProvider | null>(null)
  const [providerDialogOpen, setProviderDialogOpen] = useState(false)
  const [packageDialogOpen, setPackageDialogOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<CablePackage | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("beneficiary")

  const handleContinue = () => {
    if (!selectedProvider || !cardNumber || !selectedPackage) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleDone = () => {
    router.push("/dashboard")
  }

  const handleBuyAgain = () => {
    setCardNumber("")
    setSelectedPackage(null)
    setIsSuccess(false)
  }

  if (isSuccess && selectedProvider && selectedPackage) {
    return (
      <SuccessPage
        type="tv"
        providerName={selectedProvider.name}
        cardNumber={cardNumber}
        amount={selectedPackage.price}
        planName={selectedPackage.name}
        onDone={handleDone}
        onBuyAgain={handleBuyAgain}
      />
    )
  }

  return (
    <BillPaymentLayout title="Pay CableTV">
      {/* Form Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5 space-y-5">
        {/* Provider Selection */}
        <FormField label="Cable TV Provider">
          <SelectionButton
            selected={!!selectedProvider}
            onClick={() => setProviderDialogOpen(true)}
            placeholder="Select Cable TV Provider"
            providerName={selectedProvider?.name}
            primaryText={selectedProvider?.name}
          />
        </FormField>

        {/* Card/IUC Number */}
        {selectedProvider && (
          <FormField label={selectedProvider.idLabel}>
            <div className="relative">
              <Input
                type="text"
                placeholder={`Enter ${selectedProvider.idLabel}`}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/50 pr-12 py-6 rounded-xl"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 rounded-full p-2">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </FormField>
        )}

        {/* Package Selection */}
        {selectedProvider && (
          <FormField label="Payment Package">
            <SelectionButton
              selected={!!selectedPackage}
              onClick={() => setPackageDialogOpen(true)}
              placeholder="Select your package"
              primaryText={selectedPackage?.name}
              secondaryText={
                selectedPackage ? `₦${selectedPackage.price.toLocaleString()} / ${selectedPackage.duration}` : undefined
              }
            />
          </FormField>
        )}

        {/* Save as Beneficiary */}
        {selectedProvider && (
          <div className="flex items-center justify-between">
            <label htmlFor="save-beneficiary" className="text-white">
              Save as Beneficiary
            </label>
            <Switch id="save-beneficiary" checked={saveAsBeneficiary} onCheckedChange={setSaveAsBeneficiary} />
          </div>
        )}
      </div>

      {/* Continue Button */}
      <ActionButton
        onClick={handleContinue}
        disabled={!selectedProvider || !cardNumber || !selectedPackage || isProcessing}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </ActionButton>

      {/* Tabs */}
      <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Provider Selection Dialog */}
      <ProviderSelectionDialog
        open={providerDialogOpen}
        onOpenChange={setProviderDialogOpen}
        providers={cableProviders.map((p) => ({ id: p.id, name: p.name, type: "tv" }))}
        selectedProvider={
          selectedProvider ? { id: selectedProvider.id, name: selectedProvider.name, type: "tv" } : null
        }
        onSelect={(provider) => {
          const selected = cableProviders.find((p) => p.id === provider.id)
          if (selected) {
            setSelectedProvider(selected)
            setSelectedPackage(null)
          }
        }}
        title="Select Cable TV Provider"
      />

      {/* Package Selection Dialog */}
      {selectedProvider && (
        <PackageSelectionDialog
          open={packageDialogOpen}
          onOpenChange={setPackageDialogOpen}
          packages={selectedProvider.packages}
          selectedPackage={selectedPackage}
          onSelect={setSelectedPackage}
          title={`Select ${selectedProvider.name} Package`}
        />
      )}
    </BillPaymentLayout>
  )
}

