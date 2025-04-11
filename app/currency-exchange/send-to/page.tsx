"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Users, Upload, AlertCircle, ShieldCheck, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter, useSearchParams } from "next/navigation"
import { QrCodeUploadDialog } from "@/components/QrCodeUploadDialog"
import { WarningAlert } from "@/components/WarningAlert"
import { WarningDialog } from "@/components/WarningDialog"

interface Beneficiary {
  id: string
  name: string
  alipayId: string
  qrCodeUrl: string
}

export default function SendTo() {
  const [alipayId, setAlipayId] = useState("")
  const [alipayName, setAlipayName] = useState("")
  const [saveAsBeneficiary, setSaveAsBeneficiary] = useState(false)
  const [qrCode, setQrCode] = useState<File | null>(null)
  const [qrCodePreview, setQrCodePreview] = useState<string>("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showWarningAlert, setShowWarningAlert] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")
  const [warningTitle, setWarningTitle] = useState("")
  const [warningType, setWarningType] = useState<"error" | "warning" | "info">("warning")
  const [rmbAmount, setRmbAmount] = useState<number>(0)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [warningAction, setWarningAction] = useState<{ label: string; onClick: () => void } | undefined>()

  // Fix the handleShowWarning function to avoid unnecessary re-renders
  const handleShowWarning = (
    title: string,
    message: string,
    type: "error" | "warning" | "info",
    action?: { label: string; onClick: () => void },
  ) => {
    // Only update state if the dialog isn't already open with the same content
    if (!showWarningDialog || title !== warningTitle || message !== warningMessage || type !== warningType) {
      setWarningTitle(title)
      setWarningMessage(message)
      setWarningType(type)
      setWarningAction(action)
      setShowWarningDialog(true)
    }
  }

  // Split the useEffect hooks to avoid dependency cycles
  useEffect(() => {
    // Check if we're loading a beneficiary
    const beneficiaryId = searchParams.get("beneficiary")
    if (beneficiaryId) {
      const stored = localStorage.getItem("beneficiaries")
      if (stored) {
        const beneficiaries: Beneficiary[] = JSON.parse(stored)
        const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId)
        if (beneficiary) {
          setAlipayId(beneficiary.alipayId)
          setAlipayName(beneficiary.name)
          setQrCodePreview(beneficiary.qrCodeUrl)
        }
      }
    }
  }, [searchParams])

  // Separate effect for loading exchange details
  useEffect(() => {
    // Get the RMB amount from exchange details
    const exchangeDetails = localStorage.getItem("exchangeDetails")
    if (exchangeDetails) {
      const parsed = JSON.parse(exchangeDetails)
      if (parsed.rmbAmount) {
        // Convert to number and remove commas
        const amount = Number.parseFloat(parsed.rmbAmount.replace(/,/g, ""))
        setRmbAmount(amount)
      }
    }
  }, [])

  // Modify the useEffect that shows the warning dialog for RMB amounts over 100
  // Replace the existing useEffect for showing warnings based on RMB amount with this improved version:

  useEffect(() => {
    // Only show the warning if:
    // 1. Amount is over 100 RMB
    // 2. No QR code has been uploaded yet
    // 3. User has interacted with the form (don't show immediately on page load)
    // 4. The dialog isn't already open
    if (rmbAmount > 100 && !qrCodePreview && !showWarningDialog && (alipayId || alipayName)) {
      // Instead of showing the dialog immediately, set a flag to show a non-intrusive banner
      setShowWarningAlert(true)
      setWarningType("warning")
      setWarningTitle("Alipay QR Code Required")
      setWarningMessage("Please upload the recipient's Alipay QR code to proceed with transactions above 100 RMB.")
    }
  }, [rmbAmount, qrCodePreview, showWarningDialog, alipayId, alipayName])

  const handleQrCodeUpload = async (option: "camera" | "gallery") => {
    setShowUploadDialog(false)

    // Simulate file selection
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/jpeg,image/png"

    if (option === "camera") {
      input.capture = "environment"
    }

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      // Validate file size - updated limits
      const minSize = 100 * 1024 // 100KB
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (file.size < minSize || file.size > maxSize) {
        setWarningType("error")
        setWarningTitle("Invalid File Size")
        setWarningMessage(`File size must be between 100KB and 5MB. Your file is ${(file.size / 1024).toFixed(0)}KB.`)
        setShowWarningAlert(true)
        return
      }

      // Validate file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setWarningType("error")
        setWarningTitle("Invalid File Type")
        setWarningMessage("Only JPG and PNG files are allowed")
        setShowWarningAlert(true)
        return
      }

      const previewUrl = URL.createObjectURL(file)
      setQrCodePreview(previewUrl)
      setQrCode(file)

      toast({
        title: "QR Code uploaded",
        description: "Your QR code has been successfully uploaded",
      })
    }

    input.click()
  }

  const handleNext = () => {
    // Validate inputs but allow proceeding
    if (!alipayId) {
      handleShowWarning("Missing Alipay ID", "Please enter the recipient's Alipay ID", "warning")
      return
    }

    if (!alipayName) {
      handleShowWarning("Missing Alipay Name", "Please enter the recipient's Alipay Name", "warning")
      return
    }

    // Modify the handleNext function to show the dialog only when trying to proceed without a QR code
    // Replace the existing check for QR code in handleNext with this:

    // For amounts above 100 RMB, show warning but don't block
    if (rmbAmount > 100 && !qrCodePreview) {
      handleShowWarning(
        "QR Code Required",
        "For transactions above 100 RMB, you must upload a QR code. Would you like to upload one now?",
        "warning",
        {
          label: "Upload QR Code",
          onClick: () => {
            setShowUploadDialog(true)
          },
        },
      )
      return
    }

    if (saveAsBeneficiary) {
      // Save to beneficiaries
      const newBeneficiary: Beneficiary = {
        id: Date.now().toString(),
        name: alipayName,
        alipayId,
        qrCodeUrl: qrCodePreview,
      }

      const stored = localStorage.getItem("beneficiaries")
      const beneficiaries: Beneficiary[] = stored ? JSON.parse(stored) : []
      beneficiaries.push(newBeneficiary)
      localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries))

      toast({
        title: "Beneficiary Saved",
        description: "The recipient has been saved to your beneficiaries",
      })
    }

    // Store the current transaction details
    const transactionDetails = {
      alipayId,
      alipayName,
      qrCodePreview,
    }
    localStorage.setItem("currentTransaction", JSON.stringify(transactionDetails))

    // Navigate to confirm details
    router.push("/currency-exchange/confirm-details")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80 pb-24">
      {/* Warning Alert */}
      <WarningAlert
        type={warningType}
        title={warningTitle}
        message={warningMessage}
        show={showWarningAlert}
        onDismiss={() => setShowWarningAlert(false)}
      />

      {/* Warning Dialog */}
      <WarningDialog
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
        title={warningTitle}
        message={warningMessage}
        type={warningType}
        action={warningAction}
      />

      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/currency-exchange" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Send To</h1>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-white/80 cursor-help">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm">Secure</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your information is encrypted and secure</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Beneficiaries Selection */}
          <Link href="/currency-exchange/beneficiaries">
            <Card className="bg-white/90 backdrop-blur-md p-4 rounded-2xl transition-all duration-300 border-0 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Select from Beneficiaries</h2>
                    <p className="text-sm text-gray-600">Send RMB to saved beneficiaries</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          </Link>

          {/* Form Fields */}
          <Card className="bg-white/90 backdrop-blur-md p-6 rounded-2xl space-y-8 border-0 shadow-lg shadow-black/20">
            {/* Alipay ID */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="alipayId" className="text-lg font-semibold text-gray-800">
                  Alipay ID
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the recipient's Alipay ID. This can be found in their Alipay profile settings.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="alipayId"
                value={alipayId}
                onChange={(e) => setAlipayId(e.target.value)}
                placeholder="Enter AliPay ID"
                className="h-14 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg text-gray-800 placeholder-gray-400 transition-all focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* Alipay Name */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="alipayName" className="text-lg font-semibold text-gray-800">
                  Alipay Full Name/Nickname
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Enter the name exactly as it appears on the recipient's international passport and Alipay
                        account.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-gray-500 italic">As it appears on associated intl. passport</p>
              <Input
                id="alipayName"
                value={alipayName}
                onChange={(e) => setAlipayName(e.target.value)}
                placeholder="Enter Alipay Full Name/Nickname"
                className="h-14 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg text-gray-800 placeholder-gray-400 transition-all focus:bg-white focus:border-blue-500"
              />
            </div>

            {/* QR Code Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-lg font-semibold text-gray-800">Alipay QR Code</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Upload the recipient's Alipay QR code. You can scan it directly or choose from your gallery.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="flex gap-6 items-start cursor-pointer" onClick={() => setShowUploadDialog(true)}>
                  <div
                    className={cn(
                      "group relative w-32 h-32 rounded-xl border-2 border-dashed transition-all duration-300",
                      "flex items-center justify-center overflow-hidden",
                      qrCodePreview
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 bg-white hover:border-primary hover:bg-primary/5",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {qrCodePreview ? (
                        <>
                          <motion.img
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            src={qrCodePreview}
                            alt="QR Code preview"
                            className="w-full h-full object-contain rounded-lg p-2"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <motion.div
                          key="upload"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
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
                    </AnimatePresence>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">File Requirements:</h4>
                    <ul className="space-y-2">
                      {[
                        { text: "Minimum size: 100KB", met: qrCode ? qrCode.size >= 100 * 1024 : false },
                        { text: "Maximum size: 5MB", met: qrCode ? qrCode.size <= 5 * 1024 * 1024 : false },
                        {
                          text: "Formats: JPG, PNG",
                          met: qrCode ? ["image/jpeg", "image/png"].includes(qrCode.type) : false,
                        },
                      ].map((req, i) => (
                        <motion.li
                          key={i}
                          initial={false}
                          animate={{ color: req.met ? "#22c55e" : "#6b7280" }}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-colors",
                              req.met ? "bg-green-500" : "bg-gray-400",
                            )}
                          />
                          {req.text}
                        </motion.li>
                      ))}
                    </ul>

                    {/* QR Code requirement notice */}
                    {rmbAmount > 100 && (
                      <div className="mt-4 text-sm text-red-500 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                        <p>QR code is required for transactions above 100 RMB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save as Beneficiary */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="beneficiary"
                checked={saveAsBeneficiary}
                onCheckedChange={(checked) => setSaveAsBeneficiary(checked as boolean)}
                className="h-5 w-5 rounded-md border-2 border-gray-300 text-blue-500"
              />
              <Label htmlFor="beneficiary" className="text-lg font-medium cursor-pointer select-none text-gray-800">
                Save as Beneficiary
              </Label>
            </div>
          </Card>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            className={cn(
              "w-full py-6 text-lg font-medium rounded-full",
              "bg-white text-primary hover:bg-white/90",
              "shadow-lg hover:shadow-xl transition-all duration-300",
            )}
          >
            Next
          </Button>
        </motion.div>
      </main>

      {/* QR Code Upload Dialog */}
      <QrCodeUploadDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        onSelectOption={handleQrCodeUpload}
      />
    </div>
  )
}

