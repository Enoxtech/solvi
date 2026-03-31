"use client"

import type React from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { WalletProvider } from "@/contexts/WalletContext"
import { CurrencyProvider } from "@/contexts/CurrencyContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { PageWrapper } from "@/components/PageWrapper"
import { FundWalletDialog } from "@/components/FundWalletDialog"
import { GlobalWidgets } from "@/components/GlobalWidgets"
import { WalletStateObserver } from "@/components/WalletStateObserver"
import { BottomNavWrapper } from "@/components/BottomNavWrapper"
import { FocusVisiblePolyfill } from "@/components/FocusVisiblePolyfill"
import { Toaster } from "@/components/ui/sonner"
import { TransactionNotification } from "@/components/TransactionNotification"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WalletProvider>
        <CurrencyProvider>
          <NotificationProvider>
            <PageWrapper>
              {children}
              <FundWalletDialog />
              <GlobalWidgets />
              <WalletStateObserver />
              <BottomNavWrapper />
              <FocusVisiblePolyfill />
            </PageWrapper>
            <Toaster />
          </NotificationProvider>
        </CurrencyProvider>
      </WalletProvider>
    </AuthProvider>
  )
}
