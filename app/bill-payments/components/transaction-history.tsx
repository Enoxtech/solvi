"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Phone, Tv, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Sample transaction data
const sampleTransactions = [
  {
    id: "1",
    type: "Data",
    provider: "MTN",
    amount: "₦2,000",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "Successful",
    recipient: "08012345678",
    description: "1GB Data Bundle",
  },
  {
    id: "2",
    type: "Airtime",
    provider: "Airtel",
    amount: "₦1,000",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "Successful",
    recipient: "09087654321",
    description: "Airtime Top-up",
  },
  {
    id: "3",
    type: "TV",
    provider: "DSTV",
    amount: "₦6,500",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "Pending",
    recipient: "12345678",
    description: "DSTV Compact Subscription",
  },
  {
    id: "4",
    type: "Data",
    provider: "9mobile",
    amount: "₦1,500",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    status: "Failed",
    recipient: "08076543210",
    description: "500MB Data Bundle",
  },
]

// Get icon based on transaction type
const getTransactionIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "data":
      return <FileText className="h-5 w-5 text-blue-500" />
    case "airtime":
      return <Phone className="h-5 w-5 text-green-500" />
    case "tv":
      return <Tv className="h-5 w-5 text-purple-500" />
    default:
      return <FileText className="h-5 w-5 text-gray-500" />
  }
}

// Get status icon based on status
const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "successful":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-amber-500" />
    case "failed":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

export function TransactionHistory() {
  const [transactions] = useState(sampleTransactions)

  return (
    <Card className="bg-white/95 backdrop-blur-md border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-transparent">
        <CardTitle className="text-xl font-bold text-gray-800">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {transaction.provider} {transaction.type}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <Calendar className="h-3 w-3" />
                              {format(transaction.date, "MMM d, yyyy")} •
                              <Clock className="h-3 w-3 ml-1" />
                              {format(transaction.date, "h:mm a")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{transaction.amount}</p>
                            <p
                              className={cn(
                                "text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1",
                                transaction.status === "Successful" && "bg-green-100 text-green-700",
                                transaction.status === "Pending" && "bg-amber-100 text-amber-700",
                                transaction.status === "Failed" && "bg-red-100 text-red-700",
                              )}
                            >
                              {getStatusIcon(transaction.status)}
                              {transaction.status}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Recipient:</span> {transaction.recipient}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">{transaction.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

