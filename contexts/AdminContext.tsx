"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AdminContextType {
  isAdmin: boolean
  toggleAdminAccess: () => void
  adminClickCount: number
  incrementAdminClickCount: () => void
  resetAdminClickCount: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check for stored admin status on mount
  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("velocia_admin_access")
    if (storedAdminStatus === "true") {
      setIsAdmin(true)
    }
  }, [])

  // Redirect non-admin users away from admin pages
  useEffect(() => {
    if (pathname?.startsWith("/admin") && !isAdmin) {
      router.push("/")
    }
  }, [pathname, isAdmin, router])

  // Watch for admin click count and auto-reset after timeout
  useEffect(() => {
    if (adminClickCount > 0) {
      const timer = setTimeout(() => {
        resetAdminClickCount()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [adminClickCount])

  // Check if admin mode should be activated
  useEffect(() => {
    if (adminClickCount >= 5 && !isAdmin) {
      toggleAdminAccess()
      toast({
        title: "Admin Mode Activated",
        description: "You can now access admin features.",
        variant: "default",
      })
    } else if (adminClickCount >= 5 && isAdmin) {
      toggleAdminAccess()
      toast({
        title: "Admin Mode Deactivated",
        description: "Admin features are now disabled.",
        variant: "default",
      })
    }
  }, [adminClickCount])

  const toggleAdminAccess = () => {
    const newStatus = !isAdmin
    setIsAdmin(newStatus)
    localStorage.setItem("velocia_admin_access", newStatus.toString())

    // If turning off admin access while on an admin page, redirect to home
    if (!newStatus && pathname?.startsWith("/admin")) {
      router.push("/")
    }
  }

  const incrementAdminClickCount = () => {
    setAdminClickCount((prev) => prev + 1)
  }

  const resetAdminClickCount = () => {
    setAdminClickCount(0)
  }

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        toggleAdminAccess,
        adminClickCount,
        incrementAdminClickCount,
        resetAdminClickCount,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

