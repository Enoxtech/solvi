"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Users, CreditCard, BarChart2, Settings, Shield, Database, Server, MessageSquare, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminQuickActionsProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminQuickActions({ isOpen, onClose }: AdminQuickActionsProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside of the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  const actions = [
    { icon: Users, label: "Manage Users", href: "/admin/users" },
    { icon: CreditCard, label: "View Transactions", href: "/admin/transactions" },
    { icon: Database, label: "API Keys", href: "/admin/api" },
    { icon: Server, label: "System Health", href: "/admin/system" },
    { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
    { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Shield, label: "Security", href: "/admin/security" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary-900/95 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {actions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
                    onClick={() => onClose()}
                  >
                    <action.icon className="h-6 w-6 mb-2" />
                    <span className="text-sm text-center">{action.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

