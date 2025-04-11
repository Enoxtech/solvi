import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const billPaymentApi = {
  getBillers: () => api.get("/billers"),
  getDataPlans: (provider: string) => api.get(`/data-plans/${provider}`),
  getAirtimePlans: (provider: string) => api.get(`/airtime-plans/${provider}`),
  getTVPlans: (provider: string) => api.get(`/tv-plans/${provider}`),
  makePayment: (data: any) => api.post("/payments", data),
}

export const currencyExchangeApi = {
  getExchangeRate: () => api.get("/exchange-rate"),
  convertCurrency: (data: any) => api.post("/convert", data),
  getTransactionHistory: () => api.get("/transaction-history"),
}

export const userApi = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data: any) => api.put("/user/profile", data),
  getTransactions: () => api.get("/user/transactions"),
}

export const walletApi = {
  getBalance: () => api.get("/wallet/balance"),
  fundWallet: (amount: number) => api.post("/wallet/fund", { amount }),
  withdraw: (amount: number) => api.post("/wallet/withdraw", { amount }),
}

