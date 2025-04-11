"use client"

import { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  Search,
  Phone,
  Video,
  Info,
  Paperclip,
  Send,
  Smile,
  Image,
  File,
  Mic,
  MoreVertical,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChatUser {
  id: string
  name: string
  email: string
  avatar?: string
  status: "online" | "offline" | "away" | "busy"
  lastSeen?: Date
  unreadCount?: number
}

interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  attachments?: { name: string; url: string; type: string; size: string }[]
}

export function AdminLiveChat() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample users
  const users: ChatUser[] = [
    {
      id: "u1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/avatars/john.png",
      status: "online",
      unreadCount: 3,
    },
    {
      id: "u2",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      avatar: "/avatars/sarah.png",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 0,
    },
    {
      id: "u3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "/avatars/michael.png",
      status: "online",
      unreadCount: 1,
    },
    {
      id: "u4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/avatars/emily.png",
      status: "away",
      unreadCount: 0,
    },
    {
      id: "u5",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: "/avatars/robert.png",
      status: "busy",
      unreadCount: 0,
    },
  ]

  // Sample messages
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    u1: [
      {
        id: "m1",
        senderId: "u1",
        content: "Hi admin, I'm having trouble with my account. Can you help?",
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
        status: "read",
      },
      {
        id: "m2",
        senderId: "admin",
        content: "Hello John, I'd be happy to help. What specific issue are you experiencing?",
        timestamp: new Date(Date.now() - 1000 * 60 * 9), // 9 minutes ago
        status: "read",
      },
      {
        id: "m3",
        senderId: "u1",
        content: "I can't access my transaction history. It shows an error message.",
        timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
        status: "read",
      },
      {
        id: "m4",
        senderId: "u1",
        content: "Here's a screenshot of the error.",
        timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
        status: "read",
        attachments: [
          {
            name: "error-screenshot.png",
            url: "/screenshots/error.png",
            type: "image/png",
            size: "245 KB",
          },
        ],
      },
      {
        id: "m5",
        senderId: "admin",
        content: "Thank you for the screenshot. I can see the issue now. Let me fix this for you right away.",
        timestamp: new Date(Date.now() - 1000 * 60 * 7), // 7 minutes ago
        status: "read",
      },
      {
        id: "m6",
        senderId: "u1",
        content: "Great, thank you! How long will it take?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        status: "read",
      },
      {
        id: "m7",
        senderId: "admin",
        content:
          "I should be able to resolve this within the next 15-20 minutes. I'll let you know as soon as it's fixed.",
        timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
        status: "delivered",
      },
      {
        id: "m8",
        senderId: "u1",
        content: "Perfect, I'll wait for your update.",
        timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
        status: "delivered",
      },
    ],
    u3: [
      {
        id: "m1",
        senderId: "u3",
        content: "When will the new feature be available?",
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        status: "read",
      },
    ],
  })

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedUser, messages])

  // Simulate typing indicator
  useEffect(() => {
    if (selectedUser && message.length > 0) {
      setIsTyping(true)
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [message, selectedUser])

  // Send message
  const sendMessage = () => {
    if (!selectedUser || !message.trim()) return

    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "admin",
      content: message,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }))

    setMessage("")

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: prev[selectedUser.id].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
        ),
      }))

      // Simulate user reply after some time
      if (Math.random() > 0.5) {
        setTimeout(
          () => {
            const replies = [
              "Thank you for the information!",
              "I understand now.",
              "That's helpful, thanks!",
              "Got it, I'll try that.",
              "Perfect, that solves my issue.",
            ]

            const replyMessage: ChatMessage = {
              id: `m${Date.now()}`,
              senderId: selectedUser.id,
              content: replies[Math.floor(Math.random() * replies.length)],
              timestamp: new Date(),
              status: "sent",
            }

            setMessages((prev) => ({
              ...prev,
              [selectedUser.id]: [...prev[selectedUser.id], replyMessage],
            }))
          },
          5000 + Math.random() * 10000,
        )
      }
    }, 1000)
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Format last seen
  const formatLastSeen = (date?: Date) => {
    if (!date) return "Unknown"

    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get filtered users
  const getFilteredUsers = () => {
    if (!searchQuery) return users

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden h-[calc(100vh-10rem)]">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/10 bg-white/5 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search users..."
                className="pl-9 bg-white/10 border-white/20 text-white focus:ring-blue-400 focus:border-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-2 pt-2">
              <TabsList className="grid grid-cols-3 w-full bg-white/10">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">
                  Unread
                </TabsTrigger>
                <TabsTrigger value="online" className="text-xs">
                  Online
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y divide-white/10">
                {getFilteredUsers().map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 ${selectedUser?.id === user.id ? "bg-white/10" : ""}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 border border-white/20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-blue-700 text-white">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(user.status)} ring-1 ring-white`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        {user.unreadCount > 0 && (
                          <Badge className="bg-blue-600 text-white ml-2">{user.unreadCount}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-white/50 truncate">
                        {user.status === "online" ? "Online" : `Last seen ${formatLastSeen(user.lastSeen)}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y divide-white/10">
                {getFilteredUsers()
                  .filter((user) => user.unreadCount && user.unreadCount > 0)
                  .map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 ${selectedUser?.id === user.id ? "bg-white/10" : ""}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-blue-700 text-white">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(user.status)} ring-1 ring-white`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="text-sm font-medium text-white truncate">{user.name}</p>
                          <Badge className="bg-blue-600 text-white ml-2">{user.unreadCount}</Badge>
                        </div>
                        <p className="text-xs text-white/50 truncate">
                          {user.status === "online" ? "Online" : `Last seen ${formatLastSeen(user.lastSeen)}`}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="online" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y divide-white/10">
                {getFilteredUsers()
                  .filter((user) => user.status === "online")
                  .map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10 ${selectedUser?.id === user.id ? "bg-white/10" : ""}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10 border border-white/20">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-blue-700 text-white">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-1 ring-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="text-sm font-medium text-white truncate">{user.name}</p>
                          {user.unreadCount > 0 && (
                            <Badge className="bg-blue-600 text-white ml-2">{user.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-white/50 truncate">Online</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main chat area */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border border-white/20">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback className="bg-blue-700 text-white">{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(selectedUser.status)} ring-1 ring-white`}
                  />
                </div>

                <div>
                  <h2 className="text-white font-medium">{selectedUser.name}</h2>
                  <p className="text-xs text-white/50">
                    {selectedUser.status === "online" ? "Online" : `Last seen ${formatLastSeen(selectedUser.lastSeen)}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Info className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedUser.id]?.map((message, index) => {
                const isAdmin = message.senderId === "admin"
                const showAvatar = index === 0 || messages[selectedUser.id][index - 1].senderId !== message.senderId

                return (
                  <div key={message.id} className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[70%] ${isAdmin ? "flex-row-reverse" : ""}`}>
                      {!isAdmin && showAvatar ? (
                        <Avatar className="h-8 w-8 mt-1 border border-white/20">
                          <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                          <AvatarFallback className="bg-blue-700 text-white text-xs">
                            {selectedUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : !isAdmin ? (
                        <div className="w-8" />
                      ) : null}

                      <div className={`space-y-1 ${isAdmin ? "items-end" : ""}`}>
                        <div
                          className={`p-3 rounded-lg ${isAdmin ? "bg-blue-600 text-white" : "bg-white/10 text-white"}`}
                        >
                          <p className="text-sm">{message.content}</p>

                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, i) => (
                                <div key={i} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                                  {attachment.type.startsWith("image/") ? (
                                    <Image className="h-5 w-5 text-white/70" />
                                  ) : (
                                    <File className="h-5 w-5 text-white/70" />
                                  )}
                                  <div>
                                    <p className="text-xs text-white">{attachment.name}</p>
                                    <p className="text-[10px] text-white/50">{attachment.size}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-1 text-[10px] text-white/50 ${isAdmin ? "justify-end" : ""}`}
                        >
                          <span>{formatTime(message.timestamp)}</span>
                          {isAdmin && (
                            <>
                              {message.status === "sent" && <Check className="h-3 w-3" />}
                              {message.status === "delivered" && (
                                <div className="relative">
                                  <Check className="h-3 w-3" />
                                  <Check className="h-3 w-3 absolute -left-1 top-0" />
                                </div>
                              )}
                              {message.status === "read" && (
                                <div className="relative text-blue-400">
                                  <Check className="h-3 w-3" />
                                  <Check className="h-3 w-3 absolute -left-1 top-0" />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[70%]">
                    <Avatar className="h-8 w-8 mt-1 border border-white/20">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback className="bg-blue-700 text-white text-xs">
                        {selectedUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="p-3 rounded-lg bg-white/10 text-white">
                      <div className="flex gap-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                          •
                        </span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                          •
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Paperclip className="h-5 w-5" />
                </Button>

                <Textarea
                  className="bg-white/10 border-white/20 text-white resize-none min-h-[60px]"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                />

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10 w-10 p-0"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-white/50">
            <MessageSquare className="h-16 w-16 mb-4 opacity-20" />
            <h2 className="text-xl font-medium text-white mb-2">Select a conversation</h2>
            <p className="text-sm">Choose a user from the list to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

