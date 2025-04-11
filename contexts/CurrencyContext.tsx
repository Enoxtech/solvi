"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useWalletStore, type Currency } from "@/stores/walletStore"
import { currencySymbols } from "@/utils/currencyUtils"

interface CurrencyContextType {
  currency: Currency
  currencySymbol: string
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const walletStore = useWalletStore()
  const [currency, setCurrencyState] = useState<Currency>(walletStore.currency || "NGN")

  // Sync with wallet store
  useEffect(() => {
    if (walletStore.currency && walletStore.currency !== currency) {
      setCurrencyState(walletStore.currency)
    }
  }, [walletStore.currency, currency])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    // Check if the wallet store has a setCurrency method
    if (typeof walletStore.setCurrency === "function") {
      walletStore.setCurrency(newCurrency)
    } else {
      console.warn("setCurrency is not available in walletStore")
      // Fallback: Update localStorage directly if needed
      try {
        const walletData = JSON.parse(localStorage.getItem("wallet-data") || "{}")
        walletData.currency = newCurrency
        localStorage.setItem("wallet-data", JSON.stringify(walletData))
      } catch (error) {
        console.error("Failed to update currency in localStorage", error)
      }
    }
  }

  const currencySymbol = currencySymbols[currency]

  return (
    <CurrencyContext.Provider value={{ currency, currencySymbol, setCurrency }}>{children}</CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

