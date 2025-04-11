"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Sidebar } from "./Sidebar"
import BottomNav from "./BottomNav"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "@/contexts/AuthContext"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, isAuthPage } = useAuth()

  // Ensure the showNavigation logic is strict
  const showNavigation = isAuthenticated && !isAuthPage

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {showNavigation && <Sidebar />}
      <main className={`flex-1 overflow-y-auto ${showNavigation ? "p-6" : "p-0"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      {showNavigation && <BottomNav />}
      {showNavigation && (
        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
      )}
    </div>
  )
}

