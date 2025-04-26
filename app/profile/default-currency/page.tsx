"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Rocket } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useCurrency } from "@/contexts/CurrencyContext"
import { type Currency } from "@/stores/walletStore"
import { NewFeatureBadge } from "@/components/NewFeatureBadge"
import { PageBackground } from "@/components/PageBackground"

const currencyOptions = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
]

export default function DefaultCurrencyPage() {
  const router = useRouter()
  const { currency, setCurrency } = useCurrency()
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    setSelectedCurrency(currency)
  }, [currency])

  const handleSave = () => {
    setCurrency(selectedCurrency)
    setShowSuccess(true)
  }

  const handleClose = () => {
    setShowSuccess(false)
    router.back()
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <PageBackground />
      <div className="relative z-10 flex-1 p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white ml-2">Default Currency</h1>
          <NewFeatureBadge featureId="default-currency" className="ml-2" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden border-0 p-6">
            <div className="space-y-6">
              <div>
                <p className="text-gray-700 mb-2 font-medium">Select your preferred currency</p>
                <Select value={selectedCurrency} onValueChange={(value) => setSelectedCurrency(value as Currency)}>
                  <SelectTrigger className="w-full bg-white/70 backdrop-blur-sm border-gray-200 hover:bg-white/90 transition-colors">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map(({ code, name, symbol }) => (
                      <SelectItem key={code} value={code}>
                        <div className="flex items-center">
                          <span className="font-medium">{symbol}</span>
                          <span className="ml-2 font-medium">{code}</span>
                          <span className="ml-2 text-gray-500 text-sm">- {name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-6">
                  This currency will be used as your default for transactions and balance displays throughout the app.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="bg-white/95 backdrop-blur-md border-0 rounded-2xl max-w-xs mx-auto">
            <DialogHeader className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle className="text-center text-2xl font-bold text-gray-900">Success!</DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Your default currency has been successfully updated to{" "}
                {currencyOptions.find((c) => c.code === selectedCurrency)?.symbol} ({selectedCurrency})
              </DialogDescription>
            </DialogHeader>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl mt-4"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

