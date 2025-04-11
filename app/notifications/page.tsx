"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Bell, CheckCircle, AlertTriangle, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useNotifications, type NotificationType } from "@/contexts/NotificationContext"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } = useNotifications()
  const [filter, setFilter] = useState<NotificationType | "all">("all")

  // Format timestamp to readable date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Get background color based on notification type
  const getNotificationBg = (type: NotificationType) => {
    switch (type) {
      case "info":
        return "bg-blue-50"
      case "success":
        return "bg-green-50"
      case "warning":
        return "bg-amber-50"
      case "urgent":
        return "bg-red-50"
      default:
        return "bg-gray-50"
    }
  }

  // Filter notifications
  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((notification) => notification.type === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-primary/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-semibold">Notifications</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllNotifications}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Filter tabs */}
        <div className="px-4 pb-2 max-w-lg mx-auto overflow-x-auto">
          <div className="bg-white/10 p-1 rounded-full flex whitespace-nowrap min-w-full">
            {["all", "info", "success", "warning", "urgent"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as NotificationType | "all")}
                className={cn(
                  "flex-1 py-2 px-2 sm:px-3 rounded-full text-xs sm:text-sm font-medium transition-all min-w-[70px]",
                  filter === type ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10",
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <main className="p-4 max-w-lg mx-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-white">
            <Bell className="h-16 w-16 opacity-20 mb-4" />
            <p className="text-xl font-medium mb-2">No notifications</p>
            <p className="text-white/80">You don't have any {filter !== "all" ? filter : ""} notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Card
                  className={cn(
                    "bg-white/95 backdrop-blur-md border-0 shadow-lg overflow-hidden transition-all",
                    !notification.read && "border-l-4",
                    !notification.read && notification.type === "info" && "border-l-blue-500",
                    !notification.read && notification.type === "success" && "border-l-green-500",
                    !notification.read && notification.type === "warning" && "border-l-amber-500",
                    !notification.read && notification.type === "urgent" && "border-l-red-500",
                  )}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          getNotificationBg(notification.type),
                        )}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <h3
                            className={cn(
                              "font-medium text-gray-900 text-sm sm:text-base",
                              !notification.read && "font-semibold",
                            )}
                          >
                            {notification.title}
                          </h3>
                          <span className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-0">
                            {formatDate(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
                          {!notification.read ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs h-8"
                            >
                              Mark as read
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-500">Read</span>
                          )}
                          {notification.link && (
                            <Link href={notification.link}>
                              <Button
                                size="sm"
                                className={cn(
                                  "text-xs h-8",
                                  notification.type === "info" && "bg-blue-500 hover:bg-blue-600",
                                  notification.type === "success" && "bg-green-500 hover:bg-green-600",
                                  notification.type === "warning" && "bg-amber-500 hover:bg-amber-600",
                                  notification.type === "urgent" && "bg-red-500 hover:bg-red-600",
                                )}
                                onClick={() => markAsRead(notification.id)}
                              >
                                View Details
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

