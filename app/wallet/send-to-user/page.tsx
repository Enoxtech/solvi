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
import { motion } from "framer-motion"

export default function SendToUserPage() {
  const { formattedBalance } = useWallet()
  const { toast } = useToast()
  const [userId, setUserId] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userFound, setUserFound] = useState<null | { name: string; id: string }>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!userId) {
      toast({
        title: "Missing User ID",
        description: "Please enter a User ID to search",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      // Mock user found
      if (userId.toLowerCase() === "itopa1234") {
        setUserFound({ name: "Itopa Abubakar", id: "itopa1234" })
      } else {
        toast({
          title: "User not found",
          description: "No user found with that ID",
          variant: "destructive",
        })
        setUserFound(null)
      }
    }, 1500)
  }

  const handleSend = () => {
    if (!userFound) {
      toast({
        title: "User not found",
        description: "Please search for a valid user ID first",
        variant: "destructive",
      })
      return
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
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
        description: `₦${amount} has been sent to ${userFound.name}`,
      })

      // Reset form
      setUserId("")
      setAmount("")
      setUserFound(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/wallet" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Send to User</h1>
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

        {/* User Search */}
        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Find User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-gray-700">
                User ID
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="userId"
                    placeholder="Enter user ID"
                    className="pl-10"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>

            {/* User Found Result */}
            {userFound && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 p-4 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{userFound.name}</h3>
                    <p className="text-sm text-gray-600">ID: {userFound.id}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Amount Form */}
        {userFound && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-gray-700">
                    Amount
                  </Label>
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

                <Button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading ? "Processing..." : "Send Money"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  )
}

