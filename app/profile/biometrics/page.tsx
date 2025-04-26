"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Fingerprint, Shield, AlertTriangle } from "lucide-react"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"

export default function BiometricsPage() {
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false)
  const { toast } = useToast()

  const handleToggleBiometrics = async () => {
    try {
      // Here you would typically check if the device supports biometrics
      // and handle the biometric enrollment process
      setIsBiometricsEnabled(!isBiometricsEnabled)
      toast({
        title: isBiometricsEnabled ? "Biometrics Disabled" : "Biometrics Enabled",
        description: isBiometricsEnabled
          ? "Biometric authentication has been disabled"
          : "Biometric authentication has been enabled for your account",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle biometric authentication",
        variant: "destructive",
      })
    }
  }

  return (
    <ProfileLayout title="Manage Biometrics" backLink="/profile">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto p-10 space-y-6 mt-10 mb-10">
        {/* Main Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-nebula-glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Fingerprint className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Biometric Authentication</h2>
                  <p className="text-sm text-white/80">Use your fingerprint or face ID to secure your account</p>
                </div>
              </div>
              <Switch
                checked={isBiometricsEnabled}
                onCheckedChange={handleToggleBiometrics}
                className="data-[state=checked]:bg-white data-[state=checked]:text-primary"
              />
            </div>
          </Card>
        </motion.div>

        {/* Security Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 border-l-4 border-l-green-500 shadow-nebula">
            <div className="flex gap-4">
              <Shield className="h-6 w-6 text-green-500 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Enhanced Security</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Biometric authentication adds an extra layer of security to your account, making it harder for
                  unauthorized users to access your information.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Warning */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 border-l-4 border-l-amber-500 bg-amber-50 shadow-nebula">
            <div className="flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Important Note</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Biometric data is stored securely on your device and is never transmitted to our servers. You can
                  disable this feature at any time.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </ProfileLayout>
  )
}

