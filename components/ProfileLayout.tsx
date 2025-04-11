"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface ProfileLayoutProps {
  children: React.ReactNode
  title: string
  backLink: string
}

export function ProfileLayout({ children, title, backLink }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      <header className="sticky top-0 z-20 bg-primary/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
          <Link href={backLink} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6 text-gray-100" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-100">{title}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-none sm:rounded-2xl shadow-lg overflow-hidden my-0 sm:my-4 text-gray-900">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

