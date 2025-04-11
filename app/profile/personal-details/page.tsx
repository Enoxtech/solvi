"use client"

import { useState } from "react"
import { ProfileLayout } from "@/components/ProfileLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Lock, Unlock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function PersonalDetailsPage() {
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+234 800 123 4567")
  const [address, setAddress] = useState("123 Main Street, Lagos")
  const [isEditing, setIsEditing] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [bvn, setBvn] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [bvnError, setBvnError] = useState("")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Details Updated",
      description: "Your personal details have been updated successfully.",
    })
    setIsEditing(false)
  }

  const handleEdit = () => {
    if (isVerified) {
      setIsEditing(true)
    } else {
      setShowVerificationDialog(true)
    }
  }

  const handleVerifyBVN = () => {
    // Validate BVN
    if (!bvn || bvn.length !== 11 || !/^\d+$/.test(bvn)) {
      setBvnError("Please enter a valid 11-digit BVN")
      return
    }

    setIsVerifying(true)
    setBvnError("")

    // Simulate BVN verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      setShowVerificationDialog(false)
      setIsEditing(true)
      toast({
        title: "BVN Verified",
        description: "Your BVN has been verified successfully. You can now edit your details.",
      })
    }, 2000)
  }

  return (
    <ProfileLayout title="Personal Details" backUrl="/profile">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Information</CardTitle>
              {isVerified && (
                <div className="flex items-center text-green-500 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            <CardDescription>
              Manage your personal information. {!isVerified && "BVN verification is required to edit details."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                />
                {!isEditing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                />
                {!isEditing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
                {!isEditing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />
                {!isEditing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                />
                {!isEditing && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isEditing ? (
              <div className="flex w-full gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button className="w-full flex items-center gap-2" onClick={handleEdit}>
                {isVerified ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                {isVerified ? "Edit Details" : "Verify BVN to Edit"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* BVN Verification Dialog */}
        <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>BVN Verification Required</DialogTitle>
              <DialogDescription>
                For security reasons, we need to verify your BVN before you can edit your personal details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bvn">Bank Verification Number (BVN)</Label>
                <Input
                  id="bvn"
                  placeholder="Enter your 11-digit BVN"
                  value={bvn}
                  onChange={(e) => {
                    setBvn(e.target.value)
                    setBvnError("")
                  }}
                  maxLength={11}
                />
                {bvnError && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{bvnError}</span>
                  </div>
                )}
              </div>
              <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Security Notice</p>
                    <p className="mt-1">
                      Your BVN is used only for verification purposes and will not be stored. This helps us protect your
                      account from unauthorized changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVerificationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleVerifyBVN} disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify BVN"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProfileLayout>
  )
}

