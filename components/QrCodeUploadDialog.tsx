"use client"

import { Camera, ImageIcon, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface QrCodeUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectOption: (option: "camera" | "gallery") => void
}

export function QrCodeUploadDialog({ open, onOpenChange, onSelectOption }: QrCodeUploadDialogProps) {
  const handleSelectOption = (option: "camera" | "gallery") => {
    onSelectOption(option)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-lg rounded-xl sm:rounded-xl border-0 shadow-xl overflow-hidden backdrop-blur-md bg-white/95">
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary/95 to-blue-600/95 backdrop-blur-md text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upload QR Code</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-6 bg-white/95 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectOption("camera")}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/10 hover:border-primary/20"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="h-7 w-7 text-primary" />
              </div>
              <span className="font-medium text-gray-900">Camera</span>
              <span className="text-xs text-gray-500">Take a photo of the QR code</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectOption("gallery")}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors border border-primary/10 hover:border-primary/20"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="h-7 w-7 text-primary" />
              </div>
              <span className="font-medium text-gray-900">Gallery</span>
              <span className="text-xs text-gray-500">Choose from your photos</span>
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

