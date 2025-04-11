"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface UploadedFile {
  type: string
  file: File
}

const idTypes = [
  { value: "national-id", label: "National Identification Number" },
  { value: "drivers-license", label: "Driver's License" },
  { value: "voters-card", label: "Voter's License" },
]

export default function Tier2Verification() {
  const [selectedIdType, setSelectedIdType] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const { toast } = useToast()

  const handleFileUpload = (type: string, file: File) => {
    // Validate file
    if (file.size > 6 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 6MB",
        variant: "destructive",
      })
      return
    }

    // Check dimensions
    const img = document.createElement('img')
    img.onload = () => {
      if (img.width < 800 || img.height < 800) {
        toast({
          title: "Image too small",
          description: "Minimum size is 800 x 800 pixels",
          variant: "destructive",
        })
        return
      }

      setUploadedFiles((prev) => [...prev.filter((f) => f.type !== type), { type, file }])
      toast({
        title: "File uploaded",
        description: `${type} document uploaded successfully`,
      })
    }
    img.src = URL.createObjectURL(file)
  }

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one document",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Documents submitted",
      description: "Your documents have been submitted for verification",
    })
  }

  const UploadCard = ({ type, description }: { type: string; description?: string }) => (
    <div className="space-y-2">
      <Card className="bg-gray-50 p-6">
        <label className="block cursor-pointer">
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(type, file)
            }}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-full h-32 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
              {uploadedFiles.find((f) => f.type === type) ? (
                <Image 
                  src={URL.createObjectURL(uploadedFiles.find((f) => f.type === type)!.file) || "/placeholder.svg"}
                  alt={`${type} preview`}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <div className="text-center">
                  <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload {type}</span>
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Minimum size: 800 x 800 pixels</p>
                <p>• Aspect Ratio: 1:1</p>
                <p>• Formats: JPG, PNG</p>
                <p>• Maximum File Size: 6MB</p>
              </div>
            </div>
          </div>
        </label>
      </Card>
    </div>
  )

  return (
    <ProfileLayout title="Upload ID Documents" backLink="/profile/kyc">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upload ID Documents</h2>
          <p className="text-gray-600 mt-1">Kindly upload all documents</p>
        </div>

        <div className="space-y-8">
          {/* Proof of Address */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Proof of address</h3>
            <UploadCard type="Proof of address" description="Upload a recent utility bill or bank statement" />
          </div>

          {/* ID Upload with Dropdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Upload ID</h3>
            <Select value={selectedIdType} onValueChange={setSelectedIdType}>
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 h-14 text-gray-900">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                {idTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedIdType && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <UploadCard type={idTypes.find((t) => t.value === selectedIdType)?.label || ""} />
              </motion.div>
            )}
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full">
          Submit
        </Button>
      </div>
    </ProfileLayout>
  )
}

