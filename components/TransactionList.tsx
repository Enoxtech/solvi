"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionCard } from "@/components/TransactionCard"
import { useWalletStore } from "@/stores/walletStore"
import { useCurrency } from "@/contexts/CurrencyContext"

interface TransactionListProps {
  limit?: number
  showViewAll?: boolean
}

export function TransactionList({ limit = 5, showViewAll = true }: TransactionListProps) {
  const [viewAllTransactions, setViewAllTransactions] = useState(false)
  const walletStore = useWalletStore()
  const { currency } = useCurrency()

  // Safely get transactions, with fallback to empty array
  const transactions = walletStore.getTransactionHistory?.() || walletStore.transactions || []
  const displayTransactions = viewAllTransactions ? transactions : transactions.slice(0, limit)

  if (transactions.length === 0) {
    return (
      <Card className="bg-white/95 backdrop-blur-md border-none shadow-lg shadow-black/20 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-transparent">
          <CardTitle className="text-responsive-xl font-bold text-gray-800">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center py-8 text-gray-500">
            <p>No transactions yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
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
          {showViewAll && transactions.length > limit && (
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
          )}
        </CardHeader>
        <CardContent className="p-4">
          <motion.div
            className="space-y-2"
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
            {displayTransactions.map((transaction) => (
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
                <TransactionCard transaction={transaction} currency={currency} />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

