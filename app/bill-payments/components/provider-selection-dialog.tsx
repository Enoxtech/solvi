"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProviderLogo } from "@/components/provider-logo"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface Provider {
  id: string
  name: string
  type: string
}

interface ProviderSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  providers: Provider[]
  selectedProvider: Provider | null
  onSelect: (provider: Provider) => void
  title?: string
}

export function ProviderSelectionDialog({
  open,
  onOpenChange,
  providers,
  selectedProvider,
  onSelect,
  title = "Select Provider",
}: ProviderSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {providers.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b last:border-b-0"
            >
              <button
                onClick={() => {
                  onSelect(provider)
                  onOpenChange(false)
                }}
                className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                    <ProviderLogo name={provider.name} size={40} />
                  </div>
                  <span className="font-medium">{provider.name}</span>
                </div>
                <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                  {selectedProvider?.id === provider.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

