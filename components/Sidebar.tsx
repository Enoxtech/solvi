"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  DollarSign,
  Truck,
  FileText,
  Wallet,
  BarChart2,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: DollarSign, label: "Currency Exchange", href: "/currency-exchange" },
  { icon: Truck, label: "Logistics", href: "/logistics" },
  { icon: FileText, label: "Bill Payments", href: "/bill-payments" },
  { icon: Wallet, label: "Wallet/BNPL", href: "/wallet" },
  { icon: BarChart2, label: "BI Dashboard", href: "/bi-dashboard" },
  { icon: Users, label: "Community", href: "/community" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-deep-blue/90 backdrop-blur-md text-off-white transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-off-white hover:bg-white/10"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="space-y-2 px-2 flex-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant="ghost"
              className={cn("w-full justify-start text-off-white hover:bg-white/10", collapsed ? "px-2" : "px-4")}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-off-white hover:bg-white/10 p-2",
                !collapsed && "flex items-center gap-3",
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Username</span>
                  <span className="text-xs text-white/60">user@example.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="right">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

