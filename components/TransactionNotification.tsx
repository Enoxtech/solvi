"use client"

import { useEffect } from "react"
import { useWalletStore } from "@/stores/walletStore"
import { useNotifications } from "@/contexts/NotificationContext"

export function TransactionNotification() {
  const { transactions } = useWalletStore()
  const { addNotification } = useNotifications()

  // Keep track of processed transaction IDs to avoid duplicate notifications
  const processedTransactions = new Set<string>()

  useEffect(() => {
    // Check for status changes in transactions
    transactions.forEach((transaction) => {
      // Skip already processed transactions
      if (processedTransactions.has(transaction.id)) return

      // Add to processed set
      processedTransactions.add(transaction.id)

      // For new completed transactions, show a notification
      if (transaction.status === "Successful" && transaction.category === "Currency Exchange") {
        addNotification({
          title: "RMB Purchase Completed",
          message: `Your purchase of RMB has been completed successfully.`,
          type: "success",
        })
      }

      // For failed transactions
      if (transaction.status === "Failed" && transaction.category === "Currency Exchange") {
        addNotification({
          title: "RMB Purchase Failed",
          message: `Your purchase of RMB could not be completed. Please contact support.`,
          type: "urgent",
        })
      }
    })
  }, [transactions, addNotification])

  // This component doesn't render anything
  return null
}

