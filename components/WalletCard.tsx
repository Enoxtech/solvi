"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Wallet, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useWalletStore } from "@/stores/walletStore"
import { useToast } from "@/components/ui/use-toast"

export function WalletCard() {
  const { getFormattedBalance, openFundWalletDialog } = useWalletStore()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()
  const formattedBalance = getFormattedBalance()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Balance Updated",
      description: "Your wallet balance has been refreshed.",
    })
  }

  return (
    <Card className="bg-gradient-to-br from-primary via-primary/90 to-blue-600/80 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="h-6 w-6 text-white hover:text-white/80 hover:bg-white/10"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Wallet className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formattedBalance}</div>
        <p className="text-xs text-white/70 mt-1">Updated just now</p>
        <Button
          onClick={openFundWalletDialog}
          variant="secondary"
          className="mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          <Plus className="mr-2 h-4 w-4" /> Fund Wallet
        </Button>
      </CardContent>
    </Card>
  )
}

