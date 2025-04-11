"use client"

import { useState } from "react"
import { ChevronLeft, Send, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useWallet } from "@/contexts/WalletContext"
import { useToast } from "@/components/ui/use-toast"

export default function TransferPage() {
  const { formattedBalance } = useWallet()
  const { toast } = useToast()
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTransfer = () => {
    if (!amount || !recipient) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Transfer Successful",
        description: `₦${amount} has been transferred to ${recipient}`,
      })

      // Reset form
      setAmount("")
      setRecipient("")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Transfer Funds</h1>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* Wallet Balance */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 rounded-2xl shadow-lg shadow-black/30 mb-6">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm opacity-80">Available Balance:</span>
            <span className="font-bold text-lg">{formattedBalance}</span>
          </div>
        </Card>

        {/* Transfer Form */}
        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="recipient"
                  placeholder="Enter recipient's name or ID"
                  className="pl-10"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="pl-10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleTransfer} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
              {isLoading ? "Processing..." : "Transfer Funds"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

