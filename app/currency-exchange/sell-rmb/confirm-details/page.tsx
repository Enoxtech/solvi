"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/stores/walletStore"

export default function SellConfirmDetailsPage({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const resolvedParams = use(searchParams)
  const router = useRouter()
  const { nairaWallet, rmbWallet, creditNaira, debitRmb } = useWalletStore()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [txId] = useState(() => `SELL${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`)

  const [txData, setTxData] = useState<{
    amount: number
    rmbAmount: number
    rate: number
    type: "sell"
  } | null>(null)

  useEffect(() => {
    if (resolvedParams.state) {
      try {
        setTxData(JSON.parse(decodeURIComponent(resolvedParams.state)))
      } catch {
        router.replace("/currency-exchange/sell-rmb")
      }
    } else {
      router.replace("/currency-exchange/sell-rmb")
    }
  }, [resolvedParams.state, router])

  if (!txData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0A84FF] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const { amount, rmbAmount, rate } = txData
  const insufficientBalance = rmbAmount > rmbWallet.balance

  const handleConfirm = async () => {
    if (insufficientBalance) return
    setLoading(true)
    // Simulate processing
    await new Promise(r => setTimeout(r, 2200))
    debitRmb(rmbAmount)
    creditNaira(amount)
    setLoading(false)
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col px-6">
        {/* Status Bar */}
        <div className="h-11 flex items-end pb-1 px-6">
          <span className="text-white text-[15px] font-semibold">9:41</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          <div className="w-20 h-20 rounded-full bg-[#30D158]/15 border border-[#30D158]/30 flex items-center justify-center mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#30D158" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold text-white mb-2">Transfer Submitted!</h1>
          <p className="text-[#8E8E93] text-[15px] text-center max-w-xs leading-relaxed">
            We've received your transfer details. We'll verify and send NGN to your account within 5–30 minutes.
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-[#1C1C1E] rounded-2xl p-5 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#38383A]">
              <span className="text-[#8E8E93] text-[13px]">Reference</span>
              <span className="text-[13px] font-mono text-white">{txId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Status</span>
              <span className="text-[13px] font-semibold text-[#FF9F0A] bg-[#FF9F0A]/15 px-2.5 py-1 rounded-full">
                Processing
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">RMB sold</span>
              <span className="text-[15px] font-semibold text-white">
                ¥{rmbAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Naira received</span>
              <span className="text-[15px] font-semibold text-[#30D158]">
                ₦{amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Rate</span>
              <span className="text-[13px] font-medium text-white">₦{rate.toFixed(2)}/¥</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Processing time</span>
              <span className="text-[13px] font-medium text-white">Within 30 minutes</span>
            </div>
          </div>
        </div>

        <div className="pb-8 space-y-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-[18px] bg-[#0A84FF] rounded-2xl text-[17px] font-semibold active:bg-[#0070E0] transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => router.push("/currency-exchange")}
            className="w-full py-3 text-[#8E8E93] text-[15px] active:text-white transition-colors"
          >
            Make another exchange
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-36">
      {/* Status Bar */}
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
          <h1 className="text-white text-[17px] font-semibold">Confirm Sale</h1>
        </div>
      </div>

      {/* Transfer Summary */}
      <div className="px-6 pt-1">
        <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden">
          {/* You send */}
          <div className="p-5">
            <p className="text-[#8E8E93] text-[12px] font-medium mb-3">YOU SELL</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇨🇳</span>
              <div>
                <p className="text-[28px] font-bold text-white">
                  ¥{rmbAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[#8E8E93] text-[13px]">Chinese Yuan</p>
              </div>
            </div>
          </div>

          {/* Divider with arrow */}
          <div className="flex items-center justify-center py-2">
            <div className="w-8 h-8 rounded-full bg-[#0A84FF]/15 border border-[#0A84FF]/30 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* You receive */}
          <div className="px-5 pb-5">
            <p className="text-[#8E8E93] text-[12px] font-medium mb-3">YOU RECEIVE</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇳🇬</span>
              <div>
                <p className="text-[28px] font-bold text-[#30D158]">
                  ₦{amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[#8E8E93] text-[13px]">Nigerian Naira</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-[#1C1C1E] rounded-2xl p-4 mt-3">
          <p className="text-[#8E8E93] text-[12px] font-medium mb-3">TRANSACTION DETAILS</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Exchange rate</span>
              <span className="text-[13px] font-medium text-white">₦{rate.toFixed(2)} / ¥1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Processing time</span>
              <span className="text-[13px] font-medium text-white">Within 30 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#8E8E93] text-[13px]">Status</span>
              <span className="text-[12px] font-semibold text-[#FF9F0A] bg-[#FF9F0A]/15 px-2.5 py-1 rounded-full">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#1C1C1E] rounded-2xl p-4 mt-3 flex gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" strokeWidth="2" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <p className="text-[#8E8E93] text-[12px] leading-relaxed">
            After confirming, we'll show you our WeChat/Alipay details to receive your RMB transfer. Once confirmed, NGN will be sent to your wallet.
          </p>
        </div>

        {/* Insufficient balance */}
        {insufficientBalance && (
          <div className="bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-2xl p-4 mt-3 flex gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF453A" strokeWidth="2" className="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-[#FF453A] text-[13px]">
              Insufficient RMB balance. You need ¥{rmbAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} but have ¥{rmbWallet.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Confirm */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-[#38383A] p-4 pb-8">
        <button
          onClick={handleConfirm}
          disabled={loading || insufficientBalance}
          className={`w-full py-[18px] rounded-2xl text-[17px] font-semibold flex items-center justify-center gap-2 transition-all ${
            loading || insufficientBalance
              ? "bg-[#2C2C2E] text-[#636366]"
              : "bg-[#0A84FF] text-white active:bg-[#0070E0]"
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Confirm & Send RMB Details
            </>
          )}
        </button>
      </div>
    </div>
  )
}
