"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    setError("")

    // Simulate auth
    await new Promise(r => setTimeout(r, 1200))
    localStorage.setItem("solvi_user", JSON.stringify({ id: "1", firstName: "Sam", lastName: "Ono", email, role: "user", isVerified: true }))
    localStorage.setItem("solvi_token", "mock_token")
    router.push("/wallet")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Status bar area */}
      <div className="h-11 bg-black" />

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 pt-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#0A84FF] flex items-center justify-center">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">SOLVI</h1>
            <p className="text-[#636366] text-xs">Buy RMB with Ease</p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-white sf-title">Sign In</h2>
          <p className="text-[#8E8E93] text-[17px] mt-1">Welcome back</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 flex-1">
          <div>
            <label className="text-[#8E8E93] text-[13px] font-medium mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="ios-input"
              autoCapitalize="none"
              autoCorrect="off"
              keyboardType="email-address"
              required
            />
          </div>

          <div>
            <label className="text-[#8E8E93] text-[13px] font-medium mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="ios-input pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A84FF] text-[15px] font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[#FF453A] text-[13px]">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !email || !password}
              className={`ios-btn-primary w-full flex items-center justify-center gap-2 ${
                loading ? "opacity-60" : ""
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link href="/forgot-password" className="text-[#0A84FF] text-[15px]">
              Forgot password?
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="pb-8 pt-6 text-center">
          <span className="text-[#8E8E93] text-[15px]">Don't have an account? </span>
          <Link href="/signup" className="text-[#0A84FF] text-[15px] font-semibold">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
