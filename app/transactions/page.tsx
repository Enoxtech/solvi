"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronLeft,
  X,
  Filter,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  FileText,
  Truck,
  DollarSign,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useWalletStore } from "@/stores/walletStore"

interface Transaction {
  id: string
  type: "RMB Purchase" | "Wallet Funding" | "Bill Payment" | "Logistics"
  amount: number
  date: string
  status: "Completed" | "Successful" | "Pending" | "Failed"
  recipient?: string
  description?: string
  currency?: "NGN" | "RMB" | "USD"
}

// Updated transaction types to match Velocia's services
const transactionTypes = ["All", "RMB", "Wallet", "Bills", "Logistics"] as const
type TransactionType = (typeof transactionTypes)[number]

// Transaction type to icon mapping
const typeIcons: Record<Transaction["type"], any> = {
  "RMB Purchase": DollarSign,
  "Wallet Funding": Wallet,
  "Bill Payment": FileText,
  Logistics: Truck,
}

export default function TransactionsPage() {
  const { getTransactionHistory } = useWalletStore()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedType, setSelectedType] = useState<TransactionType>("All")
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [activeTab, setActiveTab] = useState<"all" | "recent">("all")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load transactions from wallet store
    const loadTransactions = () => {
      try {
        const walletTransactions = getTransactionHistory()

        if (walletTransactions && walletTransactions.length > 0) {
          // Format wallet transactions for display
          const formattedTransactions: Transaction[] = walletTransactions.map((tx) => {
            // Map wallet store transaction to Transaction interface
            const transactionType = tx.category.includes("RMB")
              ? "RMB Purchase"
              : tx.category.includes("Wallet")
                ? "Wallet Funding"
                : tx.category.includes("Bill")
                  ? "Bill Payment"
                  : "Logistics"

            return {
              id: tx.id,
              type: transactionType,
              amount: Number(tx.amount),
              date: tx.date,
              status: tx.status as Transaction["status"],
              description: tx.description,
              recipient: tx.recipientDetails?.name,
              currency: tx.currency as Transaction["currency"],
            }
          })

          setTransactions(formattedTransactions)
          setFilteredTransactions(formattedTransactions)
          return
        }

        // Fallback to mock data if no wallet transactions
        const mockTransactions: Transaction[] = [
          {
            id: "1",
            type: "RMB Purchase",
            amount: 280700,
            date: "2025-02-24T12:37:00",
            status: "Completed",
            recipient: "Li Wei",
            description: "Purchase of 1,340 RMB",
            currency: "RMB",
          },
          {
            id: "2",
            type: "Wallet Funding",
            amount: 280500.0,
            date: "2025-02-24T12:33:00",
            status: "Successful",
            description: "Bank transfer from GTBank",
            currency: "NGN",
          },
          {
            id: "3",
            type: "RMB Purchase",
            amount: 518500.0,
            date: "2024-07-03T08:56:00",
            status: "Completed",
            recipient: "Zhang Min",
            description: "Purchase of 2,475 RMB",
            currency: "RMB",
          },
          {
            id: "4",
            type: "Wallet Funding",
            amount: 1200.0,
            date: "2024-07-03T08:51:00",
            status: "Successful",
            description: "Card payment",
            currency: "NGN",
          },
          {
            id: "5",
            type: "Bill Payment",
            amount: 5000.0,
            date: "2024-07-02T14:22:00",
            status: "Completed",
            recipient: "MTN Nigeria",
            description: "Data bundle purchase",
            currency: "NGN",
          },
          {
            id: "6",
            type: "Logistics",
            amount: 12500.0,
            date: "2024-07-01T09:15:00",
            status: "Pending",
            description: "Package delivery to Lagos",
            currency: "NGN",
          },
          {
            id: "7",
            type: "RMB Purchase",
            amount: 105000.0,
            date: "2024-06-28T16:42:00",
            status: "Completed",
            recipient: "Wang Jie",
            description: "Purchase of 500 RMB",
            currency: "RMB",
          },
          {
            id: "8",
            type: "Bill Payment",
            amount: 25000.0,
            date: "2024-06-25T11:30:00",
            status: "Failed",
            recipient: "DSTV",
            description: "Subscription renewal",
            currency: "NGN",
          },
        ]

        setTransactions(mockTransactions)
        setFilteredTransactions(mockTransactions)
      } catch (error) {
        console.error("Error loading transactions:", error)
      }
    }

    loadTransactions()
  }, [getTransactionHistory])

  const applyFilter = () => {
    let filtered = [...transactions]

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date)
        const start = new Date(startDate)
        const end = new Date(endDate)
        return transactionDate >= start && transactionDate <= end
      })
    }

    // Filter by type
    if (selectedType !== "All") {
      if (selectedType === "RMB") {
        filtered = filtered.filter((t) => t.type.includes("RMB"))
      } else if (selectedType === "Wallet") {
        filtered = filtered.filter((t) => t.type.includes("Wallet"))
      } else if (selectedType === "Bills") {
        filtered = filtered.filter((t) => t.type.includes("Bill"))
      } else if (selectedType === "Logistics") {
        filtered = filtered.filter((t) => t.type.includes("Logistics"))
      }
    }

    setFilteredTransactions(filtered)
    setShowFilter(false)
  }

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(transaction)
      return groups
    },
    {} as Record<string, Transaction[]>,
  )

  // Render all transactions grouped by date
  const renderAllTransactions = () => (
    <AnimatePresence mode="popLayout">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3 px-2">
            <Calendar className="h-4 w-4 text-white/70" />
            <h3 className="text-sm font-medium text-white/90">{format(new Date(date), "EEEE, MMMM d, yyyy")}</h3>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction) => {
              const IconComponent = typeIcons[transaction.type] || Wallet
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 bg-white/95 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all rounded-xl overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          transaction.type === "RMB Purchase"
                            ? "bg-blue-100 text-blue-600"
                            : transaction.type === "Wallet Funding"
                              ? "bg-green-100 text-green-600"
                              : transaction.type === "Bill Payment"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-amber-100 text-amber-600",
                        )}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 truncate">{transaction.type}</h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Clock className="h-3 w-3" />
                              {format(new Date(transaction.date), "hh:mm a")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 flex items-center gap-1">
                              {transaction.type === "Wallet Funding" ? (
                                <ArrowDownLeft className="h-3 w-3 text-green-500" />
                              ) : (
                                <ArrowUpRight className="h-3 w-3 text-red-500" />
                              )}
                              {(() => {
                                // Ensure transaction.amount is a valid number
                                const numAmount = transaction.amount

                                // Format based on currency
                                if (transaction.currency === "RMB") {
                                  return `¥${(numAmount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                } else if (transaction.currency === "USD") {
                                  return `$${(numAmount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                } else {
                                  // Default to NGN
                                  return `₦${(numAmount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                }
                              })()}
                            </p>
                            <p
                              className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                                transaction.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : transaction.status === "Successful"
                                    ? "bg-blue-100 text-blue-700"
                                    : transaction.status === "Pending"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-red-100 text-red-700",
                              )}
                            >
                              {transaction.status}
                            </p>
                          </div>
                        </div>

                        {(transaction.recipient || transaction.description) && (
                          <div className="mt-2 pt-2 border-t border-gray-100">
                            {transaction.recipient && (
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">Recipient:</span> {transaction.recipient}
                              </p>
                            )}
                            {transaction.description && (
                              <p className="text-xs text-gray-600 mt-0.5">{transaction.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )

  // Render recent transactions
  const renderRecentTransactions = () => (
    <AnimatePresence mode="popLayout">
      {filteredTransactions.slice(0, 5).map((transaction) => {
        const IconComponent = typeIcons[transaction.type] || Wallet
        return (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="mb-3"
          >
            <Card className="p-4 bg-white/95 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all rounded-xl overflow-hidden">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    transaction.type === "RMB Purchase"
                      ? "bg-blue-100 text-blue-600"
                      : transaction.type === "Wallet Funding"
                        ? "bg-green-100 text-green-600"
                        : transaction.type === "Bill Payment"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-amber-100 text-amber-600",
                  )}
                >
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">{transaction.type}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(transaction.date), "MMM d, yyyy")} •
                        <Clock className="h-3 w-3 ml-1" />
                        {format(new Date(transaction.date), "hh:mm a")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 flex items-center gap-1">
                        {transaction.type === "Wallet Funding" ? (
                          <ArrowDownLeft className="h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3 text-red-500" />
                        )}
                        {(() => {
                          // Ensure transaction.amount is a valid number
                          const numAmount = transaction.amount

                          // Format based on currency
                          if (transaction.currency === "RMB") {
                            return `¥${(numAmount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          } else if (transaction.currency === "USD") {
                            return `$${(numAmount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          } else {
                            // Default to NGN
                            return `₦${(numAmount / 100).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          }
                        })()}
                      </p>
                      <p
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1",
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "Successful"
                              ? "bg-blue-100 text-blue-700"
                              : transaction.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700",
                        )}
                      >
                        {transaction.status}
                      </p>
                    </div>
                  </div>

                  {(transaction.recipient || transaction.description) && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      {transaction.recipient && (
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Recipient:</span> {transaction.recipient}
                        </p>
                      )}
                      {transaction.description && (
                        <p className="text-xs text-gray-600 mt-0.5">{transaction.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-primary/95 backdrop-blur-md border-b border-white/10 text-white">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-semibold">Transactions</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-white hover:bg-white/10"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-2 max-w-lg mx-auto">
          <div className="bg-white/10 p-1 rounded-full flex">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "flex-1 py-2 px-6 rounded-full text-sm font-medium transition-all",
                activeTab === "all" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10",
              )}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={cn(
                "flex-1 py-2 px-6 rounded-full text-sm font-medium transition-all",
                activeTab === "recent" ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10",
              )}
            >
              Recent
            </button>
          </div>
        </div>
      </header>

      {/* Transaction List */}
      <main className="p-4 max-w-lg mx-auto pb-24" ref={scrollRef}>
        {activeTab === "all" ? renderAllTransactions() : renderRecentTransactions()}
      </main>

      {/* Filter Dialog */}
      <Dialog open={showFilter} onOpenChange={setShowFilter}>
        <DialogContent className="p-0 gap-0 max-w-lg mx-auto rounded-t-xl sm:rounded-xl">
          <div className="p-4 border-b border-gray-200 bg-primary text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Transaction Filter</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-white/10"
                onClick={() => setShowFilter(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-50 border-gray-200 rounded-xl focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Transaction Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Transaction type</label>
              <div className="flex flex-wrap gap-2">
                {transactionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "px-6 py-3 rounded-full text-sm font-medium transition-all",
                      selectedType === type
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Filter Button */}
          <div className="p-6 bg-gray-50 rounded-b-xl">
            <Button
              onClick={applyFilter}
              className="w-full py-6 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Apply Filter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

