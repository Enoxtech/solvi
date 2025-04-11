"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileLayout } from "@/components/ProfileLayout"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/contexts/WalletContext"
import { Card } from "@/components/ui/card"

export default function WithdrawFunds() {
  const [amount, setAmount] = useState("")
  const [pin, setPin] = useState("")
  const { formattedBalance } = useWallet()
  const { toast } = useToast()

  const handleWithdraw = () => {
    if (!amount || !pin) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter your 4-digit PIN",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Withdrawal Initiated",
      description: `${formattedBalance} will be sent to your bank account`,
    })
  }

  return (
    <ProfileLayout title="Withdraw Funds" backLink="/profile">
      <div className="p-6 space-y-6">
        {/* Balance Card */}
        <Card className="bg-primary/5 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formattedBalance}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700">
              Amount to Withdraw
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="h-14 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin" className="text-gray-700">
              Transaction PIN
            </Label>
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="Enter 4-digit PIN"
              className="h-14 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg"
            />
          </div>
        </div>

        <Button onClick={handleWithdraw} className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full">
          Withdraw Funds
        </Button>
      </div>
    </ProfileLayout>
  )
}

