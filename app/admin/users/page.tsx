"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, UserPlus, MoreHorizontal, Check, X } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "merchant"
  status: "active" | "inactive" | "pending"
  lastActive: string
  avatar?: string
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="text-blue-100/80 mt-1">View and manage all users</p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-6 mb-8">
        {/* User management content here */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
            <Input
              placeholder="Search users..."
              className="pl-9 bg-white/10 border-white/20 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* User table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-medium text-white/70">USER</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/70">EMAIL</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/70">STATUS</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/70">ROLE</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/70">JOINED</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-white/70">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {/* Sample user rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">U{i}</span>
                      </div>
                      <span className="text-sm text-white">User {i}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-white/80">user{i}@example.com</td>
                  <td className="py-3 px-4">
                    <Badge className={i % 3 === 0 ? "bg-yellow-600" : i % 2 === 0 ? "bg-green-600" : "bg-blue-600"}>
                      {i % 3 === 0 ? "Pending" : i % 2 === 0 ? "Active" : "New"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-white/80">{i === 1 ? "Admin" : "User"}</td>
                  <td className="py-3 px-4 text-sm text-white/80">2023-0{i}-15</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-white/70">Showing 1-5 of 100 users</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

