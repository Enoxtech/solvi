"use client"

import { AdminHeader } from "@/components/admin/AdminHeader"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminEmailSystem } from "@/components/admin/AdminEmailSystem"

export default function AdminEmailPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-primary-900/90 via-primary-800 to-primary-900">
      <AdminSidebar />

      <div className="flex-1 overflow-y-auto">
        <AdminHeader />

        <main className="px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Email System</h1>
            <p className="text-blue-100/80 mt-1">Manage all user communications</p>
          </div>

          <AdminEmailSystem />
        </main>
      </div>
    </div>
  )
}

