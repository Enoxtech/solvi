"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { DataPlan } from "../data/providers"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { formatCurrency } from "@/utils/formatCurrency"

interface DataPlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plans: DataPlan[]
  selectedPlan: DataPlan | null
  onSelect: (plan: DataPlan) => void
}

export function DataPlanDialog({ open, onOpenChange, plans, selectedPlan, onSelect }: DataPlanDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-xl font-semibold">Select Data Plan</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b last:border-b-0"
            >
              <button
                onClick={() => {
                  onSelect(plan)
                  onOpenChange(false)
                }}
                className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium">{plan.name}</span>
                  <span className="text-sm text-gray-500">{plan.validity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-primary-600">{formatCurrency(plan.amount)}</span>
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                    {selectedPlan?.id === plan.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

