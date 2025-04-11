"use client"

import { useEffect } from "react"
import { useWalletStore } from "@/stores/walletStore"

export function WalletStateObserver() {
  useEffect(() => {
    // This component ensures the wallet state is properly initialized
    // and synchronized across the application

    // Check if we need to initialize the wallet from localStorage
    const storedWalletData = localStorage.getItem("velocia-wallet-storage")
    if (storedWalletData) {
      try {
        const parsedData = JSON.parse(storedWalletData)
        if (parsedData.state && typeof parsedData.state.balance === "number") {
          // Ensure the store has the correct balance
          const currentBalance = useWalletStore.getState().balance
          if (currentBalance !== parsedData.state.balance) {
            useWalletStore.getState().setBalance(parsedData.state.balance)
          }
        }
      } catch (error) {
        console.error("Error parsing wallet data from localStorage:", error)
      }
    }

    // Subscribe to store changes to update localStorage
    const unsubscribe = useWalletStore.subscribe(
      (state) => state.balance,
      (balance) => {
        // Ensure localStorage is updated with the latest balance
        const storedData = localStorage.getItem("velocia-wallet-storage")
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData)
            if (parsedData.state) {
              parsedData.state.balance = balance
              localStorage.setItem("velocia-wallet-storage", JSON.stringify(parsedData))
            }
          } catch (error) {
            console.error("Error updating wallet data in localStorage:", error)
          }
        }
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])

  // This is a utility component that doesn't render anything
  return null
}

