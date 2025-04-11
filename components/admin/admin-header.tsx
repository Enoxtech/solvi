"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  MessageSquare,
  HelpCircle,
  User,
  Home,
  Settings,
  LogOut,
  Search,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "urgent"
  read: boolean
  timestamp: Date
  link?: string
}

interface Message {
  id: string
  sender: {
    name: string
    avatar?: string
    online: boolean
  }
  content: string
  timestamp: Date
  read: boolean
}

export function AdminHeader() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      title: "System Update",
      message: "The system will be updated tonight at 2:00 AM. Expected downtime: 15 minutes.",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "n2",
      title: "New User Registration",
      message: "10 new users registered in the last hour.",
      type: "success",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      link: "/admin/users",
    },
    {
      id: "n3",
      title: "API Rate Limit Warning",
      message: "API endpoint /transactions is nearing rate limit threshold.",
      type: "warning",
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      link: "/admin/api",
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: {
        name: "John Doe",
        avatar: "/avatars/john.png",
        online: true,
      },
      content: "Hi admin, I'm having trouble with my account. Can you help?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      read: false,
    },
    {
      id: "m2",
      sender: {
        name: "Sarah Williams",
        avatar: "/avatars/sarah.png",
        online: false,
      },
      content: "Thank you for resolving my issue so quickly!",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      read: false,
    },
    {
      id: "m3",
      sender: {
        name: "Michael Brown",
        avatar: "/avatars/michael.png",
        online: true,
      },
      content: "When will the new feature be available?",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: false,
    },
  ])

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const notificationsRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const unreadNotifications = notifications.filter((n) => !n.read).length
  const unreadMessages = messages.filter((m) => !m.read).length

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setIsMessagesOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Format timestamp to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Mark message as read
  const markMessageAsRead = (id: string) => {
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, read: true } : message)))
  }

  // Mark all messages as read
  const markAllMessagesAsRead = () => {
    setMessages((prev) => prev.map((message) => ({ ...message, read: true })))
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  // Get notification background color based on type
  const getNotificationBg = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-50"
      case "success":
        return "bg-green-50"
      case "warning":
        return "bg-amber-50"
      case "urgent":
        return "bg-red-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-primary-900/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SOLVI Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div ref={searchRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-lg bg-primary-900/95 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden">
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                    <Input
                      placeholder="Search admin panel..."
                      className="pl-10 bg-white/10 border-white/20 text-white focus:ring-blue-400 focus:border-blue-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    <p>Quick searches:</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Link href="/admin/users">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs border-white/20 text-white hover:bg-white/10"
                        >
                          Users
                        </Button>
                      </Link>
                      <Link href="/admin/transactions">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs border-white/20 text-white hover:bg-white/10"
                        >
                          Transactions
                        </Button>
                      </Link>
                      <Link href="/admin/rmb-rates">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs border-white/20 text-white hover:bg-white/10"
                        >
                          RMB Rates
                        </Button>
                      </Link>
                      <Link href="/admin/system">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs border-white/20 text-white hover:bg-white/10"
                        >
                          System
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" title="Back to User Dashboard">
              <Home className="h-5 w-5" />
            </Button>
          </Link>

          <div ref={notificationsRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/10"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                setIsMessagesOpen(false)
              }}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold text-white">
                  {unreadNotifications}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-lg bg-primary-900/95 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden">
                <Card className="bg-transparent border-0">
                  <CardHeader className="p-3 bg-primary-800/90 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium text-white">Notifications</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllNotificationsAsRead}
                      className="h-7 text-xs text-white/80 hover:text-white hover:bg-white/10 px-2"
                      disabled={unreadNotifications === 0}
                    >
                      Mark all as read
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[60vh] overflow-y-auto bg-primary-900/95">
                    {notifications.length === 0 ? (
                      <div className="py-4 text-center text-white/50">
                        <Bell className="h-5 w-5 mx-auto mb-1 opacity-20" />
                        <p className="text-xs">No notifications</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 relative ${!notification.read ? "bg-primary-800/50" : ""}`}
                          >
                            <div className="flex gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getNotificationBg(notification.type)} bg-opacity-20`}
                              >
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-1">
                                  <h3
                                    className={`text-sm font-medium text-white truncate ${!notification.read ? "font-semibold" : ""}`}
                                  >
                                    {notification.title}
                                  </h3>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => markNotificationAsRead(notification.id)}
                                    className="h-5 w-5 rounded-full text-white/40 hover:text-white/60 hover:bg-white/10 -mt-1 -mr-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-white/70 mt-0.5 line-clamp-2">{notification.message}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-[10px] text-white/50">
                                    {formatRelativeTime(notification.timestamp)}
                                  </span>
                                  {notification.link && (
                                    <Link href={notification.link}>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-[10px] text-blue-400 hover:text-blue-300 hover:bg-white/10 px-2"
                                        onClick={() => markNotificationAsRead(notification.id)}
                                      >
                                        View
                                      </Button>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                            {!notification.read && (
                              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full m-1.5" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-2 border-t border-white/10 bg-primary-800/90">
                    <Link href="/admin/notifications" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full text-xs border-white/20 text-white hover:bg-white/10 h-8"
                        onClick={() => setIsNotificationsOpen(false)}
                      >
                        View All Notifications
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>

          <div ref={messagesRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:bg-white/10"
              onClick={() => {
                setIsMessagesOpen(!isMessagesOpen)
                setIsNotificationsOpen(false)
              }}
            >
              <MessageSquare className="h-5 w-5" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-bold text-white">
                  {unreadMessages}
                </span>
              )}
            </Button>

            {isMessagesOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-lg bg-primary-900/95 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden">
                <Card className="bg-transparent border-0">
                  <CardHeader className="p-3 bg-primary-800/90 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-medium text-white">Messages</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllMessagesAsRead}
                      className="h-7 text-xs text-white/80 hover:text-white hover:bg-white/10 px-2"
                      disabled={unreadMessages === 0}
                    >
                      Mark all as read
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[60vh] overflow-y-auto bg-primary-900/95">
                    {messages.length === 0 ? (
                      <div className="py-4 text-center text-white/50">
                        <MessageSquare className="h-5 w-5 mx-auto mb-1 opacity-20" />
                        <p className="text-xs">No messages</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {messages.map((message) => (
                          <div key={message.id} className={`p-3 relative ${!message.read ? "bg-primary-800/50" : ""}`}>
                            <div className="flex gap-3">
                              <div className="relative">
                                <Avatar className="h-8 w-8 border border-white/20">
                                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                                  <AvatarFallback className="bg-blue-700 text-white">
                                    {message.sender.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                {message.sender.online && (
                                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-1">
                                  <h3
                                    className={`text-sm font-medium text-white truncate ${!message.read ? "font-semibold" : ""}`}
                                  >
                                    {message.sender.name}
                                  </h3>
                                  <span className="text-[10px] text-white/50">
                                    {formatRelativeTime(message.timestamp)}
                                  </span>
                                </div>
                                <p className="text-xs text-white/70 mt-0.5 line-clamp-2">{message.content}</p>
                                <div className="flex justify-end items-center mt-1">
                                  <Link href={`/admin/messages/${message.id}`}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 text-[10px] text-blue-400 hover:text-blue-300 hover:bg-white/10 px-2"
                                      onClick={() => markMessageAsRead(message.id)}
                                    >
                                      Reply
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            {!message.read && (
                              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full m-1.5" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-2 border-t border-white/10 bg-primary-800/90">
                    <Link href="/admin/messages" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full text-xs border-white/20 text-white hover:bg-white/10 h-8"
                        onClick={() => setIsMessagesOpen(false)}
                      >
                        View All Messages
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>

          <Link href="/admin/support">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@admin" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@solvi.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/admin/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/notifications">
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/admin/support">
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

