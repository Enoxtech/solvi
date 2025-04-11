"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { CablePackage } from "../data/cable-providers"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"

interface PackageSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  packages: CablePackage[]
  selectedPackage: CablePackage | null
  onSelect: (pkg: CablePackage) => void
  title?: string
}

export function PackageSelectionDialog({
  open,
  onOpenChange,
  packages,
  selectedPackage,
  onSelect,
  title = "Select Package",
}: PackageSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b last:border-b-0"
            >
              <button
                onClick={() => {
                  onSelect(pkg)
                  onOpenChange(false)
                }}
                className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-start gap-1 text-left">
                  <span className="font-medium">{pkg.name}</span>
                  <span className="text-sm text-gray-500">{pkg.description}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary-600">{formatCurrency(pkg.price)}</span>
                    <span className="text-xs text-gray-500">/ {pkg.duration}</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                  {selectedPackage?.id === pkg.id && (
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

