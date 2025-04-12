"use client"

import { motion } from "framer-motion"
import { Mail, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function BankDetails() {
  const { toast } = useToast()

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@solvi.app"
    toast({
      title: "Email Client Opened",
      description: "Opening your default email client",
    })
  }

  return (
    <ProfileLayout title="Bank Details" backLink="/profile">
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gray-50 p-6 space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Name:</h3>
                <p className="text-lg font-semibold text-gray-900">ABUBAKAR ABBAS ITOPA</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bank Name:</h3>
                <p className="text-lg font-semibold text-gray-900">Guaranty Trust Bank</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Number:</h3>
                <p className="text-lg font-semibold text-gray-900">004863244</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-primary text-white p-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 mt-1 shrink-0" />
              <div>
                <h2 className="text-xl font-semibold">Want to Change Bank Account?</h2>
                <p className="text-white/90 mt-2">
                  For security purposes, please contact our support team to update your bank account details.
                </p>
                <p className="text-white/90 mt-1">We typically respond within 1-2 business hours.</p>
              </div>
            </div>
            <Button onClick={handleEmailSupport} className="w-full bg-white text-primary hover:bg-white/90 mt-2">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </Card>
        </motion.div>
      </div>
    </ProfileLayout>
  )
}

