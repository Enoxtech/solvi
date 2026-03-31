import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: "SOLVI: Buy RMB with Ease",
  description: "Buy and sell RMB with instant Naira transfers. The fastest way for Nigerian entrepreneurs to move money between China and Nigeria.",
  generator: 'v0.dev',
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SOLVI",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "SOLVI - Naira ↔ RMB Exchange",
    description: "Buy and sell RMB with instant Naira transfers",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A0E17",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SOLVI" />
      </head>
      <body className="min-h-screen bg-[#0A0E17] text-white font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
