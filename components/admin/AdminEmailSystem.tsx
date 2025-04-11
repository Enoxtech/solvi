"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Send,
  Trash2,
  Star,
  Archive,
  File,
  Paperclip,
  ChevronDown,
  Search,
  Filter,
  X,
  Plus,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EmailUser {
  id: string
  name: string
  email: string
  avatar?: string
}

interface Email {
  id: string
  subject: string
  content: string
  sender: EmailUser
  recipients: EmailUser[]
  timestamp: Date
  read: boolean
  starred: boolean
  attachments: { name: string; size: string; type: string }[]
  labels: string[]
}

export function AdminEmailSystem() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [composeOpen, setComposeOpen] = useState(false)
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    message: "",
  })
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)

  // Sample users
  const users: EmailUser[] = [
    { id: "u1", name: "John Doe", email: "john.doe@example.com", avatar: "/avatars/john.png" },
    { id: "u2", name: "Sarah Williams", email: "sarah.williams@example.com", avatar: "/avatars/sarah.png" },
    { id: "u3", name: "Michael Brown", email: "michael.brown@example.com", avatar: "/avatars/michael.png" },
    { id: "u4", name: "Emily Davis", email: "emily.davis@example.com", avatar: "/avatars/emily.png" },
    { id: "u5", name: "Robert Johnson", email: "robert.johnson@example.com", avatar: "/avatars/robert.png" },
  ]

  // Sample emails
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "e1",
      subject: "Welcome to Velocia Admin",
      content: "Thank you for joining Velocia. We're excited to have you on board!",
      sender: users[0],
      recipients: [{ id: "admin", name: "Admin", email: "admin@velocia.com" }],
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
      starred: true,
      attachments: [],
      labels: ["important"],
    },
    {
      id: "e2",
      subject: "Account Verification Required",
      content: "Please verify your account to access all features of Velocia.",
      sender: users[1],
      recipients: [{ id: "admin", name: "Admin", email: "admin@velocia.com" }],
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: false,
      starred: false,
      attachments: [{ name: "verification.pdf", size: "245 KB", type: "application/pdf" }],
      labels: ["verification"],
    },
    {
      id: "e3",
      subject: "Transaction Failed",
      content: "Your recent transaction has failed. Please check your payment details.",
      sender: users[2],
      recipients: [{ id: "admin", name: "Admin", email: "admin@velocia.com" }],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: false,
      starred: true,
      attachments: [],
      labels: ["urgent", "transaction"],
    },
    {
      id: "e4",
      subject: "New Feature Request",
      content: "I would like to request a new feature for the platform. Can we discuss this?",
      sender: users[3],
      recipients: [{ id: "admin", name: "Admin", email: "admin@velocia.com" }],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      starred: false,
      attachments: [
        { name: "feature-details.docx", size: "32 KB", type: "application/docx" },
        { name: "mockup.png", size: "1.2 MB", type: "image/png" },
      ],
      labels: ["feature-request"],
    },
    {
      id: "e5",
      subject: "Invoice #INV-2023-001",
      content: "Please find attached the invoice for your recent purchase.",
      sender: users[4],
      recipients: [{ id: "admin", name: "Admin", email: "admin@velocia.com" }],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
      starred: false,
      attachments: [{ name: "invoice.pdf", size: "156 KB", type: "application/pdf" }],
      labels: ["invoice"],
    },
  ])

  // Sent emails
  const sentEmails: Email[] = [
    {
      id: "s1",
      subject: "Re: Account Verification Required",
      content: "Your account has been verified successfully. Thank you for your patience.",
      sender: { id: "admin", name: "Admin", email: "admin@velocia.com" },
      recipients: [users[1]],
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
      starred: false,
      attachments: [],
      labels: ["verification"],
    },
    {
      id: "s2",
      subject: "Monthly Newsletter",
      content: "Here's your monthly update on what's new at Velocia.",
      sender: { id: "admin", name: "Admin", email: "admin@velocia.com" },
      recipients: users,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
      starred: false,
      attachments: [{ name: "newsletter.pdf", size: "2.3 MB", type: "application/pdf" }],
      labels: ["newsletter"],
    },
  ]

  // Toggle email selection
  const toggleEmailSelection = (emailId: string) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId))
    } else {
      setSelectedEmails([...selectedEmails, emailId])
    }
  }

  // Toggle star status
  const toggleStarred = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, starred: !email.starred } : email)))
  }

  // Mark email as read
  const markAsRead = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, read: true } : email)))
  }

  // Delete selected emails
  const deleteSelectedEmails = () => {
    setEmails(emails.filter((email) => !selectedEmails.includes(email.id)))
    setSelectedEmails([])
  }

  // Send email
  const sendEmail = () => {
    const newEmail: Email = {
      id: `s${sentEmails.length + 1}`,
      subject: composeData.subject,
      content: composeData.message,
      sender: { id: "admin", name: "Admin", email: "admin@velocia.com" },
      recipients: [{ id: "recipient", name: "Recipient", email: composeData.to }],
      timestamp: new Date(),
      read: true,
      starred: false,
      attachments: [],
      labels: [],
    }

    // Add to sent emails
    setEmails([...emails])

    // Reset compose form
    setComposeData({
      to: "",
      subject: "",
      message: "",
    })

    // Close compose window
    setComposeOpen(false)
  }

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInDays < 7) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return days[date.getDay()]
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Get displayed emails based on active tab
  const getDisplayedEmails = () => {
    let displayedEmails: Email[] = []

    switch (activeTab) {
      case "inbox":
        displayedEmails = emails
        break
      case "sent":
        displayedEmails = sentEmails
        break
      case "starred":
        displayedEmails = emails.filter((email) => email.starred)
        break
      case "unread":
        displayedEmails = emails.filter((email) => !email.read)
        break
      default:
        displayedEmails = emails
    }

    // Apply search filter
    if (searchQuery) {
      displayedEmails = displayedEmails.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.sender.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return displayedEmails
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden h-[calc(100vh-10rem)]">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 bg-white/5 p-4 flex flex-col">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white mb-4 w-full" onClick={() => setComposeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </Button>

          <Tabs defaultValue="inbox" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-1 w-full bg-transparent">
              <TabsTrigger
                value="inbox"
                className="justify-start px-2 py-1.5 h-auto data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
              >
                <Mail className="mr-2 h-4 w-4" />
                Inbox
                <Badge className="ml-auto bg-blue-600 text-white">{emails.filter((e) => !e.read).length}</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="justify-start px-2 py-1.5 h-auto data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
              >
                <Send className="mr-2 h-4 w-4" />
                Sent
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                className="justify-start px-2 py-1.5 h-auto data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
              >
                <Star className="mr-2 h-4 w-4" />
                Starred
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="justify-start px-2 py-1.5 h-auto data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
              >
                <Mail className="mr-2 h-4 w-4" />
                Unread
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-6">
            <h3 className="text-white/70 text-xs font-medium mb-2 px-2">LABELS</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-auto text-white/70 hover:text-white hover:bg-white/10"
              >
                <Badge className="bg-red-500 h-2 w-2 rounded-full p-0 mr-2" />
                Important
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-auto text-white/70 hover:text-white hover:bg-white/10"
              >
                <Badge className="bg-yellow-500 h-2 w-2 rounded-full p-0 mr-2" />
                Work
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-auto text-white/70 hover:text-white hover:bg-white/10"
              >
                <Badge className="bg-green-500 h-2 w-2 rounded-full p-0 mr-2" />
                Personal
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-auto text-white/70 hover:text-white hover:bg-white/10"
              >
                <Badge className="bg-blue-500 h-2 w-2 rounded-full p-0 mr-2" />
                Verification
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="p-2 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                checked={selectedEmails.length > 0 && selectedEmails.length === getDisplayedEmails().length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedEmails(getDisplayedEmails().map((email) => email.id))
                  } else {
                    setSelectedEmails([])
                  }
                }}
                className="mr-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />

              {selectedEmails.length > 0 ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={deleteSelectedEmails}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <span className="text-white/70 text-xs ml-2">{selectedEmails.length} selected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                <Input
                  placeholder="Search emails..."
                  className="pl-8 bg-white/10 border-white/20 text-white w-64 h-8 focus:ring-blue-400 focus:border-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Email list */}
          {!selectedEmail ? (
            <div className="flex-1 overflow-y-auto">
              {getDisplayedEmails().length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <Mail className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium">No emails found</p>
                  <p className="text-sm">Your {activeTab} is empty</p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {getDisplayedEmails().map((email) => (
                    <div
                      key={email.id}
                      className={`flex items-center p-3 hover:bg-white/5 cursor-pointer ${!email.read ? "bg-white/5" : ""}`}
                      onClick={() => {
                        setSelectedEmail(email)
                        markAsRead(email.id)
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Checkbox
                          checked={selectedEmails.includes(email.id)}
                          onCheckedChange={() => toggleEmailSelection(email.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />

                        <Button
                          variant="ghost"
                          size="icon"
                          className={`text-white/70 hover:text-white hover:bg-white/10 ${email.starred ? "text-yellow-400 hover:text-yellow-300" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStarred(email.id)
                          }}
                        >
                          <Star className="h-4 w-4" fill={email.starred ? "currentColor" : "none"} />
                        </Button>

                        <Avatar className="h-8 w-8 border border-white/20">
                          <AvatarImage src={email.sender.avatar} alt={email.sender.name} />
                          <AvatarFallback className="bg-blue-700 text-white">
                            {email.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between items-baseline">
                            <p
                              className={`text-sm truncate ${!email.read ? "font-semibold text-white" : "text-white/80"}`}
                            >
                              {activeTab === "sent" ? email.recipients[0].name : email.sender.name}
                            </p>
                            <p className="text-xs text-white/50 ml-2 shrink-0">{formatDate(email.timestamp)}</p>
                          </div>
                          <p className={`text-sm truncate ${!email.read ? "font-medium text-white" : "text-white/70"}`}>
                            {email.subject}
                          </p>
                          <p className="text-xs truncate text-white/50">{email.content}</p>
                        </div>

                        {email.attachments.length > 0 && <Paperclip className="h-4 w-4 text-white/50 shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => setSelectedEmail(null)}
                >
                  <ChevronDown className="h-4 w-4 rotate-90 mr-2" />
                  Back
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => toggleStarred(selectedEmail.id)}
                  >
                    <Star className="h-4 w-4" fill={selectedEmail.starred ? "currentColor" : "none"} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => {
                      setEmails(emails.filter((email) => email.id !== selectedEmail.id))
                      setSelectedEmail(null)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 border border-white/20">
                      <AvatarImage src={selectedEmail.sender.avatar} alt={selectedEmail.sender.name} />
                      <AvatarFallback className="bg-blue-700 text-white">
                        {selectedEmail.sender.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h2 className="text-lg font-semibold text-white">{selectedEmail.subject}</h2>
                      <div className="flex items-center text-sm text-white/70">
                        <span className="font-medium">{selectedEmail.sender.name}</span>
                        <span className="mx-1 text-white/50">&lt;{selectedEmail.sender.email}&gt;</span>
                      </div>
                      <div className="text-xs text-white/50 mt-1">
                        To: {selectedEmail.recipients.map((r) => r.name).join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-white/50">{selectedEmail.timestamp.toLocaleString()}</div>
                </div>

                <div className="text-white/80 whitespace-pre-line mb-6 border-b border-white/10 pb-6">
                  {selectedEmail.content}
                </div>

                {selectedEmail.attachments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white mb-2">
                      Attachments ({selectedEmail.attachments.length})
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedEmail.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-white/10 rounded-lg border border-white/20"
                        >
                          <File className="h-5 w-5 text-white/70" />
                          <div>
                            <p className="text-sm text-white">{attachment.name}</p>
                            <p className="text-xs text-white/50">{attachment.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose email modal */}
      {composeOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary-900/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">New Message</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setComposeOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-white/70 w-16">To:</label>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.email}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-blue-700 text-white text-xs">
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-white/70 w-16">Subject:</label>
                  <Input
                    className="bg-white/10 border-white/20 text-white"
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <Textarea
                    className="bg-white/10 border-white/20 text-white min-h-[200px]"
                    placeholder="Write your message here..."
                    value={composeData.message}
                    onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setComposeOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={sendEmail}>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

