"use client"

import { Button } from "@/components/ui/button"

interface AmountButtonProps {
  amount: number
  selected: boolean
  onClick: () => void
}

export function AmountButton({ amount, selected, onClick }: AmountButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={`bg-white/10 backdrop-blur-sm border-0 text-white hover:bg-white/20 py-6 rounded-xl ${
        selected ? "ring-2 ring-white" : ""
      }`}
    >
      ₦ {amount}
    </Button>
  )
}

