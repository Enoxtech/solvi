"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { useWalletStore } from "@/stores/walletStore"

interface WalletContextType {
  balance: number
  formattedBalance: string
  updateBalance: (newBalance: number) => void
  isFundWalletDialogOpen: boolean
  setIsFundWalletDialogOpen: (isOpen: boolean) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const walletStore = useWalletStore()
  const [balance, setBalance] = useState(walletStore.balance)

  // Sync with walletStore whenever it changes
  useEffect(() => {
    // Initial sync
    setBalance(walletStore.balance)

    // Subscribe to store changes
    const unsubscribe = useWalletStore.subscribe(
      (state) => state.balance,
      (newBalance) => {
        setBalance(newBalance)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [walletStore.balance])

  return (
    <WalletContext.Provider
      value={{
        balance,
        formattedBalance: walletStore.getFormattedBalance(),
        updateBalance: (newBalance: number) => {
          // This is a compatibility layer for old code
          // In new code, use the store's methods directly
          const difference = newBalance - balance
          if (difference > 0) {
            useWalletStore.getState().fundWallet(difference)
          } else if (difference < 0) {
            // Handle balance reduction if needed
            useWalletStore
              .getState()
              .deductFromWallet(Math.abs(difference), "Balance adjustment", "System", "Successful")
          }
        },
        isFundWalletDialogOpen: walletStore.isFundWalletDialogOpen,
        setIsFundWalletDialogOpen: (isOpen: boolean) => {
          if (isOpen) {
            walletStore.openFundWalletDialog()
          } else {
            walletStore.closeFundWalletDialog()
          }
        },
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

