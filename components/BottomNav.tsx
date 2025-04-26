"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, Grid, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { motion } from "framer-motion"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FileText, label: "Bills", href: "/bill-payments" },
  { icon: Grid, label: "Products", href: "/products" },
  { icon: User, label: "Profile", href: "/profile" },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, isAuthPage } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isAuthenticated || isAuthPage) return null
  if (!mounted) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-end pointer-events-none">
      <div
        className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg flex items-center h-16 w-full pointer-events-auto relative"
        style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem', zIndex: 1 }}
      >
        {/* Home */}
        <NavItem item={navItems[0]} pathname={pathname} />
        {/* Bills */}
        <NavItem item={navItems[1]} pathname={pathname} />
        {/* Floating Button as a flex item */}
        <div className="flex-1 flex justify-center relative z-20">
          <motion.div
            className="absolute -top-14"
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            style={{ pointerEvents: "auto" }}
          >
            <Link
              href="/currency-exchange"
              className="bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl shadow-blue-400/60 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-4 border-white hover:scale-110 transition-transform duration-200 ring-2 ring-blue-400/30 sm:ring-4"
            >
              <span className="text-white text-3xl sm:text-4xl font-bold drop-shadow-lg">¥</span>
            </Link>
          </motion.div>
        </div>
        {/* Products */}
        <NavItem item={navItems[2]} pathname={pathname} />
        {/* Profile */}
        <NavItem item={navItems[3]} pathname={pathname} />
      </div>
    </nav>
  )
}

function NavItem({ item, pathname }: { item: typeof navItems[0], pathname: string }) {
  const Icon = item.icon
  const isActive = pathname === item.href
  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center justify-center flex-1 ${isActive ? "text-white" : "text-white/70"} transition-colors duration-300`}
      style={{ zIndex: 2 }}
    >
      <Icon className={`w-6 h-6 mb-1 sm:w-7 sm:h-7 ${isActive ? "text-white" : "text-white/70"}`} />
      <span className={`text-xs sm:text-sm ${isActive ? "font-semibold text-white" : "text-white/70"}`}>{item.label}</span>
    </Link>
  )
}

