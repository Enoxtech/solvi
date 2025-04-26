"use client"

import { AdminEmailSystem } from "@/components/admin/AdminEmailSystem"
import { PageBackground } from "@/components/PageBackground"

export default function AdminEmailPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <PageBackground />
      <div className="relative z-10 flex-1 flex h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <main className="px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Email System</h1>
              <p className="text-blue-100/80 mt-1">Manage all user communications</p>
            </div>

            <AdminEmailSystem />
          </main>
        </div>
      </div>
    </div>
  )
}

