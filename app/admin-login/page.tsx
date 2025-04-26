"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, ArrowLeft, Loader2, Mail, Lock, Key } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { hapticFeedback } from "@/utils/haptics"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { login } = useAuth()

  // For the animated particles
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      velocity: { x: number; y: number }
      color: string
    }>
  >([])

  useEffect(() => {
    // Create animated particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      velocity: {
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
      },
      color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.5 + 0.3})`,
    }))
    setParticles(newParticles)

    // Animation loop for particles
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.velocity.x
          let newY = particle.y + particle.velocity.y

          // Bounce off edges
          if (newX < 0 || newX > 100) {
            particle.velocity.x *= -1
            newX = particle.x
          }
          if (newY < 0 || newY > 100) {
            particle.velocity.y *= -1
            newY = particle.y
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }

    const animationInterval = setInterval(animateParticles, 50)
    return () => clearInterval(animationInterval)
  }, [])

  // Update the handleLogin function to redirect to admin dashboard on success
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    hapticFeedback.medium()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes - in a real app, this would be an API call
      if (email === "admin@solvi.com" && password === "admin123" && accessCode === "solvi2024") {
        const success = await login(email, password)
        if (success) {
          hapticFeedback.success()
          toast({
            title: "Admin login successful",
            description: "Welcome to the admin dashboard",
            variant: "default",
          })
          router.push("/admin")
        } else {
          hapticFeedback.error()
          setError("Invalid credentials. Please check all fields and try again.")
        }
      } else {
        hapticFeedback.error()
        setError("Invalid credentials. Please check all fields and try again.")
      }
    } catch (err) {
      hapticFeedback.error()
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Development mode quick login
  const isDevelopment = process.env.NODE_ENV === "development"
  const handleDevLogin = () => {
    if (isDevelopment) {
      setEmail("admin@solvi.com")
      setPassword("admin123")
      setAccessCode("solvi2024")
      // Submit the form after a short delay to show the fields being filled
      setTimeout(() => {
        const form = document.querySelector("form") as HTMLFormElement
        if (form) form.requestSubmit()
      }, 300)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <motion.div className="inline-block" whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(6,182,212,0.7)]">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-white mb-2 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Admin Access
          </motion.h1>
          <motion.p
            className="text-blue-100/80 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Secure administration portal
          </motion.p>
        </div>

        <Card className="border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Restricted Area</CardTitle>
            <CardDescription className="text-blue-100/70">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white pl-10 placeholder:text-white/50 focus:border-cyan-400 transition-all duration-200 hover:bg-white/15"
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: email ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Lock className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white pl-10 placeholder:text-white/50 focus:border-cyan-400 transition-all duration-200 hover:bg-white/15"
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: password ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Access Code Field */}
              <div className="space-y-2">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Key className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors" />
                  </div>
                  <Input
                    type="password"
                    placeholder="Access Code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white pl-10 placeholder:text-white/50 focus:border-cyan-400 transition-all duration-200 hover:bg-white/15"
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: accessCode ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm bg-red-500/20 p-3 rounded-md border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_5px_15px_rgba(6,182,212,0.4)] transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center">Access Admin Panel</div>
                  )}
                </Button>
              </motion.div>

              {/* Development mode quick login */}
              {isDevelopment && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-white/5 border-white/10 hover:bg-white/10"
                    onClick={handleDevLogin}
                  >
                    Dev Mode: Quick Admin Login
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-center text-sm text-white/70">
            <motion.a
              href="/login"
              className="flex items-center text-blue-400 hover:text-blue-300"
              whileHover={{ scale: 1.05 }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to login
            </motion.a>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-white/50 text-xs">
          <p>© 2025 SOLVI. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

