"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Share2,
  Bell,
  Gift,
  Wallet,
  User,
  Building2,
  BadgeCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  Trash2,
  Copy,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useWallet } from "@/contexts/WalletContext"
import { NewFeatureBadge } from "@/components/new-feature-badge"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  isNew?: boolean
}

interface MenuItems {
  [key: string]: MenuItem[]
}

// Menu items for different sections
const menuItems: MenuItems = {
  Account: [
    { icon: User, label: "Personal details", href: "/profile/personal-details" },
    { icon: Building2, label: "Business details", href: "/profile/business" },
    { icon: BadgeCheck, label: "KYC and Verification", href: "/profile/kyc" },
    { icon: CreditCard, label: "Bank Details", href: "/profile/bank" },
    { icon: User, label: "User ID", href: "/profile/user-id", isNew: true },
  ],
  Wallet: [
    { icon: CreditCard, label: "Manage Cards", href: "/profile/cards" },
    {
      icon: Wallet,
      label: "Default Currency",
      href: "/profile/default-currency",
    },
    { icon: Gift, label: "Refer & Earn", href: "/profile/referral", isNew: true },
  ],
  Security: [
    { icon: User, label: "Change Password", href: "/profile/change-password" },
    { icon: Bell, label: "Two-Factor Authentication", href: "/profile/2fa" },
    { icon: BadgeCheck, label: "Manage Biometrics", href: "/profile/biometrics" },
  ],
}

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("Account")
  const { formattedBalance } = useWallet()
  const [showShareDialog, setShowShareDialog] = useState(false)
  const { toast } = useToast()

  const handleEditProfile = () => {
    // Navigate to personal details page
    window.location.href = "/profile/personal-details"
  }

  const handleShare = () => {
    setShowShareDialog(true)
  }

  const handleCopyProfileLink = () => {
    // In a real app, this would be the actual profile URL
    navigator.clipboard.writeText("https://solvi.app/profile/username")
    toast({
      title: "Link copied",
      description: "Profile link copied to clipboard",
    })
    setShowShareDialog(false)
  }

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out",
    })
    // Here you would handle the actual logout logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Profile</h1>
          <Button variant="ghost" onClick={handleLogout} className="text-gray-100 hover:text-white hover:bg-white/10">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-white">
              IA
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-100">Itopa Abubakar</h2>
              <p className="text-blue-200">skybondnyc@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleEditProfile}
              variant="secondary"
              className="flex-1 bg-white/10 hover:bg-white/20 text-gray-100 border-0"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              onClick={handleShare}
              variant="secondary"
              className="flex-1 bg-white/10 hover:bg-white/20 text-gray-100 border-0"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4"
          >
            <Bell className="h-5 w-5 text-white mb-2" />
            <p className="text-sm text-white/70">Notifications</p>
            <p className="text-xl font-bold text-white">3</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4"
          >
            <Gift className="h-5 w-5 text-white mb-2" />
            <p className="text-sm text-white/70">Rewards</p>
            <p className="text-xl font-bold text-white">250</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4"
          >
            <Wallet className="h-5 w-5 text-white mb-2" />
            <p className="text-sm text-white/70">Balance</p>
            <p className="text-xl font-bold text-white">{formattedBalance}</p>
          </motion.div>
        </div>

        {/* Section Tabs */}
        <div className="flex mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-1">
          {Object.keys(menuItems).map((section) => (
            <Button
              key={section}
              variant="ghost"
              className={`flex-1 text-white ${activeSection === section ? "bg-white/20" : "hover:bg-white/10"}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden mb-6"
        >
          {menuItems[activeSection as keyof typeof menuItems].map((item, index) => (
            <Link key={item.label} href={item.href}>
              <div
                className={`flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors ${
                  index !== 0 ? "border-t border-gray-200/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.label}</span>
                    {item.isNew && <NewFeatureBadge featureId={item.label.toLowerCase().replace(/\s+/g, "-")} />}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
          {/* Admin Access - only show this for admin users */}
          <Link
            href="/admin"
            className="flex items-center justify-between p-4 border-t border-gray-200/50 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Admin Dashboard</p>
                <p className="text-sm text-gray-500">Access admin controls and settings</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </motion.div>

        {/* Delete Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link href="/profile/delete-account">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 hover:bg-red-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">Delete Account</span>
                </div>
                <ChevronRight className="h-5 w-5 text-red-400" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Share Profile Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Profile</DialogTitle>
            <DialogDescription>Share your profile with other users</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue="https://solvi.app/profile/username" readOnly className="bg-gray-50" />
            </div>
            <Button onClick={handleCopyProfileLink} className="bg-primary hover:bg-primary/90 text-white">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

