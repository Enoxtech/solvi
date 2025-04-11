"use client"

import { useEffect } from "react"
import { useWalletStore } from "@/stores/walletStore"
import { useNotifications } from "@/contexts/NotificationContext"

export function TransactionNotification() {
  const { transactions } = useWalletStore()
  const { addNotification } = useNotifications()

  useEffect(() => {
    const processedTransactions = {
      pending: transactions.filter((t) => t.status === "Pending"),
      completed: transactions.filter((t) => t.status === "Completed"),
      failed: transactions.filter((t) => t.status === "Failed"),
    }
    // Check for status changes in transactions
    transactions.forEach((transaction) => {
      // Skip already processed transactions
      if (processedTransactions.completed.some(t => t.id === transaction.id) || 
          processedTransactions.failed.some(t => t.id === transaction.id)) return

      // For new completed transactions, show a notification
      if (transaction.status === "Completed") {
        addNotification({
          title: "Transaction Completed",
          message: `Your transaction of ${transaction.amount} has been completed successfully.`,
          type: "success",
        })
      }
      // For failed transactions, show an error notification
      else if (transaction.status === "Failed") {
        addNotification({
          title: "Transaction Failed",
          message: `Your transaction of ${transaction.amount} has failed. Please try again.`,
          type: "urgent",
        })
      }
    })
  }, [transactions, addNotification])

  // This component doesn't render anything
  return null
}

