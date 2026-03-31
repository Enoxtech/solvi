"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/stores/walletStore"
import { getRmbRates } from "@/app/actions/rmbRates"

const PURPOSES = [
  { id: "alibaba", label: "Alibaba / 1688", icon: "📦" },
  { id: "taobao", label: "Taobao / 淘宝", icon: "🛒" },
  { id: "education", label: "University / 留学", icon: "🎓" },
  { id: "travel", label: "Travel / 酒店", icon: "✈️" },
  { id: "business", label: "Business Payment", icon: "💼" },
  { id: "other", label: "Other / 其他", icon: "📝" },
]

export default function BuyRmbPage() {
  const router = useRouter()
  const { nairaWallet } = useWalletStore()
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [purposeOther, setPurposeOther] = useState("")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRmbRates().then(r => {
      setRate(r.buyRate)
      setLoading(false)
    })
  }, [])

  const nairaAmount = Number(amount) || 0
  const rmbAmount = rate ? nairaAmount / rate : 0
  const isValid = nairaAmount >= 1000 && purpose && (purpose !== "other" || purposeOther.trim())

  const handleProceed = () => {
    if (!isValid) return
    const finalPurpose = purpose === "other"
      ? purposeOther.trim()
      : PURPOSES.find(p => p.id === purpose)?.label

    router.push({
      pathname: "/currency-exchange/confirm-details",
      query: {
        state: encodeURIComponent(JSON.stringify({
          amount: nairaAmount,
          rmbAmount,
          rate,
          purpose: finalPurpose,
          type: "buy",
        })),
      },
    })
  }

  return (
    <div className="min-h-screen bg-black text-white pb-36">
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
          <h1 className="text-white text-[17px] font-semibold">Buy RMB</h1>
        </div>
      </div>

      {/* Amount Input Section */}
      <div className="px-6 pt-2 pb-3">
        <div className="bg-[#1C1C1E] rounded-2xl p-5">
          <p className="text-[#8E8E93] text-[12px] font-medium mb-3">YOU PAY (NGN)</p>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🇳🇬</span>
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
          {nairaAmount > 0 && (
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
                  ¥{rmbAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Balance */}
        <div className="flex items-center justify-between mt-3 px-1">
          <span className="text-[#8E8E93] text-[13px]">Available balance</span>
          <span className="text-[13px] text-white font-medium">
            ₦{nairaWallet.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Purpose */}
      <div className="px-6 pt-1">
        <div className="bg-[#1C1C1E] rounded-2xl p-4">
          <p className="text-[#8E8E93] text-[12px] font-medium mb-3">PURPOSE (REQUIRED)</p>
          <div className="grid grid-cols-3 gap-2">
            {PURPOSES.map(p => (
              <button
                key={p.id}
                onClick={() => setPurpose(p.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                  purpose === p.id
                    ? "bg-[#0A84FF]/15 border border-[#0A84FF]"
                    : "bg-[#2C2C2E] border border-transparent active:bg-[#38383A]"
                }`}
              >
                <span className="text-lg">{p.icon}</span>
                <span className={`text-[11px] font-medium text-center leading-tight ${
                  purpose === p.id ? "text-[#0A84FF]" : "text-white"
                }`}>{p.label}</span>
              </button>
            ))}
          </div>

          {purpose === "other" && (
            <div className="mt-3">
              <input
                type="text"
                value={purposeOther}
                onChange={e => setPurposeOther(e.target.value)}
                placeholder="Describe purpose..."
                className="w-full bg-[#2C2C2E] border border-[#38383A] rounded-xl px-4 py-3 text-[15px] text-white outline-none focus:border-[#0A84FF] transition-colors placeholder:text-[#636366]"
              />
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-[#1C1C1E] rounded-2xl p-4 mt-4 flex gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-[#8E8E93] text-[12px] leading-relaxed">
            Transfers are processed within 2–24 hours. All transactions are final.
          </p>
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
            ? `Continue — ₦${nairaAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} → ¥${rmbAmount.toFixed(2)}`
            : "Enter amount to continue"}
        </button>
      </div>
    </div>
  )
}
