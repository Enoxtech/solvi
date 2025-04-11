import axios from "axios"

interface PaymentData {
  amount: number
  provider: string
  planId?: string
  recipientNumber?: string
  recipientName?: string
  accountNumber?: string
  reference?: string
}

interface CurrencyConversionData {
  amount: number
  fromCurrency: string
  toCurrency: string
}

interface ProfileUpdateData {
  name?: string
  email?: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: string
  profilePicture?: string
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const billPaymentApi = {
  getBillers: () => api.get("/billers"),
  getDataPlans: (provider: string) => api.get(`/data-plans/${provider}`),
  getAirtimePlans: (provider: string) => api.get(`/airtime-plans/${provider}`),
  getTVPlans: (provider: string) => api.get(`/tv-plans/${provider}`),
  makePayment: (data: PaymentData) => api.post("/payments", data),
}

export const currencyExchangeApi = {
  getExchangeRate: () => api.get("/exchange-rate"),
  convertCurrency: (data: CurrencyConversionData) => api.post("/convert", data),
  getTransactionHistory: () => api.get("/transaction-history"),
}

export const userApi = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data: ProfileUpdateData) => api.put("/user/profile", data),
  getTransactions: () => api.get("/user/transactions"),
}

export const walletApi = {
  getBalance: () => api.get("/wallet/balance"),
  fundWallet: (amount: number) => api.post("/wallet/fund", { amount }),
  withdraw: (amount: number) => api.post("/wallet/withdraw", { amount }),
}

