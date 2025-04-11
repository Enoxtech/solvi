"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useNotifications, type NotificationType } from "@/contexts/NotificationContext"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function NotificationIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  // Format timestamp to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
      case "urgent":
        return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
      default:
        return <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
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

  return (
    <div className="relative">
      {/* Bell icon with notification count */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleOpen}
        className="relative text-white hover:text-white/80 hover:bg-white/10"
      >
        <Bell className="h-6 w-6 sm:h-7 sm:w-7" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Notification panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200,
              duration: 0.5,
            }}
            style={{
              position: "fixed",
              zIndex: 100000,
              top: "3.5rem",
              left: "0.5rem",
              width: "calc(100vw - 1rem)",
              maxWidth: "300px",
            }}
            className="sm:absolute sm:right-0 sm:top-full sm:left-auto sm:mt-2"
          >
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="p-2 bg-gradient-to-r from-primary/95 to-blue-600/95 text-white flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium">Notifications</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="h-6 text-[10px] text-white/80 hover:text-white hover:bg-white/10 px-2"
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </Button>
              </CardHeader>
              <CardContent className="p-0 max-h-[50vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-gray-500">
                    <Bell className="h-5 w-5 mx-auto mb-1 opacity-20" />
                    <p className="text-xs">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "p-2 relative",
                          !notification.read && "bg-gray-50",
                          notification.type === "urgent" && !notification.read && "bg-red-50",
                        )}
                      >
                        <div className="flex gap-2">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                              getNotificationBg(notification.type),
                            )}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h3
                                className={cn(
                                  "text-[10px] font-medium text-gray-900 truncate",
                                  !notification.read && "font-semibold",
                                )}
                              >
                                {notification.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                className="h-4 w-4 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 -mt-1 -mr-1"
                              >
                                <X className="h-2.5 w-2.5" />
                              </Button>
                            </div>
                            <p className="text-[9px] text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-[8px] text-gray-500">
                                {formatRelativeTime(notification.timestamp)}
                              </span>
                              {notification.link && (
                                <Link href={notification.link}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 text-[9px] text-primary hover:text-primary/90 hover:bg-primary/10 px-1.5"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    View
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full m-1.5" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-2 border-t bg-gray-50/50">
                <Link href="/notifications" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full text-xs bg-white hover:bg-gray-50 h-7"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Notifications
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

