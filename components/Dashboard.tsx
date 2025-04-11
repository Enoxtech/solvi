"use client"

import React, { useCallback } from "react"
import Image from 'next/image'

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  Truck,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Grid,
  MessageSquare,
  HelpCircle,
  Users,
  Gift,
  ArrowDownLeft,
  ArrowUpRight,
  Shield,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AccountButton } from "@/components/AccountButton"
import { WalletBalanceCard } from "@/components/WalletBalanceCard"
import { NotificationIcon } from "@/components/NotificationIcon"
import { formatCurrency } from "@/utils/formatCurrency"
import { useToast } from "@/components/ui/use-toast"
import { useWalletStore } from "@/stores/walletStore"
import { format } from "date-fns"
import { Transaction, TransactionStatus, TransactionType, Currency } from "@/stores/walletStore"
import { LucideIcon } from "lucide-react"

// Keep existing components unchanged
function TransactionCard({
  id,
  title,
  amount,
  description,
  date,
  status,
  type,
  handleAdminApproval,
  transaction,
}: {
  id: string
  title: string
  amount: string
  description: string
  date: string
  status: "Successful" | "Completed" | "Pending" | "Failed" | null
  type?: "Wallet Funding" | "Payment"
  handleAdminApproval?: (id: string, newStatus: "Completed" | "Failed") => void
  transaction?: Transaction
}) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return `${format(date, "MM/dd/yyyy, h:mm a")}`
    } catch (error) {
      return dateString
    }
  }

  const statusColors = {
    Successful: "bg-green-100 text-green-800",
    Completed: "bg-blue-100 text-blue-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-start py-3 border-b border-gray-200 last:border-b-0">
        <div className="space-y-1">
          <h3 className="font-medium text-gray-800 text-responsive-base">{title}</h3>
          <p className="text-responsive-sm text-gray-600">{description}</p>
          <p className="text-responsive-sm text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(date)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900 flex items-center gap-1 justify-end">
            {type === "Wallet Funding" ? (
              <ArrowDownLeft className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowUpRight className="h-3 w-3 text-red-500" />
            )}
            {amount}
          </p>
          {status && (
            <span
              className={cn(
                "px-2 py-1 rounded-full text-responsive-sm font-medium mt-1 inline-block",
                statusColors[status] || "bg-gray-100 text-gray-800",
              )}
            >
              {status}
            </span>
          )}
          {status === "Pending" && title.includes("RMB") && handleAdminApproval && (
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs mr-2"
                onClick={() => handleAdminApproval(id, "Completed")}
              >
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                onClick={() => handleAdminApproval(id, "Failed")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function BannerSlide({
  title,
  subtitle,
  value,
  cta = "Learn More",
  icon: Icon,
  color,
  image,
}: {
  title: string
  subtitle?: string
  value?: string
  cta?: string
  icon?: React.ElementType
  color: string
  image?: string
}) {
  return (
    <div className={`min-w-[200px] h-[100px] ${color} rounded-xl p-3 mr-3 flex-shrink-0 relative overflow-hidden`}>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white leading-tight">{title}</h3>
          {subtitle && <p className="text-white/90 text-[10px] leading-tight">{subtitle}</p>}
          {value && <p className="text-sm font-bold text-white mt-0.5">{value}</p>}
        </div>
        {cta && (
          <button className="inline-flex items-center text-white text-[10px] font-semibold group">
            {cta}
            <ArrowRight className="ml-1 h-2 w-2 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
      {Icon && (
        <div className="absolute right-1 bottom-1 opacity-10">
          <Icon className="w-10 h-10" />
        </div>
      )}
      {image && (
        <div className="absolute right-1 bottom-1">
          <Image 
            src={image} 
            alt="Description" 
            width={500} 
            height={300}
            className="w-10 h-10 object-contain"
          />
        </div>
      )}
    </div>
  )
}

interface DashboardTransaction {
  id: string
  title: string
  description: string
  amount: string
  date: string
  status: TransactionStatus
  currency: Currency
  type: TransactionType
  rawAmount: number
  category: string
}

type IconComponent = React.ComponentType<{ className?: string }>

interface QuickAction {
  title: string
  href: string
  icon: IconComponent | (() => React.ReactNode)
  color: string
}

export default function Dashboard() {
  const { transactions } = useWalletStore()
  const [showBalance, setShowBalance] = useState(true)
  const [viewAllTransactions, setViewAllTransactions] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transactionsData, setTransactions] = useState<DashboardTransaction[]>([])
  const { toast } = useToast()
  const { updateTransactionStatus, addTransaction } = useWalletStore()

  const handleAdminApproval = (id: string, newStatus: "Completed" | "Failed") => {
    // Update transaction status in the wallet store
    updateTransactionStatus(id, newStatus)

    // Update the transaction in local state
    setTransactions((prev) =>
      prev.map((transaction) => (transaction.id === id ? { ...transaction, status: newStatus } : transaction)),
    )

    // Show notification
    toast({
      title: newStatus === "Completed" ? "Transaction Approved" : "Transaction Rejected",
      description:
        newStatus === "Completed"
          ? "The RMB purchase has been approved and completed."
          : "The RMB purchase has been rejected.",
      variant: newStatus === "Completed" ? "default" : "destructive",
    })
  }

  const loadTransactions = useCallback(() => {
    try {
      const mappedTransactions: DashboardTransaction[] = transactions.map((tx: Transaction) => ({
        id: tx.id,
        title: tx.description,
        description: tx.category,
        amount: formatCurrency(tx.amount, tx.currency),
        date: tx.date,
        status: tx.status,
        currency: tx.currency,
        type: tx.type,
        rawAmount: tx.amount,
        category: tx.category
      }))
      setTransactions(mappedTransactions)
    } catch (error) {
      setError("Failed to load transactions")
    }
  }, [transactions])

  const quickActions: QuickAction[] = [
    {
      title: "Buy RMB",
      href: "/currency-exchange",
      icon: () => <span className="text-white text-sm font-bold">¥</span>,
      color: "from-secondary-500 to-secondary-700",
    },
    {
      title: "Logistics",
      href: "/logistics",
      icon: Truck,
      color: "from-primary-600 to-primary-800",
    },
    {
      title: "Bill Payments",
      href: "/bill-payments",
      icon: FileText,
      color: "from-accent-500 to-accent-700",
    },
    {
      title: "Wallet/BNPL",
      href: "/wallet",
      icon: Grid,
      color: "from-nebula-teal to-secondary-700",
    },
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const bannerSlides = [
    {
      title: "Monthly Revenue",
      value: "¥123,456",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "28",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      icon: Truck,
    },
    {
      title: "Unlock Limits",
      subtitle: "Get Business Account",
      color: "bg-gradient-to-r from-purple-600 to-purple-700",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "New Users",
      value: "+156",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      icon: Users,
    },
    {
      title: "SMS Sent",
      value: "10,234",
      color: "bg-gradient-to-r from-teal-500 to-cyan-600",
      icon: MessageSquare,
    },
    {
      title: "Refer & Earn",
      subtitle: "Get ¥100 bonus",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
      icon: Gift,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [bannerSlides.length])

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.scrollTo({
        left: currentBannerIndex * 203,
        behavior: "smooth",
      })
    }
  }, [currentBannerIndex])

  useEffect(() => {
    loadTransactions()
  }, [loadTransactions])

  // Format transactions for display
  const formattedTransactions = transactions.map((transaction) => ({
    id: transaction.id,
    title: transaction.category,
    amount: formatCurrency(transaction.amount, transaction.currency),
    description: transaction.description,
    date: new Date(transaction.date).toLocaleString(),
    status: transaction.status,
    type: transaction.type,
  }))

  // If no transactions exist, create some sample ones
  const displayTransactions =
    transactionsData.length > 0
      ? transactionsData
      : Array(5)
          .fill(null)
          .map((_, index) => ({
            id: `sample-${index}`,
            title: "Sample Transaction",
            amount: `₦${Math.floor(Math.random() * 10000).toLocaleString()}`,
            description: "Sample transaction description",
            date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleString(),
            status: ["Successful", "Completed", "Pending"][Math.floor(Math.random() * 3)] as
              | "Successful"
              | "Completed"
              | "Pending",
            type: ["Wallet Funding", "Payment"][Math.floor(Math.random() * 2)] as "Wallet Funding" | "Payment",
          }))

  const renderIcon = (Icon: IconComponent | (() => React.ReactNode)) => {
    if ('render' in (Icon as any)) {
      return <Icon className="h-5 w-5" />
    }
    return (Icon as () => React.ReactNode)()
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Icons - Always visible */}
      <div className="sticky top-0 z-[1000] bg-primary/95 backdrop-blur-md shadow-lg">
        <div className="relative z-[100000]">
          {" "}
          {/* This ensures notifications stay on top */}
          <div className="flex justify-between items-center p-4">
            <motion.div
              className="relative"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, -5, 0] }} // Reduced rotation angle
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3, // Slower animation
                repeatType: "loop",
              }}
            >
              <NotificationIcon />
            </motion.div>
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 5, -5, 0] }} // Reduced rotation angle
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3, // Slower animation
                  repeatType: "loop",
                  delay: 1,
                }}
              >
                <Link href="/help-center" className="text-white hover:text-white/80">
                  <HelpCircle className="h-6 w-6" />
                </Link>
              </motion.div>
              <AccountButton />
            </div>
          </div>
        </div>

        {/* Only Wallet Balance is sticky */}
        <div className="p-4 relative z-[999]">
          <WalletBalanceCard />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-primary/50 to-primary">
        {/* Banner Slides - Now scrollable */}
        <div className="p-4 relative z-[1]">
          <div className="relative">
            <div ref={bannerRef} className="flex overflow-x-hidden">
              {bannerSlides.map((slide, index) => (
                <BannerSlide key={index} {...slide} />
              ))}
            </div>
            <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentBannerIndex ? "bg-white w-3" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentBannerIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-responsive-xl font-bold text-white">Quick Actions</h2>
            <Link href="/products" className="text-responsive-sm text-blue-300 hover:text-blue-100">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <div className={`flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r ${action.color}`}>
                  {renderIcon(action.icon)}
                  <span className="text-white text-sm font-medium">{action.title}</span>
                </div>
              </Link>
            ))}
          </div>
          {/* Add this somewhere in the component, perhaps in the quick actions section or user menu */}
          {/* This is a simplified example - you would typically check user roles before showing this */}
          <Link
            href="/admin"
            className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-primary-800 text-white hover:bg-primary-700 transition-colors"
          >
            <Shield className="h-5 w-5" />
            <span>Admin Dashboard</span>
          </Link>
        </section>

        {/* Recent Transactions */}
        <section className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <Card className="bg-white/95 backdrop-blur-md border-none shadow-lg shadow-black/20 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-transparent">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <CardTitle className="text-responsive-xl font-bold text-gray-800">Recent Transactions</CardTitle>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewAllTransactions(!viewAllTransactions)}
                    className="text-gray-600 hover:text-gray-800 text-responsive-sm"
                  >
                    {viewAllTransactions ? (
                      <>
                        Show Less <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        View All <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardHeader>
              <CardContent className="p-4">
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {displayTransactions.slice(0, viewAllTransactions ? undefined : 5).map((transaction: any) => (
                    <motion.div
                      key={transaction.id}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <TransactionCard
                        id={transaction.id}
                        title={transaction.title || "Untitled Transaction"}
                        amount={transaction.amount || "N/A"}
                        description={transaction.description || "No description available"}
                        date={transaction.date ? transaction.date : "Unknown date"}
                        status={
                          (transaction.status as "Successful" | "Completed" | "Pending" | "Failed" | null) || null
                        }
                        type={transaction.type}
                        handleAdminApproval={handleAdminApproval}
                        transaction={transaction}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* View All Transactions Link */}
        <div className="text-center p-4 pb-20">
          <Link
            href="/transactions"
            className="inline-flex items-center text-blue-300 hover:text-blue-100 hover-lift text-responsive-base"
          >
            View All Transactions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

