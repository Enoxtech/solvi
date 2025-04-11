"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, LogIn, ShoppingCart, Settings, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  user: string
  action: "login" | "purchase" | "settings" | "document"
  time: string
}

export function AdminUserActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "act1",
      user: "John Doe",
      action: "login",
      time: "2 minutes ago",
    },
    {
      id: "act2",
      user: "Sarah Williams",
      action: "purchase",
      time: "15 minutes ago",
    },
    {
      id: "act3",
      user: "Michael Brown",
      action: "settings",
      time: "32 minutes ago",
    },
    {
      id: "act4",
      user: "Emily Davis",
      action: "document",
      time: "1 hour ago",
    },
  ])

  const [newActivity, setNewActivity] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any existing interval to prevent memory leaks
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      const actions: ("login" | "purchase" | "settings" | "document")[] = ["login", "purchase", "settings", "document"]
      const users = ["John Doe", "Sarah Williams", "Michael Brown", "Emily Davis", "Robert Johnson", "Jane Smith"]

      const newAct: Activity = {
        id: `act${Date.now()}`,
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: "Just now",
      }

      setActivities((prev) => [newAct, ...prev.slice(0, 3)])
      setNewActivity(true)

      const timeout = setTimeout(() => {
        setNewActivity(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }, 15000)

    // Cleanup function to clear the interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <LogIn className="h-4 w-4 text-blue-400" />
      case "purchase":
        return <ShoppingCart className="h-4 w-4 text-green-400" />
      case "settings":
        return <Settings className="h-4 w-4 text-yellow-400" />
      case "document":
        return <FileText className="h-4 w-4 text-purple-400" />
      default:
        return <User className="h-4 w-4 text-gray-400" />
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case "login":
        return "logged in"
      case "purchase":
        return "made a purchase"
      case "settings":
        return "updated settings"
      case "document":
        return "viewed a document"
      default:
        return "performed an action"
    }
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={index === 0 && newActivity ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex items-start gap-3 p-3 rounded-lg", index === 0 && newActivity ? "bg-white/10" : "")}
          >
            <div className="bg-white/10 p-2 rounded-full">{getActionIcon(activity.action)}</div>
            <div>
              <p className="text-white text-sm">
                <span className="font-medium">{activity.user}</span> {getActionText(activity.action)}
              </p>
              <p className="text-white/60 text-xs">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

