"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getWalletState } from "@/utils/walletProvider"

const WalletContext = createContext<{ connected: boolean } | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    async function initWallet() {
      console.log("Initializing wallet...")
      try {
        const state = await getWalletState()
        console.log("Wallet state:", state)
        setConnected(state !== null)
      } catch (error) {
        console.error("Error initializing wallet:", error)
        setConnected(false)
      }
    }
    initWallet()
  }, [])

  console.log("WalletProvider render, connected:", connected)

  return <WalletContext.Provider value={{ connected }}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === null) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

