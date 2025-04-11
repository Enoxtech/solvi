"use client"

import { useState } from "react"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  const handleChangePassword = () => {
    // Implement password change logic here
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    })
  }

  return (
    <ProfileLayout title="Change Password" backLink="/profile">
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-white/50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-white/50 border-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/50 border-gray-200"
            />
          </div>
        </div>

        <Button onClick={handleChangePassword} className="w-full bg-primary hover:bg-primary/90">
          Change Password
        </Button>
      </div>
    </ProfileLayout>
  )
}

