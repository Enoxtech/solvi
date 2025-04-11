"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, DollarSign, FileText, Grid, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: DollarSign, label: "Exchange", href: "/currency-exchange" },
  { icon: FileText, label: "Bills", href: "/bill-payments" },
  { icon: Grid, label: "Products", href: "/products" },
  { icon: User, label: "Profile", href: "/profile" },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { isAuthenticated, isAuthPage } = useAuth()

  // Don't render navigation on auth pages or when not authenticated
  if (!isAuthenticated || isAuthPage) {
    return null
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-md border-t border-white/10 px-2 pb-2 pt-1 z-50 shadow-nebula-lg">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${isActive ? "active" : ""} flex flex-col items-center`}
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "text-accent" : "text-white/70"} transition-colors duration-300`}
              />
              <span
                className={`text-xs mt-1 ${isActive ? "text-white font-medium" : "text-white/70"} transition-colors duration-300`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

