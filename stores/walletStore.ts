import { create } from "zustand"
import { persist } from "zustand/middleware"
import { hapticFeedback } from "@/utils/haptics"
import { formatCurrency } from "@/utils/formatCurrency"

export type Currency = "NGN" | "USD" | "RMB"
export type TransactionStatus = "Pending" | "Successful" | "Failed" | "Completed"
export type TransactionType = "debit" | "credit"

export interface Transaction {
  id: string
  amount: number
  currency: Currency
  description: string
  category: string
  date: string
  status: TransactionStatus
  type: TransactionType
  reference?: string
  recipientDetails?: any
  originalAmount?: number
  exchangeRate?: number
}

interface WalletState {
  balance: number
  currency: Currency
  transactions: Transaction[]
  isFundWalletDialogOpen: boolean

  // Actions
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => string
  getFormattedBalance: () => string
  openFundWalletDialog: () => void
  closeFundWalletDialog: () => void
  fundWallet: (amount: number) => void
  deductFromWallet: (
    amount: number,
    description: string,
    category: string,
    status?: TransactionStatus,
    originalAmount?: number,
    exchangeRate?: number,
  ) => string | false
  getTransactionHistory: () => Transaction[]
  updateTransactionStatus: (id: string, status: TransactionStatus) => void
  setBalance: (newBalance: number) => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 1000000, // Default balance (₦10,000.00 in kobo)
      currency: "NGN",
      transactions: [],
      isFundWalletDialogOpen: false,

      addTransaction: (transaction) => {
        const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

        const newTransaction: Transaction = {
          ...transaction,
          id: transactionId,
          date: new Date().toISOString(),
        }

        set((state) => {
          // Update balance based on transaction type and status
          // Only update balance for successful/completed transactions, not pending
          let newBalance = state.balance
          if (transaction.status !== "Pending") {
            newBalance =
              transaction.type === "credit" ? state.balance + transaction.amount : state.balance - transaction.amount
          }

          return {
            transactions: [newTransaction, ...state.transactions],
            balance: newBalance,
          }
        })

        return transactionId
      },

      getFormattedBalance: () => {
        const { balance, currency } = get()
        console.log(`Formatting balance: ${balance} kobo`)
        return formatCurrency(balance, currency === "NGN" ? "₦" : currency === "USD" ? "$" : "¥")
      },

      getTransactionHistory: () => {
        return get().transactions
      },

      openFundWalletDialog: () => {
        hapticFeedback.medium()
        set({ isFundWalletDialogOpen: true })
      },

      closeFundWalletDialog: () => {
        set({ isFundWalletDialogOpen: false })
      },

      fundWallet: (amount) => {
        if (amount <= 0) return

        // Log the amount for debugging
        console.log(`Funding wallet with ${amount} kobo`)

        const transactionId = get().addTransaction({
          amount,
          currency: get().currency,
          description: "Wallet funding",
          category: "Wallet Funding",
          status: "Successful",
          type: "credit",
          reference: `FND-${Date.now()}`,
        })

        // Log the transaction for debugging
        console.log(`Created transaction: ${transactionId}`)

        hapticFeedback.success()
      },

      deductFromWallet: (amount, description, category, status = "Successful", originalAmount, exchangeRate) => {
        if (amount <= 0) return false

        const { balance } = get()

        // Debug the deduction
        console.log(`Attempting to deduct ${amount} kobo from wallet with balance ${balance} kobo`)
        console.log(`Transaction status: ${status}`)

        // Only check balance for immediate deductions (not pending)
        if (balance < amount && status !== "Pending") {
          console.log(`Insufficient funds: ${balance} < ${amount}`)
          hapticFeedback.error()
          return false
        }

        // Create transaction with additional exchange rate information if provided
        const transactionData: Omit<Transaction, "id" | "date"> = {
          amount,
          currency: get().currency,
          description,
          category,
          status: status,
          type: "debit",
          reference: `DEB-${Date.now()}`,
        }

        // Add exchange rate information if provided
        if (originalAmount !== undefined && exchangeRate !== undefined) {
          transactionData.originalAmount = originalAmount
          transactionData.exchangeRate = exchangeRate
        }

        const transactionId = get().addTransaction(transactionData)

        // Only deduct from balance if the transaction is not pending
        if (status !== "Pending") {
          console.log(`Deducting ${amount} kobo from wallet balance immediately`)
          hapticFeedback.success()
        } else {
          console.log(`Transaction is pending - not deducting from balance yet`)
        }

        return transactionId
      },

      updateTransactionStatus: (id, status) => {
        set((state) => {
          let balanceChange = 0
          let updatedTransaction = null

          const updatedTransactions = state.transactions.map((transaction) => {
            if (transaction.id === id) {
              // If transaction is being completed and was pending, update balance
              if (transaction.status === "Pending") {
                if ((status === "Successful" || status === "Completed") && transaction.type === "debit") {
                  balanceChange = -transaction.amount
                  console.log(`Approving pending transaction: deducting ${transaction.amount} kobo from balance`)
                } else if ((status === "Successful" || status === "Completed") && transaction.type === "credit") {
                  balanceChange = transaction.amount
                  console.log(`Approving pending credit: adding ${transaction.amount} kobo to balance`)
                } else if (status === "Failed" || status === "Rejected") {
                  console.log(`Rejecting transaction: no balance change`)
                }
              }

              updatedTransaction = { ...transaction, status }
              return updatedTransaction
            }
            return transaction
          })

          // Log the transaction update for debugging
          if (updatedTransaction) {
            console.log(`Transaction ${id} status updated to ${status}. Balance change: ${balanceChange}`)
          }

          return {
            transactions: updatedTransactions,
            balance: state.balance + balanceChange,
          }
        })
      },

      setBalance: (newBalance: number) => {
        set({ balance: newBalance })
      },
    }),
    {
      name: "velocia-wallet-storage",
    },
  ),
)

// Subscribe to balance changes for debugging
useWalletStore.subscribe(
  (state) => state.balance,
  (balance) => {
    console.log("Wallet balance updated:", balance)
  },
)

