"use client"

import { useState } from "react"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/contexts/WalletContext"

export default function WithdrawFundsPage() {
  const [amount, setAmount] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const { formattedBalance } = useWallet()

  const handleWithdraw = () => {
    // Implement withdrawal logic here
    toast({
      title: "Withdrawal Initiated",
      description: `₦${amount} will be sent to your linked bank account.`,
    })
  }

  return (
    <ProfileLayout title="Withdraw Funds" backLink="/wallet">
      <div className="p-6 space-y-6">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-2xl font-bold text-primary">{formattedBalance}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/50 border-gray-200"
            />
          </div>
        </div>

        <Button onClick={handleWithdraw} className="w-full bg-primary hover:bg-primary/90">
          Withdraw
        </Button>
      </div>
    </ProfileLayout>
  )
}

