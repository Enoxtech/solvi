"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, FileText, Download, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  user: string
  type: string
  amount: string
  status: "completed" | "pending" | "failed"
  date: string
}

export function AdminTransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TX123456",
      user: "John Doe",
      type: "Wallet Funding",
      amount: "₦280,500.00",
      status: "completed",
      date: "2025-03-15 12:33:00",
    },
    {
      id: "TX123457",
      user: "Jane Smith",
      type: "RMB Purchase",
      amount: "₦518,500.00",
      status: "completed",
      date: "2025-03-15 08:56:00",
    },
    {
      id: "TX123458",
      user: "Robert Johnson",
      type: "Bill Payment",
      amount: "₦5,000.00",
      status: "completed",
      date: "2025-03-14 14:22:00",
    },
    {
      id: "TX123459",
      user: "Sarah Williams",
      type: "Logistics",
      amount: "₦12,500.00",
      status: "pending",
      date: "2025-03-14 09:15:00",
    },
    {
      id: "TX123460",
      user: "Michael Brown",
      type: "RMB Purchase",
      amount: "₦105,000.00",
      status: "completed",
      date: "2025-03-13 16:42:00",
    },
    {
      id: "TX123461",
      user: "Emily Davis",
      type: "Bill Payment",
      amount: "₦25,000.00",
      status: "failed",
      date: "2025-03-13 11:30:00",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-white/5">
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-white/5">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{transaction.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{transaction.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                <div className="flex items-center">
                  {transaction.type === "Wallet Funding" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-blue-400 mr-2" />
                  )}
                  {transaction.type}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">{transaction.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge className={cn("font-normal", getStatusColor(transaction.status))}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                {new Date(transaction.date).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View receipt</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

