"use client"

import { useEffect } from "react"
import { useAdmin } from "@/contexts/AdminContext"
import { useRouter } from "next/navigation"

export function AdminShortcut() {
  const { isAdmin, toggleAdminAccess } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    // Secret keyboard shortcut: Ctrl+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        if (!isAdmin) {
          toggleAdminAccess()
        } else {
          router.push("/admin")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isAdmin, toggleAdminAccess, router])

  return null // This component doesn't render anything
}

