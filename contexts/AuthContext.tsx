"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "user" | "admin"
  isVerified: boolean
} | null

interface AuthContextType {
  user: User
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthPage: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Update the AUTH_PAGES array to be more comprehensive
const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/reset-password", "/admin-login", "/verify-email"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  // Check if current page is an auth page
  const isAuthPage = AUTH_PAGES.includes(pathname || "")

  // List of protected routes that require authentication
  const PROTECTED_ROUTES = [
    "/dashboard",
    "/wallet",
    "/transactions",
    "/profile",
    "/currency-exchange",
    "/bill-payments",
    "/logistics",
    "/business-intelligence",
    "/community",
    "/notifications",
    "/help-center",
  ]

  // Check if current route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname?.startsWith(route) || pathname === route)

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("solvi_user")
    const storedToken = localStorage.getItem("solvi_token")
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Handle route protection
  useEffect(() => {
    if (!isLoading) {
      // If on a protected route and not authenticated, redirect to login
      if (isProtectedRoute && !user) {
        router.push("/login")
      }

      // If authenticated and on an auth page, redirect to dashboard
      if (user && isAuthPage) {
        router.push("/dashboard")
      }
    }
  }, [isLoading, user, isProtectedRoute, isAuthPage, router, pathname])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      const { user, token } = data

      setUser(user)
      localStorage.setItem("solvi_user", JSON.stringify(user))
      localStorage.setItem("solvi_token", token)

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("solvi_user")
    localStorage.removeItem("solvi_token")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isAuthPage,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

// Update the useAuth hook to include the isLoading property
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

