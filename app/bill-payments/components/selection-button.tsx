"use client"

import { ChevronDown } from "lucide-react"
import { ProviderLogo } from "@/components/provider-logo"

interface SelectionButtonProps {
  selected: boolean
  onClick: () => void
  placeholder: string
  providerName?: string
  primaryText?: string
  secondaryText?: string
}

export function SelectionButton({
  selected,
  onClick,
  placeholder,
  providerName,
  primaryText,
  secondaryText,
}: SelectionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center justify-between text-white"
    >
      {selected ? (
        <div className="flex items-center gap-3">
          {providerName && <ProviderLogo name={providerName} size={32} />}
          <div className="flex flex-col items-start">
            <span>{primaryText}</span>
            {secondaryText && <span className="text-sm text-white/70">{secondaryText}</span>}
          </div>
        </div>
      ) : (
        <span className="text-white/50">{placeholder}</span>
      )}
      <ChevronDown className="h-5 w-5 text-white/50" />
    </button>
  )
}

