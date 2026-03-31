"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/stores/walletStore"
import { getRmbRates } from "@/app/actions/rmbRates"

export default function SellRmbPage() {
  const router = useRouter()
  const { rmbWallet } = useWalletStore()
  const [amount, setAmount] = useState("")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRmbRates().then(r => {
      setRate(r.sellRate)
      setLoading(false)
    })
  }, [])

  const rmbAmount = Number(amount) || 0
  const nairaAmount = rate ? rmbAmount * rate : 0
  const isValid = rmbAmount >= 1

  const handleProceed = () => {
    if (!isValid) return
    router.push({
      pathname: "/currency-exchange/sell-rmb/confirm-details",
      query: {
        state: encodeURIComponent(JSON.stringify({
          amount: nairaAmount,
          rmbAmount,
          rate,
          type: "sell",
        })),
      },
    })
  }

  return (
    <div className="min-h-screen bg-black text-white pb-36">
      {/* iOS Status Bar */}
      <div className="h-11 bg-black flex items-end justify-between px-6 pb-1">
        <span className="text-white text-[15px] font-semibold">9:41</span>
        <svg width="17" height="12" viewBox="0 0 17 12" className="fill-white">
          <rect x="0" y="4" width="3" height="8" rx="1" />
          <rect x="4.5" y="2" width="3" height="10" rx="1" />
          <rect x="9" y="0" width="3" height="12" rx="1" />
          <rect x="13.5" y="3" width="3" height="6" rx="1" />
        </svg>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-[#1C1C1E] flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-white text-[17px] font-semibold">Sell RMB</h1>
        </div>
      </div>

      {/* Amount Input */}
      <div className="px-6 pt-2 pb-3">
        <div className="bg-[#1C1C1E] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#8E8E93] text-[12px] font-medium">YOU SELL (RMB)</p>
            <button
              onClick={() => router.push("/currency-exchange/buy-rmb")}
              className="text-[#0A84FF] text-[12px] font-medium active:text-[#0070E0]"
            >
              Switch to Buy
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🇨🇳</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              inputMode="decimal"
              className="flex-1 bg-transparent text-[34px] font-bold text-white outline-none placeholder:text-[#38383A]"
            />
          </div>

          {/* Exchange Preview */}
          {rmbAmount > 0 && (
            <div className="border-t border-[#38383A] pt-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#8E8E93] text-[13px]">Exchange rate</span>
                <span className="text-[13px] text-white font-medium">
                  ₦{rate?.toFixed(2)} / ¥1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8E8E93] text-[13px]">You'll receive</span>
                <span className="text-[17px] font-bold text-[#30D158]">
                  ₦{nairaAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Balance */}
        <div className="flex items-center justify-between mt-3 px-1">
          <span className="text-[#8E8E93] text-[13px]">Available balance</span>
          <span className="text-[13px] text-white font-medium">
            ¥{rmbWallet.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {[500, 1000, 2000, 5000].map(quick => (
            <button
              key={quick}
              onClick={() => setAmount(quick.toString())}
              className="flex-shrink-0 px-4 py-2 bg-[#1C1C1E] rounded-full text-[13px] font-medium text-white active:bg-[#2C2C2E] transition-colors"
            >
              ¥{quick.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 pt-1">
        <div className="bg-[#1C1C1E] rounded-2xl p-4 mt-4 flex gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <div className="text-[#8E8E93] text-[12px] leading-relaxed space-y-1">
            <p className="font-semibold text-[#8E8E93]">How selling works</p>
            <p>1. You transfer RMB to our WeChat or Alipay</p>
            <p>2. We confirm and send NGN to your account</p>
            <p>3. Usually takes 5–30 minutes</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-[#38383A] p-4 pb-8">
        <button
          onClick={handleProceed}
          disabled={!isValid}
          className={`w-full py-[18px] rounded-2xl text-[17px] font-semibold transition-all ${
            isValid
              ? "bg-[#0A84FF] text-white active:bg-[#0070E0]"
              : "bg-[#2C2C2E] text-[#636366]"
          }`}
        >
          {isValid
            ? `Continue — ¥${rmbAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} → ₦${nairaAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
            : "Enter amount to continue"}
        </button>
      </div>
    </div>
  )
}
