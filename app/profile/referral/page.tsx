"use client"

import { useState } from "react"
import { Copy, Share2, Gift, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileLayout } from "@/components/ProfileLayout"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"

export default function ReferralPage() {
  const [referralCode] = useState("ITOPA1234")
  const { toast } = useToast()

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Velocia",
        text: `Use my referral code ${referralCode} to sign up for Velocia and get ₦1,000 bonus!`,
        url: `https://velocia.app/register?ref=${referralCode}`,
      })
    } else {
      handleCopyCode()
      toast({
        title: "Share",
        description: "Copy the link and share it with your friends",
      })
    }
  }

  return (
    <ProfileLayout title="Refer & Earn" backLink="/profile">
      <div className="p-6 space-y-6">
        {/* Referral Banner */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Refer & Earn ₦1,000</h2>
              <p className="mt-2 text-white/90">
                Invite your friends to join Velocia and earn ₦1,000 when they make their first deposit.
              </p>
            </div>
          </div>
        </Card>

        {/* Referral Code */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium">Your Referral Code</label>
          <div className="flex gap-2">
            <Input value={referralCode} readOnly className="bg-gray-50 text-gray-900 font-medium text-center text-lg" />
            <Button onClick={handleCopyCode} className="bg-primary hover:bg-primary/90 text-white">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Share Button */}
        <Button onClick={handleShare} className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full">
          <Share2 className="mr-2 h-5 w-5" />
          Share Referral Code
        </Button>

        {/* How it works */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">How it works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Share your code</h4>
                <p className="text-sm text-gray-600">Share your unique referral code with friends and family</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">They sign up</h4>
                <p className="text-sm text-gray-600">Your friend creates an account using your referral code</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">They make a deposit</h4>
                <p className="text-sm text-gray-600">Your friend makes their first deposit</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-900">You get rewarded</h4>
                <p className="text-sm text-gray-600">You receive ₦1,000 in your wallet automatically</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Stats */}
        <Card className="bg-gray-50 p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Total Referrals</p>
              <p className="text-xl font-bold text-gray-900">0</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-primary/10">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Total Earned</p>
              <p className="text-xl font-bold text-gray-900">₦0</p>
            </div>
          </div>
        </Card>
      </div>
    </ProfileLayout>
  )
}

