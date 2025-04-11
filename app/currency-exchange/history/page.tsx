"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const transactions = [
  { id: 1, type: "Buy", amount: "500 RMB", date: "2023-06-01", status: "Completed" },
  { id: 2, type: "Send", amount: "200 RMB", date: "2023-05-28", status: "Pending" },
  { id: 3, type: "Buy", amount: "1000 RMB", date: "2023-05-25", status: "Completed" },
  { id: 4, type: "Send", amount: "300 RMB", date: "2023-05-20", status: "Completed" },
  { id: 5, type: "Buy", amount: "750 RMB", date: "2023-05-15", status: "Completed" },
]

export default function TransactionHistory() {
  const [dateFilter, setDateFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  const filteredTransactions = transactions.filter((transaction) => {
    if (dateFilter && !transaction.date.includes(dateFilter)) return false
    if (typeFilter && transaction.type !== typeFilter) return false
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Transaction History</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <Label htmlFor="dateFilter">Date</Label>
            <Input id="dateFilter" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
          <div className="w-full sm:w-auto">
            <Label htmlFor="typeFilter">Type</Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="Send">Send</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-semibold">{transaction.type}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{transaction.amount}</p>
                  <p className="text-sm text-gray-600">{transaction.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

