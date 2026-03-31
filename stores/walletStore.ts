import { create } from 'zustand'

export type Currency = 'NGN' | 'USD' | 'RMB'

export interface Wallet {
  id: string
  currency: Currency
  balance: number
  accountNumber?: string
  accountName?: string
  bankName?: string
  flag?: string
}

interface WalletState {
  currency: Currency
  nairaWallet: Wallet
  dollarWallet: Wallet
  rmbWallet: Wallet
  loading: boolean
  setCurrency: (currency: Currency) => void
  setNairaBalance: (balance: number) => void
  setDollarBalance: (balance: number) => void
  setRmbBalance: (balance: number) => void
  setLoading: (loading: boolean) => void
  creditNaira: (amount: number) => void
  debitNaira: (amount: number) => void
  creditRmb: (amount: number) => void
  debitRmb: (amount: number) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  currency: 'NGN',
  nairaWallet: {
    id: 'wallet_ngn',
    currency: 'NGN' as Currency,
    balance: 2500000,
    accountNumber: '3062674010',
    accountName: 'OLANIPEKUN O. E',
    bankName: 'Moniepoint',
    flag: '🇳🇬',
  },
  dollarWallet: {
    id: 'wallet_usd',
    currency: 'USD' as Currency,
    balance: 1500.00,
    accountNumber: '4433002011',
    accountName: 'OLANIPEKUN O. E',
    bankName: 'CashStation',
    flag: '🇺🇸',
  },
  rmbWallet: {
    id: 'wallet_rmb',
    currency: 'RMB' as Currency,
    balance: 50000.00,
    flag: '🇨🇳',
  },
  loading: false,
  setCurrency: (currency) => set({ currency }),
  setNairaBalance: (balance) =>
    set((state) => ({ nairaWallet: { ...state.nairaWallet, balance } })),
  setDollarBalance: (balance) =>
    set((state) => ({ dollarWallet: { ...state.dollarWallet, balance } })),
  setRmbBalance: (balance) =>
    set((state) => ({ rmbWallet: { ...state.rmbWallet, balance } })),
  setLoading: (loading) => set({ loading }),
  creditNaira: (amount) =>
    set((state) => ({
      nairaWallet: {
        ...state.nairaWallet,
        balance: state.nairaWallet.balance + amount,
      },
    })),
  debitNaira: (amount) =>
    set((state) => ({
      nairaWallet: {
        ...state.nairaWallet,
        balance: state.nairaWallet.balance - amount,
      },
    })),
  creditRmb: (amount) =>
    set((state) => ({
      rmbWallet: {
        ...state.rmbWallet,
        balance: state.rmbWallet.balance + amount,
      },
    })),
  debitRmb: (amount) =>
    set((state) => ({
      rmbWallet: {
        ...state.rmbWallet,
        balance: state.rmbWallet.balance - amount,
      },
    })),
}))
