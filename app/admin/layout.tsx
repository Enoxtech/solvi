"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Ensure components are only rendered client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on server-side to prevent hydration issues
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-purple-950">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <AdminHeader />
        <main className="p-6">{children}</main>
        <Toaster />
      </div>
    </div>
  )
}

