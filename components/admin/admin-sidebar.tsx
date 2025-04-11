"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  Mail,
  MessageSquare,
  CreditCard,
  DollarSign,
  ChevronDown,
  ChevronRight,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isActive: boolean
  badge?: string
  onClick?: () => void
}

function SidebarItem({ icon, title, href, isActive, badge, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
      )}
    >
      {icon}
      <span className="flex-1">{title}</span>
      {badge && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-medium">
          {badge}
        </span>
      )}
    </Link>
  )
}

interface SidebarGroupProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function SidebarGroup({ title, children, defaultOpen = false }: SidebarGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white"
        >
          <span className="text-sm font-medium">{title}</span>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 pl-6">{children}</CollapsibleContent>
    </Collapsible>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col border-r border-white/10 bg-primary/95 backdrop-blur-md">
      <div className="flex h-14 items-center border-b border-white/10 px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <span className="text-lg font-bold text-white">SOLVI Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          <SidebarItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard"
            href="/admin"
            isActive={pathname === "/admin"}
          />
          <SidebarItem
            icon={<Users className="h-5 w-5" />}
            title="Users"
            href="/admin/users"
            isActive={pathname === "/admin/users"}
            badge="5"
          />
          <SidebarItem
            icon={<CreditCard className="h-5 w-5" />}
            title="Transactions"
            href="/admin/transactions"
            isActive={pathname === "/admin/transactions"}
            badge="3"
          />
          <SidebarItem
            icon={<DollarSign className="h-5 w-5" />}
            title="RMB Rates"
            href="/admin/rmb-rates"
            isActive={pathname === "/admin/rmb-rates"}
          />
          <SidebarItem
            icon={<BarChart3 className="h-5 w-5" />}
            title="Analytics"
            href="/admin/analytics"
            isActive={pathname === "/admin/analytics"}
          />

          <SidebarGroup
            title="Communication"
            defaultOpen={pathname.includes("/admin/email") || pathname.includes("/admin/messages")}
          >
            <SidebarItem
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              href="/admin/email"
              isActive={pathname === "/admin/email"}
            />
            <SidebarItem
              icon={<MessageSquare className="h-5 w-5" />}
              title="Messages"
              href="/admin/messages"
              isActive={pathname === "/admin/messages"}
              badge="9"
            />
          </SidebarGroup>

          <SidebarGroup title="Support">
            <SidebarItem
              icon={<HelpCircle className="h-5 w-5" />}
              title="Help Center"
              href="/admin/support"
              isActive={pathname === "/admin/support"}
            />
          </SidebarGroup>

          <SidebarItem
            icon={<Settings className="h-5 w-5" />}
            title="Settings"
            href="/admin/profile"
            isActive={pathname === "/admin/profile"}
          />
        </div>
      </ScrollArea>
    </div>
  )
}

