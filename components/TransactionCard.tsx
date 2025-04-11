import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/stores/walletStore"
import { formatDistanceToNow } from "date-fns"

interface TransactionCardProps {
  transaction: Transaction
  currency: string
}

export function TransactionCard({ transaction, currency }: TransactionCardProps) {
  const { type, amount, description, date, status, category } = transaction

  const isCredit = type === "credit"
  
  // Convert amount to number safely
  const numAmount = typeof amount === "number" ? amount : 0

  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency === "NGN" ? "NGN" : currency === "USD" ? "USD" : "CNY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount / 100)

  const getStatusIcon = () => {
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

  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "text-amber-500"
      case "Successful":
      case "Completed":
        return "text-green-500"
      case "Failed":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isCredit ? "bg-green-100" : "bg-red-100",
          )}
        >
          {isCredit ? (
            <ArrowDownLeft className="h-5 w-5 text-green-600" />
          ) : (
            <ArrowUpRight className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{description}</h3>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-500">{category}</p>
            <span className="text-gray-300">•</span>
            <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(date), { addSuffix: true })}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-semibold", isCredit ? "text-green-600" : "text-red-600")}>
          {isCredit ? "+" : "-"} {formattedAmount}
        </p>
        <div className="flex items-center justify-end gap-1 mt-1">
          {getStatusIcon()}
          <p className={cn("text-xs", getStatusColor())}>{status}</p>
        </div>
      </div>
    </div>
  )
}

