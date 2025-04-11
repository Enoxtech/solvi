"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProviderLogo } from "@/components/provider-logo"
import { useRouter } from "next/navigation"

interface Provider {
  id: string
  name: string
}

interface ProviderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "data" | "airtime" | "tv" | "utility" | "betting" | "examination"
  onSelect: (provider: Provider) => void
}

export function ProviderDialog({ open, onOpenChange, type, onSelect }: ProviderDialogProps) {
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const providers = {
    data: [
      { id: "9mobile", name: "9MOBILE" },
      { id: "airtel", name: "Airtel" },
      { id: "glo", name: "GLO" },
      { id: "mtn", name: "MTN" },
    ],
    airtime: [
      { id: "9mobile", name: "9MOBILE" },
      { id: "airtel", name: "Airtel" },
      { id: "glo", name: "GLO" },
      { id: "mtn", name: "MTN" },
    ],
    tv: [
      { id: "dstv", name: "DSTV" },
      { id: "gotv", name: "GOtv" },
      { id: "startimes", name: "StarTimes" },
      { id: "showmax", name: "Showmax" },
    ],
    utility: [
      { id: "aedc", name: "Abuja Electricity" },
      { id: "bedc", name: "Benin Electricity" },
      { id: "ekedc", name: "Eko Electricity" },
      { id: "eedc", name: "Enugu Electricity" },
      { id: "ibedc", name: "Ibadan Electricity" },
      { id: "ikedc", name: "Ikeja Electricity" },
      { id: "jed", name: "Jos Electricity" },
      { id: "kaedco", name: "Kaduna Electricity" },
      { id: "kedco", name: "Kano Electricity" },
      { id: "phed", name: "Port Harcourt Electricity" },
    ],
    betting: [
      { id: "bet9ja", name: "Bet9ja" },
      { id: "nairabet", name: "Nairabet" },
      { id: "sportybet", name: "SportyBet" },
      { id: "betking", name: "BetKing" },
    ],
    examination: [
      { id: "waec", name: "WAEC" },
      { id: "neco", name: "NECO" },
      { id: "nabteb", name: "NABTEB" },
      { id: "jamb", name: "JAMB" },
    ],
  }

  const handleSelect = (provider: Provider) => {
    setSelectedProvider(provider.id)
    onSelect(provider)
    onOpenChange(false)

    // Navigate to the appropriate page
    if (type === "data") {
      router.push("/bill-payments/data")
    } else if (type === "airtime") {
      router.push("/bill-payments/airtime")
    } else if (type === "tv") {
      router.push("/bill-payments/tv")
    } else if (type === "utility") {
      router.push("/bill-payments/utility/electricity")
    } else if (type === "betting") {
      router.push("/bill-payments/betting")
    } else if (type === "examination") {
      router.push("/bill-payments/examination")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold">Select Provider</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {providers[type].map((provider) => (
            <div key={provider.id} className="border-b last:border-b-0">
              <button
                onClick={() => handleSelect(provider)}
                className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ProviderLogo name={provider.name} size={40} />
                  <span className="font-medium">
                    {provider.name} {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                  {selectedProvider === provider.id && <div className="w-4 h-4 rounded-full bg-primary"></div>}
                </div>
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

