"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useWalletStore } from "@/stores/walletStore"
import { getRmbRates } from "@/app/actions/rmbRates"

export default function CurrencyExchangePage() {
  const router = useRouter()
  const { nairaWallet, rmbWallet } = useWalletStore()
  const [rates, setRates] = useState<{ buyRate: number; sellRate: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRmbRates().then(r => {
      setRates(r)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* iOS Status Bar */}
      <div className="h-11 bg-black flex items-end justify-between px-6 pb-1">
        <span className="text-white text-[15px] font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="17" height="12" viewBox="0 0 17 12" className="fill-white">
            <rect x="0" y="4" width="3" height="8" rx="1" />
            <rect x="4.5" y="2" width="3" height="10" rx="1" />
            <rect x="9" y="0" width="3" height="12" rx="1" />
            <rect x="13.5" y="3" width="3" height="6" rx="1" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-3">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-[#1C1C1E] flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-white text-[17px] font-semibold">Currency Exchange</h1>
          <div className="w-8" />
        </div>

        {/* Live Rate Banner */}
        <div className="bg-[#1C1C1E] rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#30D158]" />
            <span className="text-[#30D158] text-[12px] font-medium">Live Rate</span>
          </div>

          {loading ? (
            <div className="h-14 bg-[#2C2C2E] rounded-xl animate-pulse" />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0A84FF]/10 border border-[#0A84FF]/20 rounded-xl p-3">
                <p className="text-[#0A84FF] text-[11px] font-medium mb-1">BUY RMB</p>
                <p className="text-white text-[22px] font-bold">
                  ₦{rates?.buyRate.toFixed(2)}
                </p>
                <p className="text-[#8E8E93] text-[11px]">per ¥1</p>
              </div>
              <div className="bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-xl p-3">
                <p className="text-[#FF453A] text-[11px] font-medium mb-1">SELL RMB</p>
                <p className="text-white text-[22px] font-bold">
                  ₦{rates?.sellRate.toFixed(2)}
                </p>
                <p className="text-[#8E8E93] text-[11px]">per ¥1</p>
              </div>
            </div>
          )}
        </div>

        {/* Balance Card */}
        <div className="bg-[#1C1C1E] rounded-2xl p-4">
          <p className="text-[#8E8E93] text-[12px] font-medium mb-3">YOUR BALANCES</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[17px]">🇳🇬</span>
                <div>
                  <p className="text-[#8E8E93] text-[11px]">Naira</p>
                  <p className="text-white text-[15px] font-semibold">
                    ₦{nairaWallet.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <Link
                href="/wallet"
                className="text-[#0A84FF] text-[12px] font-medium"
              >
                Fund →
              </Link>
            </div>
            <div className="border-t border-[#38383A] pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[17px]">🇨🇳</span>
                <div>
                  <p className="text-[#8E8E93] text-[11px]">Chinese Yuan</p>
                  <p className="text-white text-[15px] font-semibold">
                    ¥{rmbWallet.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-6 pt-2 space-y-3">
        <p className="text-[#8E8E93] text-[12px] font-semibold tracking-wider uppercase mb-1">Select Transaction</p>

        <Link
          href="/currency-exchange/buy-rmb"
          className="block bg-[#1C1C1E] rounded-2xl p-4 active:bg-[#2C2C2E] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#30D158]/15 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="#30D158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-[17px] font-semibold">Buy RMB</h3>
              <p className="text-[#8E8E93] text-[13px] mt-0.5">Pay in Naira, receive Yuan</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#636366" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>

        <Link
          href="/currency-exchange/sell-rmb"
          className="block bg-[#1C1C1E] rounded-2xl p-4 active:bg-[#2C2C2E] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#FF453A]/15 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="#FF453A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-[17px] font-semibold">Sell RMB</h3>
              <p className="text-[#8E8E93] text-[13px] mt-0.5">Convert Yuan back to Naira</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#636366" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}
