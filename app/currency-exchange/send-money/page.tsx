"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function SendMoney() {
  const [recipientName, setRecipientName] = useState("")
  const [recipientAccount, setRecipientAccount] = useState("")
  const [platform, setPlatform] = useState("")
  const [amount, setAmount] = useState("")
  const { toast } = useToast()

  const handleConfirm = () => {
    // Here you would typically make an API call to process the transaction
    toast({
      title: "Transaction Initiated",
      description: `Sending ${amount} RMB to ${recipientName}`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Send Money</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recipient Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientAccount">Recipient Account</Label>
              <Input
                id="recipientAccount"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                placeholder="Enter recipient's account number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alipay">Alipay</SelectItem>
                  <SelectItem value="wechat">WeChat Pay</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (RMB)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in RMB"
              />
            </div>

            <Button onClick={handleConfirm} className="w-full">
              Confirm Transfer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

