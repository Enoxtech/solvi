"use client"

import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface ActionButtonProps {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}

export function ActionButton({ onClick, disabled, children }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-white hover:bg-gray-100 text-primary font-semibold py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:transform-none"
    >
      {children}
    </Button>
  )
}

