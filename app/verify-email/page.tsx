"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageBackground } from "@/components/PageBackground"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error")
        setError("Missing verification token")
        return
      }

      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Verification failed")
        }

        setStatus("success")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "An error occurred during verification")
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <div className="relative min-h-screen flex flex-col">
      <PageBackground />
      <div className="relative z-10 flex-1 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-white">Email Verification</CardTitle>
                <CardDescription className="text-blue-100/70">
                  {status === "loading" && "Verifying your email..."}
                  {status === "success" && "Email verified successfully!"}
                  {status === "error" && "Verification failed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  {status === "loading" && (
                    <>
                      <Loader2 className="h-12 w-12 text-blue-400 animate-spin mb-4" />
                      <p className="text-blue-100/70">Please wait while we verify your email...</p>
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <CheckCircle2 className="h-12 w-12 text-green-400 mb-4" />
                      <p className="text-green-400">Your email has been verified successfully!</p>
                      <p className="text-blue-100/70 mt-2">Redirecting to login...</p>
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <XCircle className="h-12 w-12 text-red-400 mb-4" />
                      <p className="text-red-400">{error}</p>
                      <Button
                        onClick={() => router.push("/login")}
                        className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300"
                      >
                        Back to Login
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 