"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight, CheckCircle } from "lucide-react"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function KYCVerification() {
  const [tier1Complete] = useState(true)

  return (
    <ProfileLayout title="KYC and Verification" backLink="/profile">
      <div className="p-6 space-y-6">
        {/* Tier 1 Verification */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/profile/kyc/tier1">
            <Card className={cn("relative p-6 hover:bg-gray-50 transition-colors", tier1Complete && "bg-gray-50")}>
              <div className="flex justify-between items-center">
                <div className="space-y-2 pr-8">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900">Tier 1 Verification</h2>
                    {tier1Complete && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">
                    Enter your Bank Verification Number (BVN) to verify your identity and activate your wallet.
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Tier 2 Verification */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link href="/profile/kyc/tier2">
            <Card className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="space-y-2 pr-8">
                  <h2 className="text-xl font-bold text-gray-900">Tier 2 Verification</h2>
                  <p className="text-gray-600">
                    Upload ID, Proof of Address, and other identification documents to further verify your identity
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          </Link>
        </motion.div>
      </div>
    </ProfileLayout>
  )
}

