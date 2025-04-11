"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import type { ElectricityProvider } from "../data/electricity-providers"
import Image from "next/image"

interface ElectricityProviderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  providers: ElectricityProvider[]
  onSelect: (provider: ElectricityProvider) => void
}

export function ElectricityProviderDialog({ open, onOpenChange, providers, onSelect }: ElectricityProviderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="p-4 border-b flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold">Select Provider</DialogTitle>
          <button onClick={() => onOpenChange(false)} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto">
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
                className="flex items-center w-full p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-3">
                  {provider.logo ? (
                    <Image
                      src={provider.logo || "/placeholder.svg?height=40&width=40"}
                      alt={provider.name}
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  ) : (
                    <div className="text-xs font-bold">{provider.shortName.substring(0, 2)}</div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium">{provider.name}</span>
                  <span className="text-gray-500 ml-2">{provider.shortName}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

