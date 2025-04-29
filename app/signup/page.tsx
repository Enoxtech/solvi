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
  Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { hapticFeedback } from "@/utils/haptics"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PageBackground } from "@/components/PageBackground"
import Link from 'next/link'

const COUNTRY_CODES = [
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+233", label: "Ghana", flag: "🇬🇭" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+225", label: "Ivory Coast", flag: "🇨🇮" },
  { code: "+256", label: "Uganda", flag: "🇺🇬" },
  { code: "+250", label: "Rwanda", flag: "🇷🇼" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+237", label: "Cameroon", flag: "🇨🇲" },
  { code: "+212", label: "Morocco", flag: "🇲🇦" },
  { code: "+20", label: "Egypt", flag: "🇪🇬" },
]

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // Personal details
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code)
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [referrer, setReferrer] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agree, setAgree] = useState(false)

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
      size: Math.random() * 200 + 100,
      speed: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 80%, 65%, 0.25)`,
    }))
    setBubbles(newBubbles)

    // Optimized parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      setMousePosition({
        x: (x - 0.5) * 20,
        y: (y - 0.5) * 20,
      })
    }

    if (window.innerWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone,
          countryCode,
          referrer,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      setSuccess(data.message)
      // Clear form
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setPhone('')
      setCountryCode(COUNTRY_CODES[0].code)
      setReferrer('')
      setAgree(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <PageBackground />
      <div className="relative z-10 flex-1 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-2xl z-10">
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

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white">Create Your Account</CardTitle>
              <CardDescription className="text-blue-100/70">
                Fill in your details to get started
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
                <div className="grid grid-cols-1 gap-4">
                  {/* Personal Details */}
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name</label>
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <div className="flex">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-28 bg-white/10 border-white/20 text-white">
                            <SelectValue>
                              {COUNTRY_CODES.find(c => c.code === countryCode)?.flag} {countryCode}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {COUNTRY_CODES.map(c => (
                              <SelectItem key={c.code} value={c.code} className="text-white">
                                {c.flag} {c.label} ({c.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="flex-1 ml-2 bg-white/10 border-white/20 text-white"
                        />
                      </div>
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Referrer (Optional)</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 group-hover:text-white/80 transition-colors duration-200" />
                      <Input
                        type="text"
                        placeholder="referrer's username"
                        value={referrer}
                        onChange={(e) => setReferrer(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 transition-all duration-200 hover:bg-white/15"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white pr-10"
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" onClick={() => setShowPassword(v => !v)}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Confirm Password</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white pr-10"
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" onClick={() => setShowConfirmPassword(v => !v)}>
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={agree} onCheckedChange={v => setAgree(!!v)} />
                  <label htmlFor="terms" className="text-xs text-white/70 select-none">
                    I agree to the <span className="text-blue-400">Terms & Conditions</span> and <span className="text-blue-400">Privacy Policy</span>
                  </label>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_5px_15px_rgba(59,130,246,0.4)] transition-all duration-300 py-6 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>
                </motion.div>
              </form>
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
        </div>
      </div>
    </div>
  )
}

