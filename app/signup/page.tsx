"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Phone,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { hapticFeedback } from "@/utils/haptics"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Personal details
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [otherName, setOtherName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Business details
  const [businessName, setBusinessName] = useState("")
  const [businessCategory, setBusinessCategory] = useState("")
  const [isRegistered, setIsRegistered] = useState<string | null>(null)
  const [referralSource, setReferralSource] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [referralCode, setReferralCode] = useState("")

  // For the animated background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number; color: string }>
  >([])

  useEffect(() => {
    // Create animated bubbles
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 100,
      speed: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 80%, 65%, 0.35)`,
    }))
    setBubbles(newBubbles)

    // Enhanced parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setMousePosition({
        x: (x - 0.5) * 40,
        y: (y - 0.5) * 40,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    hapticFeedback.medium()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      hapticFeedback.error()
      setError("Passwords do not match")
      return
    }

    hapticFeedback.medium()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes - in a real app, this would be an API call
      hapticFeedback.success()
      router.push("/login?registered=true")
    } catch (err) {
      hapticFeedback.error()
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid overlay for depth */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] opacity-40" />

        {/* Enhanced animated bubbles */}
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full blur-xl"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              background: bubble.color,
              boxShadow: `0 0 80px ${bubble.color.replace("0.35", "0.5")}`,
            }}
            animate={{
              y: [0, -bubble.speed * 120, 0],
              x: [0, bubble.speed * 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15 + bubble.speed * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Enhanced gradient overlay with parallax */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent to-primary-900/90"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            type: "spring",
            stiffness: 75,
            damping: 25,
            mass: 1,
          }}
        />

        {/* Light beams for added effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[500px] w-[60px] bg-gradient-to-b from-blue-400 to-transparent blur-3xl"
              style={{
                left: `${25 + i * 25}%`,
                top: "-250px",
                transformOrigin: "center bottom",
              }}
              animate={{
                rotate: [45, 60, 45],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <motion.div className="inline-block" whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.7)]">
              <span className="text-white font-bold text-3xl">S</span>
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-white mb-2 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Join SOLVI Today
          </motion.h1>
          <motion.p
            className="text-blue-100/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create your account in just a few steps
          </motion.p>
        </div>

        <Card className="border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-white">
                {step === 1 ? "Personal Details" : "Business Details"}
              </CardTitle>
              <div className="bg-white/10 px-3 py-1 rounded-full">
                <span className="text-white/90 text-sm font-medium">Step {step} of 2</span>
              </div>
            </div>
            <CardDescription className="text-blue-100/70">
              {step === 1 ? "Let's start with your basic information" : "Tell us about your business"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleNextStep}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: firstName ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Surname/Last Name</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: lastName ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Other Name (Optional)</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="text"
                        placeholder="Other Name"
                        value={otherName}
                        onChange={(e) => setOtherName(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: otherName ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="email"
                        placeholder="Email Address"
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
                    <label className="text-sm font-medium text-white/80">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="tel"
                        placeholder="080XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15 border-yellow-300/50"
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-300"
                        initial={{ width: 0 }}
                        animate={{ width: phone ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 py-6 rounded-full"
                    >
                      <div className="flex items-center justify-center">
                        Next
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </div>
                    </Button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Business Name</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: businessName ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-white/50 mt-1">**Input the name your customers are familiar with</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Business Category</label>
                    <Select value={businessCategory} onValueChange={setBusinessCategory}>
                      <SelectTrigger className="w-full bg-white/10 border-purple-300/30 text-white rounded-full">
                        <SelectValue placeholder="Business Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="retail" className="text-white">
                          Retail
                        </SelectItem>
                        <SelectItem value="wholesale" className="text-white">
                          Wholesale
                        </SelectItem>
                        <SelectItem value="manufacturing" className="text-white">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="services" className="text-white">
                          Services
                        </SelectItem>
                        <SelectItem value="technology" className="text-white">
                          Technology
                        </SelectItem>
                        <SelectItem value="other" className="text-white">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 bg-white/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-white/80 mb-3">Is your business registered with the CAC?</p>
                    <RadioGroup value={isRegistered || ""} onValueChange={setIsRegistered}>
                      <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" className="border-white/50 text-blue-400" />
                          <Label htmlFor="yes" className="text-white">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" className="border-white/50 text-blue-400" />
                          <Label htmlFor="no" className="text-white">
                            No
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">How did you hear about us?</label>
                    <Select value={referralSource} onValueChange={setReferralSource}>
                      <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="social" className="text-white">
                          Social Media
                        </SelectItem>
                        <SelectItem value="friend" className="text-white">
                          Friend/Family
                        </SelectItem>
                        <SelectItem value="search" className="text-white">
                          Search Engine
                        </SelectItem>
                        <SelectItem value="ad" className="text-white">
                          Advertisement
                        </SelectItem>
                        <SelectItem value="other" className="text-white">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Create Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                        onClick={() => {
                          hapticFeedback.light()
                          setShowPassword(!showPassword)
                        }}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: password ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                        onClick={() => {
                          hapticFeedback.light()
                          setShowConfirmPassword(!showConfirmPassword)
                        }}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>

                      {/* Password match indicator */}
                      {confirmPassword && (
                        <div className="absolute right-12 top-1/2 -translate-y-1/2">
                          {password === confirmPassword ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      )}

                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: confirmPassword ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Referral Code (Optional)</label>
                    <div className="relative group">
                      <Input
                        type="text"
                        placeholder="Referral Code"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: referralCode ? "100%" : "0%" }}
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

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 py-6 rounded-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <div className="flex items-center justify-center">
                          Next
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </div>
                      )}
                    </Button>
                    <p className="text-center text-xs text-white/60 mt-3">
                      By clicking next, you agree to our{" "}
                      <span className="text-blue-400">Terms of Use and Privacy Policy</span>
                    </p>
                  </motion.div>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        hapticFeedback.light()
                        setStep(1)
                      }}
                    >
                      Back to previous step
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center text-sm text-white/70">
            <div className="flex justify-center space-x-1">
              <span>Already have an account?</span>
              <motion.a href="/login" className="text-blue-400 hover:text-blue-300" whileHover={{ scale: 1.05 }}>
                Log In
              </motion.a>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-white/50 text-xs">
          <p>© 2024 SOLVI. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  )
}

