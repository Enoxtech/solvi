"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/contexts/WalletContext"
import { useCurrency } from "@/contexts/CurrencyContext"
import { ArrowUpRight, ArrowDownLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function TransactionHistory() {
  const { transactions } = useWallet()
  const { formatAmount } = useCurrency()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.reference && transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      filter === "all" ||
      (filter === "credit" && transaction.type === "credit") ||
      (filter === "debit" && transaction.type === "debit")

    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Successful":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View all your recent transactions</CardDescription>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="credit">Credits Only</SelectItem>
              <SelectItem value="debit">Debits Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No transactions found</div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}>
                    {transaction.type === "credit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{formatDate(transaction.date)}</span>
                      <span>•</span>
                      <span>{transaction.category}</span>
                    </div>
                    {transaction.reference && (
                      <div className="text-xs text-gray-400 mt-1">Ref: {transaction.reference}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "credit" ? "+" : "-"} {(() => {
                      // Ensure transaction.amount is a valid number
                      const numAmount =
                        typeof transaction.amount === "number" && !isNaN(transaction.amount)
                          ? transaction.amount
                          : typeof transaction.amount === "string" && transaction.amount
                            ? Number.parseFloat(transaction.amount.replace(/[^\d.-]/g, "")) || 0
                            : 0

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
                  </div>
                  <Badge variant="outline" className={`mt-1 ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

