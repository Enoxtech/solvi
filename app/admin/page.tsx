"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Users, CreditCard, TrendingUp, DollarSign, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from 'next/dynamic'
import { getRmbRate } from "@/app/actions/rmbRates"

// Dynamically import heavy components
const AdminChart = dynamic(() => import("@/components/admin/AdminChart").then(mod => mod.AdminChart), {
  loading: () => <div className="h-[300px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
})
const AdminTransactionTable = dynamic(() => import("@/components/admin/AdminTransactionTable").then(mod => mod.AdminTransactionTable), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
})
const AdminUserActivity = dynamic(() => import("@/components/admin/AdminUserActivity").then(mod => mod.AdminUserActivity), {
  loading: () => <div className="h-[200px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
})
const AdminApiStatus = dynamic(() => import("@/components/admin/AdminApiStatus").then(mod => mod.AdminApiStatus), {
  loading: () => <div className="h-[150px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
})
const AdminSystemHealth = dynamic(() => import("@/components/admin/AdminSystemHealth").then(mod => mod.AdminSystemHealth), {
  loading: () => <div className="h-[200px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
})
const AdminQuickActions = dynamic(() => import("@/components/admin/AdminQuickActions").then(mod => mod.AdminQuickActions), {
  loading: () => <div className="h-[100px] animate-pulse bg-muted rounded-lg" />,
  ssr: false
})

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const [rmbRate, setRmbRate] = useState<{ rate: number; lastUpdated: string } | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch the current RMB rate
  useEffect(() => {
    const fetchRmbRate = async () => {
      try {
        const rate = await getRmbRate()
        setRmbRate(rate)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch RMB rate:", error)
        setLoading(false)
      }
    }

    fetchRmbRate()
  }, [])

  // Ensure components are only rendered client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Return null on server-side to prevent hydration issues
  }

  return (
    <main className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-blue-100/80 mt-1">Welcome to the SOLVI Admin Dashboard</p>
      </div>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-none shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Total Users</p>
                <h3 className="text-white text-2xl font-bold">12,543</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
              <span className="text-sm font-medium text-green-300">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-none shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Transactions</p>
                <h3 className="text-white text-2xl font-bold">45,675</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
              <span className="text-sm font-medium text-green-300">+18% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-600 to-pink-800 border-none shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Revenue</p>
                <h3 className="text-white text-2xl font-bold">$125,430</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
              <span className="text-sm font-medium text-green-300">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-800 border-none shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Active Users</p>
                <h3 className="text-white text-2xl font-bold">8,392</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
              <span className="text-sm font-medium text-green-300">+5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RMB Rate and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">RMB Rate</CardTitle>
            <CardDescription className="text-white/70">Current exchange rate</CardDescription>
          </CardHeader>
          <CardContent>
            {!loading && rmbRate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Current Rate</p>
                    <p className="text-3xl font-bold text-white">₦{rmbRate.rate.toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/70">Last Updated</p>
                  <p className="text-white">{new Date(rmbRate.lastUpdated).toLocaleString()}</p>
                </div>
                <div className="pt-4">
                  <Link href="/admin/rmb-rates">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none">
                      Manage RMB Rates
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Analytics Overview</CardTitle>
              <CardDescription className="text-white/70">Transaction and user growth</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminChart />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction Table and User Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription className="text-white/70">Latest platform transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminTransactionTable />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">User Activity</CardTitle>
              <CardDescription className="text-white/70">Recent user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminUserActivity />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Status and System Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">API Status</CardTitle>
            <CardDescription className="text-white/70">Current API performance</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminApiStatus />
          </CardContent>
        </Card>
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">System Health</CardTitle>
            <CardDescription className="text-white/70">Infrastructure status</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminSystemHealth />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-white/70">Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminQuickActions isOpen={false} onClose={function (): void {
            throw new Error("Function not implemented.")
          } } />
        </CardContent>
      </Card>
    </main>
  )
}

