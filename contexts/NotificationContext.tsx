"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { X, Bell, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type NotificationType = "info" | "success" | "warning" | "urgent"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  timestamp: Date
  read: boolean
  link?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Sample initial notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Urgent: System Maintenance",
    message: "Velocia will be undergoing maintenance on June 15th from 2AM to 4AM GMT. Please plan accordingly.",
    type: "urgent",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    title: "New Exchange Rate Available",
    message: "The RMB exchange rate has been updated. Check the new rates for better conversions!",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    title: "Transaction Successful",
    message: "Your RMB purchase of ¥1,500 has been completed successfully.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
  },
  {
    id: "4",
    title: "Limited Time Offer",
    message: "Get 0.5% discount on all RMB purchases above ¥5,000 until June 20th!",
    type: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    link: "/currency-exchange",
  },
]

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [showUrgentPopup, setShowUrgentPopup] = useState(false)
  const [currentUrgentNotification, setCurrentUrgentNotification] = useState<Notification | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Check for urgent notifications on mount and when notifications change
  useEffect(() => {
    const urgentNotifications = notifications.filter((n) => n.type === "urgent" && !n.read)
    if (urgentNotifications.length > 0 && !showUrgentPopup) {
      setCurrentUrgentNotification(urgentNotifications[0])
      setShowUrgentPopup(true)
    }
  }, [notifications, showUrgentPopup])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    // If this was the urgent notification being shown, hide the popup
    if (currentUrgentNotification?.id === id) {
      setShowUrgentPopup(false)
      setCurrentUrgentNotification(null)
    }
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setShowUrgentPopup(false)
    setCurrentUrgentNotification(null)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))

    // If this was the urgent notification being shown, hide the popup
    if (currentUrgentNotification?.id === id) {
      setShowUrgentPopup(false)
      setCurrentUrgentNotification(null)
    }
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setShowUrgentPopup(false)
    setCurrentUrgentNotification(null)
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50 || info.offset.y < -30) {
      setShowUrgentPopup(false)
      if (currentUrgentNotification) {
        markAsRead(currentUrgentNotification.id)
      }
    }
  }

  // Get background gradient based on notification type
  const getBackgroundGradient = (type: NotificationType) => {
    switch (type) {
      case "info":
        return "from-primary/90 to-blue-600/90"
      case "success":
        return "from-green-500/90 to-green-600/90"
      case "warning":
        return "from-amber-500/90 to-amber-600/90"
      case "urgent":
        return "from-red-500/90 to-red-600/90"
      default:
        return "from-primary/90 to-blue-600/90"
    }
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-white" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-white" />
      case "warning":
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-white" />
      default:
        return <Bell className="h-5 w-5 text-white" />
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}

      {/* Urgent Notification Popup */}
      <AnimatePresence>
        {showUrgentPopup && currentUrgentNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-2 left-0 right-0 mx-auto z-[9999] w-[calc(100%-16px)] max-w-[320px]"
            style={{ maxHeight: "30vh", overflow: "auto" }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDrag}
          >
            <Card
              className={cn(
                "backdrop-blur-md border-0 shadow-lg rounded-lg overflow-hidden",
                "bg-gradient-to-r",
                getBackgroundGradient(currentUrgentNotification.type),
              )}
            >
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 pr-2 flex-1">
                    <div className="mt-0.5 p-1 bg-white/10 rounded-full shrink-0">
                      {getNotificationIcon(currentUrgentNotification.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white text-xs sm:text-sm line-clamp-1">
                        {currentUrgentNotification.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/90 mt-0.5 line-clamp-2">
                        {currentUrgentNotification.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-[10px] px-1.5 text-white/90 hover:text-white hover:bg-white/10"
                          onClick={() => markAsRead(currentUrgentNotification.id)}
                        >
                          Dismiss
                        </Button>
                        {currentUrgentNotification.link && (
                          <Button
                            size="sm"
                            className="h-6 text-[10px] px-1.5 bg-white text-primary hover:bg-white/90"
                            onClick={() => {
                              markAsRead(currentUrgentNotification.id)
                              // In a real app, you would use router.push here
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full text-white/80 hover:text-white hover:bg-white/10 shrink-0 -mt-1 -mr-1"
                    onClick={() => markAsRead(currentUrgentNotification.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// Add an alias export for useNotification (without 's') to maintain compatibility
// This should be added at the end of the file, right after the existing useNotifications export

export const useNotification = useNotifications

