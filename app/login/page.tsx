"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { hapticFeedback } from "@/utils/haptics"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BiometricAuth } from "@/components/BiometricAuth"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { PageBackground } from "@/components/PageBackground"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { login } = useAuth()

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
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setSuccess('Login successful! Redirecting...')
      // Redirect to dashboard or home page
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    }
  }

  const handleBiometricSuccess = () => {
    toast({
      title: "Biometric authentication successful",
      description: "Welcome back to SOLVI!",
      variant: "default",
    })
    router.push("/dashboard")
  }

  const handleBiometricError = (message: string) => {
    toast({
      title: "Authentication failed",
      description: message,
      variant: "destructive",
    })
  }

  // Secret admin access - clicking 5 times on the logo within 3 seconds
  const [logoClicks, setLogoClicks] = useState(0)
  useEffect(() => {
    if (logoClicks >= 5) {
      router.push("/admin-login")
      setLogoClicks(0)
    }

    const timer = setTimeout(() => {
      if (logoClicks > 0) setLogoClicks(0)
    }, 3000)

    return () => clearTimeout(timer)
  }, [logoClicks, router])

  const logoClickHandler = () => {
    setLogoClicks((prev) => prev + 1)
  }

  // Development mode quick login
  const isDevelopment = process.env.NODE_ENV === "development"
  const handleDevLogin = () => {
    if (isDevelopment) {
      setEmail("user@example.com")
      setPassword("password")
      // Submit the form after a short delay to show the fields being filled
      setTimeout(() => {
        const form = document.querySelector("form") as HTMLFormElement
        if (form) form.requestSubmit()
      }, 300)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <PageBackground />
      <div className="relative z-10 flex-1 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md z-10">
          <div className="text-center mb-8">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={logoClickHandler}
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.7)]">
                <span className="text-white font-bold text-4xl">S</span>
              </div>
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-white mb-2 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to SOLVI
            </motion.h1>
            <motion.p
              className="text-blue-100/80 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your digital commerce companion
            </motion.p>
          </div>

          <Card className="border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white">Sign in</CardTitle>
              <CardDescription className="text-blue-100/70">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                    <Input
                      type="email"
                      placeholder="Email"
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

                <div className="space-y-2">
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-white/50 hover:text-white hover:bg-transparent"
                      onClick={() => {
                        hapticFeedback.light()
                        setShowPassword(!showPassword)
                      }}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ width: 0 }}
                      animate={{ width: password ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <div className="flex items-center justify-center">
                        Sign In
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

              {/* Development mode quick login */}
              {isDevelopment && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-white/5 border-white/10 hover:bg-white/10"
                    onClick={handleDevLogin}
                  >
                    Dev Mode: Quick Login
                  </Button>
                </div>
              )}

              {/* Biometric Authentication */}
              <BiometricAuth onSuccess={handleBiometricSuccess} onError={handleBiometricError} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 text-center text-sm text-white/70">
              <div className="flex justify-center space-x-1">
                <span>Don&apos;t have an account?</span>
                <motion.a href="/signup" className="text-blue-400 hover:text-blue-300" whileHover={{ scale: 1.05 }}>
                  Sign up
                </motion.a>
              </div>
              <div className="flex justify-center space-x-1">
                <motion.a
                  href="/forgot-password"
                  className="text-blue-400 hover:text-blue-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Forgot password?
                </motion.a>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center text-white/50 text-xs">
            <p>© 2025 SOLVI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

