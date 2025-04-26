"use client"

import { motion } from "framer-motion"
import { Grid, LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import React from "react"

type QuickAction = {
  title: string
  href: string
  icon: React.FC | LucideIcon
  color: string
}

export function QuickActions() {
  const quickActions: QuickAction[] = [
    {
      title: "Airtime Top-up",
      href: "/bill-payments/airtime",
      icon: () => <span className="text-white text-sm font-bold">A</span>,
      color: "from-accent-500 to-accent-700",
    },
    {
      title: "Buy Data",
      href: "/bill-payments/data",
      icon: () => <span className="text-white text-sm font-bold">D</span>,
      color: "from-primary-600 to-primary-800",
    },
    {
      title: "Betting",
      href: "/bill-payments/betting",
      icon: () => <span className="text-white text-sm font-bold">B</span>,
      color: "from-secondary-500 to-secondary-700",
    },
  ]

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-responsive-xl font-bold text-white">Quick Actions</h2>
        <Link href="/products" className="text-responsive-sm text-blue-300 hover:text-blue-100">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -1, 1, -1, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={action.href}>
              <Card
                className={cn(
                  `bg-gradient-to-br ${action.color} text-white border-none shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30 transition-all`,
                  "overflow-hidden relative h-24 group",
                )}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
                <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full relative z-10">
                  {typeof action.icon === "function" ? (
                    <motion.div
                      className="mb-1 h-5 w-5 flex items-center justify-center"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <action.icon />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      {React.createElement(action.icon, { className: "h-5 w-5 mb-1" })}
                    </motion.div>
                  )}
                  <h3 className="font-extrabold text-sm">{action.title}</h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  )
}

