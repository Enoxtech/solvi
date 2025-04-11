"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Fingerprint, Check, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { hapticFeedback } from "@/utils/haptics"

interface BiometricAuthProps {
  onSuccess: () => void
  onError: (message: string) => void
}

export function BiometricAuth({ onSuccess, onError }: BiometricAuthProps) {
  const [isAvailable, setIsAvailable] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authState, setAuthState] = useState<"idle" | "success" | "error">("idle")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase(),
      )
      setIsMobile(isMobileDevice)
    }

    // Check if biometric auth is available
    const checkBiometricAvailability = () => {
      // In a real app, we would check if the browser supports the Web Authentication API
      // For this demo, we'll simulate availability on mobile devices
      setIsAvailable(isMobile)
    }

    checkMobile()
    checkBiometricAvailability()
  }, [])

  const handleBiometricAuth = async () => {
    if (!isAvailable) {
      onError("Biometric authentication is not available on this device")
      return
    }

    setIsAuthenticating(true)
    setAuthState("idle")
    hapticFeedback.medium()

    try {
      // Simulate biometric authentication
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 80% chance of success for demo purposes
          if (Math.random() > 0.2) {
            resolve(true)
          } else {
            reject(new Error("Fingerprint not recognized"))
          }
        }, 2000)
      })

      // Authentication successful
      setAuthState("success")
      hapticFeedback.success()

      // Wait a moment to show success state before proceeding
      setTimeout(() => {
        onSuccess()
      }, 1000)
    } catch (error) {
      // Authentication failed
      setAuthState("error")
      hapticFeedback.error()
      onError(error instanceof Error ? error.message : "Authentication failed")

      // Reset after showing error
      setTimeout(() => {
        setAuthState("idle")
      }, 2000)
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Don't render anything if not on mobile
  if (!isMobile) return null

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative px-4 text-sm text-white/60 bg-black/40 backdrop-blur-sm">Or use biometric login</div>
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {authState === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white w-48 h-16 rounded-xl"
                onClick={handleBiometricAuth}
                disabled={isAuthenticating || !isAvailable}
              >
                {isAuthenticating ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center">
                    <Fingerprint className="h-6 w-6 mr-2" />
                    <span>Fingerprint</span>
                  </div>
                )}
              </Button>
            </motion.div>
          )}

          {authState === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-green-500/20 border border-green-500/30 text-green-400 w-48 h-16 rounded-xl flex items-center justify-center"
            >
              <Check className="h-6 w-6 mr-2" />
              <span>Verified</span>
            </motion.div>
          )}

          {authState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 w-48 h-16 rounded-xl flex items-center justify-center"
            >
              <AlertCircle className="h-6 w-6 mr-2" />
              <span>Try Again</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

