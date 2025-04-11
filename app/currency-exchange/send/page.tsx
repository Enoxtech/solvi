"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function SendTo() {
  const [alipayId, setAlipayId] = useState("")
  const [alipayName, setAlipayName] = useState("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [qrCode, setQrCode] = useState<File | null>(null)

  const handleQrCodeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 6 * 1024 * 1024) {
        alert("File size exceeds 6MB limit")
        return
      }
      if (![".jpg", ".jpeg", ".png"].some((ext) => file.name.toLowerCase().endsWith(ext))) {
        alert("Only JPG and PNG files are allowed")
        return
      }
      setQrCode(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/90 to-primary/80">
      {/* Header */}
      <header className="flex items-center p-4 text-white">
        <Link href="/currency-exchange" className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold ml-4">Send To</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 pb-32 max-w-lg mx-auto">
        <div className="space-y-6">
          {/* Select Beneficiary Card */}
          <Link href="/currency-exchange/beneficiaries">
            <Card className="bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between hover:bg-white/90 transition-colors">
              <div className="flex items-center gap-4">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold text-gray-900">Select from Beneficiaries</h2>
                  <p className="text-sm text-gray-500">Send RMB to saved beneficiaries</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Card>
          </Link>

          {/* Form Card */}
          <Card className="bg-white/95 backdrop-blur-md p-6 rounded-2xl space-y-6">
            {/* Alipay ID */}
            <div className="space-y-2">
              <Label htmlFor="alipayId">Alipay ID</Label>
              <Input
                id="alipayId"
                value={alipayId}
                onChange={(e) => setAlipayId(e.target.value)}
                placeholder="Enter AliPay ID"
                className="bg-gray-100 border-0"
              />
            </div>

            {/* Alipay Name */}
            <div className="space-y-2">
              <Label htmlFor="alipayName">
                Alipay Full Name/Nickname
                <span className="block text-sm text-gray-500 font-normal">
                  (As it appears on associated intl. passport)
                </span>
              </Label>
              <Input
                id="alipayName"
                value={alipayName}
                onChange={(e) => setAlipayName(e.target.value)}
                placeholder="Enter Alipay Full Name/Nickname"
                className="bg-gray-100 border-0"
              />
            </div>

            {/* QR Code Upload */}
            <div className="space-y-2">
              <Label>Alipay QR Code</Label>
              <div className="bg-gray-100 rounded-lg p-4">
                <label className="block">
                  <input type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleQrCodeUpload} />
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-32 h-32 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      {qrCode ? (
                        <img
                          src={URL.createObjectURL(qrCode) || "/placeholder.svg"}
                          alt="QR Code preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-500 text-center">
                      <p>Minimum size: 3mb</p>
                      <p>Formats: .JPG, .PNG</p>
                      <p>Maximum File Size: 6MB</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Save as Beneficiary */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="beneficiary"
                checked={saveAsBeneficiary}
                onCheckedChange={(checked) => setSaveAsBeneficiary(checked as boolean)}
              />
              <Label htmlFor="beneficiary" className="font-normal">
                Save as Beneficiary
              </Label>
            </div>
          </Card>

          {/* Next Button */}
          <Button
            className={cn(
              "w-full py-6 text-lg font-medium rounded-full",
              "bg-primary text-white hover:bg-primary/90",
              "shadow-lg hover:shadow-xl transition-all duration-300",
            )}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  )
}

