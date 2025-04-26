"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mail, Check, Loader2, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { hapticFeedback } from "@/utils/haptics"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { PageBackground } from "@/components/PageBackground"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // For the animated background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number; color: string }>
  >([])

  useEffect(() => {
    // Create animated bubbles with optimized performance
    const newBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100, // Reduced size range
      speed: Math.random() * 3 + 1, // Reduced speed
      color: `hsl(${Math.random() * 360}, 80%, 65%, 0.25)`, // Reduced opacity
    }))
    setBubbles(newBubbles)

    // Optimized parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setMousePosition({
        x: (x - 0.5) * 20, // Reduced movement
        y: (y - 0.5) * 20,
      })
    }

    // Only add mousemove listener for non-mobile devices
    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <PageBackground />
      <div className="relative z-10 flex-1 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <button
              onClick={() => router.push("/login")}
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Login</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
                    <p className="text-blue-100/70">
                      Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                  </div>

                  <Card className="border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                    <CardContent className="pt-6 px-6 pb-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/80">Email Address</label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                            />
                            <motion.span
                              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                              initial={{ width: 0 }}
                              animate={{ width: email ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 py-6 rounded-full"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <div className="flex items-center justify-center">
                                Send Reset Link
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                                >
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </motion.div>
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                    <CardContent className="pt-6 px-6 pb-6">
                      <div className="flex flex-col items-center text-center">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4"
                        >
                          <Check className="h-8 w-8 text-blue-400" />
                        </motion.div>
                        <h2 className="text-xl font-semibold text-white mb-2">Check Your Email</h2>
                        <p className="text-blue-100/70 mb-6">
                          We&apos;ve sent a password reset link to <span className="font-medium text-white">{email}</span>
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                          <Button
                            onClick={() => router.push("/login")}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 py-6 rounded-full"
                          >
                            Back to Login
                          </Button>
                        </motion.div>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                        >
                          Didn&apos;t receive the email? Try again
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="mt-8 text-center text-white/50 text-xs">
            <p>© 2024 SOLVI. All rights reserved.</p>
          </div>

          <div className="mt-8 text-center text-white/70">
            <p>Don&apos;t have an account? <Link href="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

