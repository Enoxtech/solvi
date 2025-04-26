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
import { useAuth } from "@/contexts/AuthContext"
import { GlobalWidgets } from "@/components/GlobalWidgets"

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
  // Make this a client component
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (typeof window !== "undefined") {
    require("./globals.css")
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthPage } = typeof window !== "undefined" ? require("@/contexts/AuthContext").useAuth() : { isAuthPage: false }

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
      </body>
    </html>
  )
}



import './globals.css'