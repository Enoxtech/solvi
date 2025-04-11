"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, Upload, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function SendTo() {
  const [alipayId, setAlipayId] = useState("")
  const [alipayName, setAlipayName] = useState("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [qrCode, setQrCode] = useState<File | null>(null)
  const [qrCodePreview, setQrCodePreview] = useState<string>("")
  const { toast } = useToast()

  const handleQrCodeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file size
      if (file.size > 6 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 6MB",
          variant: "destructive",
        })
        return
      }

      // Validate minimum file size (3MB)
      if (file.size < 3 * 1024 * 1024) {
        toast({
          title: "File too small",
          description: "Minimum file size is 3MB",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png"]
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPG and PNG files are allowed",
          variant: "destructive",
        })
        return
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setQrCodePreview(previewUrl)
      setQrCode(file)

      toast({
        title: "QR Code uploaded",
        description: "Your QR code has been successfully uploaded",
      })

      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      })
    }
  }

  const handleNext = () => {
    if (!alipayId || !alipayName || !qrCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    // Handle form submission
    toast({
      title: "Processing",
      description: "Your request is being processed",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/90 to-primary/80">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center">
          <Link href="/currency-exchange" className="p-2">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold ml-2">Send To</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Beneficiaries Card */}
          <Link href="/currency-exchange/beneficiaries">
            <Card className="bg-emerald-50/95 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between hover:bg-emerald-50 transition-colors border-0 shadow-lg hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Select from Beneficiaries</h2>
                  <p className="text-sm text-gray-600">Send RMB to saved beneficiaries</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Card>
          </Link>

          {/* Form Card */}
          <Card className="bg-white/95 backdrop-blur-md p-6 rounded-2xl space-y-8 border-0 shadow-lg">
            {/* Alipay ID */}
            <div className="space-y-2">
              <Label htmlFor="alipayId" className="text-lg font-semibold flex items-center gap-2">
                Alipay ID
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <Input
                id="alipayId"
                value={alipayId}
                onChange={(e) => setAlipayId(e.target.value)}
                placeholder="Enter AliPay ID"
                className="h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-lg transition-colors focus:border-primary/20"
              />
            </div>

            {/* Alipay Name */}
            <div className="space-y-2">
              <Label htmlFor="alipayName" className="text-lg font-semibold flex items-center gap-2">
                Alipay Full Name/Nickname
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <p className="text-sm text-gray-500 italic">As it appears on associated intl. passport</p>
              <Input
                id="alipayName"
                value={alipayName}
                onChange={(e) => setAlipayName(e.target.value)}
                placeholder="Enter Alipay Full Name/Nickname"
                className="h-14 bg-gray-50 border-2 border-gray-100 rounded-xl text-lg transition-colors focus:border-primary/20"
              />
            </div>

            {/* QR Code Upload */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                Alipay QR Code
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <div className="bg-gray-50 rounded-xl p-6">
                <label className="block">
                  <input type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleQrCodeUpload} />
                  <div className="flex gap-6 items-start">
                    <div
                      className={cn(
                        "w-32 h-32 rounded-xl border-2 border-dashed transition-all duration-300 flex items-center justify-center cursor-pointer",
                        qrCodePreview
                          ? "border-primary/20 bg-primary/5"
                          : "border-gray-200 bg-white hover:border-primary/20 hover:bg-primary/5",
                      )}
                    >
                      {qrCodePreview ? (
                        <motion.img
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          src={qrCodePreview}
                          alt="QR Code preview"
                          className="w-full h-full object-contain rounded-lg p-2"
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-500 text-center">
                            Upload Alipay
                            <br />
                            QR Code
                          </span>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-700 mb-2">File Requirements:</h4>
                      <ul className="space-y-1 text-sm text-gray-500">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400" />
                          Minimum size: 3MB
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400" />
                          Formats: JPG, PNG
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400" />
                          Maximum File Size: 6MB
                        </li>
                      </ul>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Save as Beneficiary */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="beneficiary"
                checked={saveAsBeneficiary}
                onCheckedChange={(checked) => setSaveAsBeneficiary(checked as boolean)}
                className="h-5 w-5 rounded-md border-2 border-gray-200 text-primary"
              />
              <Label htmlFor="beneficiary" className="text-lg font-medium cursor-pointer">
                Save as Beneficiary
              </Label>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary to-primary/95 backdrop-blur-md border-t border-white/10">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={handleNext}
            className={cn(
              "w-full py-6 text-lg font-medium rounded-full",
              "bg-white text-primary hover:bg-white/90",
              "shadow-lg hover:shadow-xl transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            disabled={!alipayId || !alipayName || !qrCode}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

