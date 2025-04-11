import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import dynamic from "next/dynamic"
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

const DynamicBottomNav = dynamic(() => import("@/components/BottomNav"), {
  ssr: false,
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SOLVI: Empowering Your Digital Commerce & Beyond",
  description: "A multifunctional companion app for Nigerian entrepreneurs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-primary">
        <WalletStateObserver />
        <AuthProvider>
          <CurrencyProvider>
            <WalletProvider>
              <NotificationProvider>
                <PageWrapper>
                  <main className="min-h-screen pb-20">{children}</main>
                  <div className="relative z-30">
                    <DynamicBottomNav />
                  </div>
                  <AIAssistantWidget />
                </PageWrapper>
                <FundWalletDialog />
                <TransactionNotification />
                <Toaster />
              </NotificationProvider>
            </WalletProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'