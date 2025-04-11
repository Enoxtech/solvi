"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProviderLogo } from "@/components/provider-logo"
import { useRouter } from "next/navigation"

interface ProviderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "data" | "airtime" | "tv"
  onSelect: (provider: any) => void
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
  }

  const handleSelect = (provider: any) => {
    setSelectedProvider(provider.id)
    onSelect(provider)
    onOpenChange(false)

    // Navigate to the appropriate page
    if (type === "data") {
      router.push("/bill-payments/data")
    } else if (type === "airtime") {
      router.push("/bill-payments/airtime")
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

