"use client"

import { useState } from "react"
import { useWalletStore, type Transaction } from "@/stores/walletStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { emailService } from "@/utils/emailService"

export default function AdminTransactionsPage() {
  const { transactions, updateTransactionStatus } = useWalletStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleUpdateStatus = async (transaction: Transaction, newStatus: string) => {
    updateTransactionStatus(transaction.id, newStatus as any)

    toast({
      title: "Transaction Updated",
      description: `Transaction ${transaction.id.substring(0, 8)} status changed to ${newStatus}`,
      variant: "default",
    })

    // Send email notification
    await emailService.sendTransactionStatusEmail(
      "user@example.com", // In a real app, this would be the user's email
      transaction.id,
      newStatus,
      transaction.amount,
      transaction.description,
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Pending
          </Badge>
        )
      case "Successful":
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        )
      case "Failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "Successful":
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Transaction Management</h1>
        <p className="text-blue-100/80 mt-1">View and manage all transactions</p>
      </div>

      <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-white">Transactions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Successful">Successful</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-white/10 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="hover:bg-white/5 border-white/10">
                  <TableHead className="text-white">Transaction ID</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">Amount</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow className="hover:bg-white/5 border-white/10">
                    <TableCell colSpan={6} className="text-center text-white/70 py-10">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-white/5 border-white/10">
                      <TableCell className="text-white/90 font-mono text-xs">
                        {transaction.id.substring(0, 12)}...
                      </TableCell>
                      <TableCell className="text-white/90">
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-white/60">{transaction.category}</div>
                      </TableCell>
                      <TableCell
                        className={`font-medium ${transaction.type === "credit" ? "text-green-400" : "text-red-400"}`}
                      >
                        {transaction.type === "credit" ? "+" : "-"} ₦{transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-white/70">
                        {format(new Date(transaction.date), "MMM dd, yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(transaction.status)}
                          {getStatusBadge(transaction.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {transaction.status === "Pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-green-900/20 hover:bg-green-900/30 text-green-400 border-green-800"
                              onClick={() => handleUpdateStatus(transaction, "Successful")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-red-900/20 hover:bg-red-900/30 text-red-400 border-red-800"
                              onClick={() => handleUpdateStatus(transaction, "Failed")}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

