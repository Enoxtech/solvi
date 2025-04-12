import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FundWalletDialog } from "@/components/FundWalletDialog"
import { PageWrapper } from "@/components/PageWrapper"
import { WalletProvider } from "@/contexts/WalletContext"
import { CurrencyProvider } from "@/contexts/CurrencyContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { AIAssistantWidget } from "@/components/AIAssistantWidget"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { TransactionNotification } from "@/components/TransactionNotification"
import { WalletStateObserver } from "@/components/WalletStateObserver"
import { BottomNavWrapper } from "@/components/BottomNavWrapper"
import { FocusVisiblePolyfill } from "@/components/FocusVisiblePolyfill"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: "SOLVI: Buy RMB with Ease",
  description: "A multifunctional companion app for Nigerian entrepreneurs",
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <WalletProvider>
            <CurrencyProvider>
              <NotificationProvider>
                <PageWrapper>
                  {children}
                  <FundWalletDialog />
                  <AIAssistantWidget />
                  <TransactionNotification />
                  <WalletStateObserver />
                  <BottomNavWrapper />
                  <FocusVisiblePolyfill />
                </PageWrapper>
                <Toaster />
              </NotificationProvider>
            </CurrencyProvider>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'