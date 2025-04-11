"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Minimize2, Maximize2, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Sample suggestions for the AI assistant
const SUGGESTIONS = [
  "How do I buy RMB?",
  "What's the current exchange rate?",
  "How do I track my order?",
  "How to fund my wallet?",
  "What payment methods do you accept?",
  "How to contact support?",
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi there! I'm SOLVI AI Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, isMinimized])

  // Adjust height on mobile
  useEffect(() => {
    const adjustHeight = () => {
      if (chatContainerRef.current) {
        const viewportHeight = window.innerHeight
        const bottomNavHeight = 80 // Approximate height of bottom nav
        const maxHeight = viewportHeight - bottomNavHeight - 40 // 40px for padding

        if (window.innerWidth < 640) {
          // Mobile
          chatContainerRef.current.style.height = `${Math.min(400, maxHeight)}px`
        }
      }
    }

    if (isOpen && !isMinimized) {
      adjustHeight()
      window.addEventListener("resize", adjustHeight)
      return () => window.removeEventListener("resize", adjustHeight)
    }
  }, [isOpen, isMinimized])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let response = ""

      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes("exchange rate")) {
        response = "The current exchange rate is 1 RMB = 209.6 NGN. Rates are updated every 30 minutes."
      } else if (input.toLowerCase().includes("buy rmb")) {
        response =
          "To buy RMB, go to the Currency Exchange page, enter the amount you want to buy, and click 'Buy RMB'. You'll need to provide recipient details for the transaction."
      } else if (input.toLowerCase().includes("fund") || input.toLowerCase().includes("wallet")) {
        response =
          "You can fund your wallet by bank transfer or card payment. Go to your wallet and click 'Fund Wallet' to see available options."
      } else if (input.toLowerCase().includes("track") || input.toLowerCase().includes("order")) {
        response =
          "You can track your orders in the Transactions page. Each transaction has a status that shows whether it's pending, completed, or failed."
      } else {
        response =
          "I understand you're asking about " +
          input +
          ". Let me help you with that. Could you provide more details so I can assist you better?"
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion)
    handleSend()
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating button */}
      <div className="relative ai-assistant-widget">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed bottom-24 right-4 z-50 sm:bottom-6 sm:right-6"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(124, 58, 237, 0)",
                    "0 0 0 10px rgba(124, 58, 237, 0.2)",
                    "0 0 0 15px rgba(124, 58, 237, 0)",
                  ],
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-accent hover:bg-accent-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ai-assistant-trigger"
                >
                  <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 right-2 z-50 sm:bottom-6 sm:right-6"
            >
              <Card
                ref={chatContainerRef}
                className={cn(
                  "w-[calc(100vw-16px)] max-w-[320px] bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden transition-all duration-300",
                  isMinimized ? "h-12" : "sm:h-[400px]",
                )}
                style={!isMinimized ? { height: "min(400px, 60vh)" } : undefined}
              >
                <CardHeader className="p-3 bg-gradient-to-r from-primary to-primary/90 text-white flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8 bg-white/20">
                      <AvatarImage src="/ai-assistant.png" alt="AI" />
                      <AvatarFallback>
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-sm sm:text-base font-medium">SOLVI AI Assistant</CardTitle>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMinimize}
                      className="h-6 w-6 sm:h-7 sm:w-7 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                    >
                      {isMinimized ? (
                        <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-6 w-6 sm:h-7 sm:w-7 rounded-full text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {!isMinimized && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-[calc(100%-6rem)]"
                    >
                      <CardContent className="p-0 flex-1 overflow-hidden">
                        {/* Messages */}
                        <div className="h-full overflow-y-auto p-3 space-y-3">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                            >
                              {message.role === "assistant" && (
                                <Avatar className="h-6 w-6 mr-1.5 mt-0.5 sm:h-8 sm:w-8 sm:mr-2 sm:mt-1">
                                  <AvatarImage src="/ai-assistant.png" alt="AI" />
                                  <AvatarFallback>
                                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={cn(
                                  "max-w-[80%] rounded-2xl px-2.5 py-1.5 text-xs sm:text-sm sm:px-3 sm:py-2",
                                  message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800",
                                )}
                              >
                                {message.content}
                              </div>
                            </motion.div>
                          ))}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <Avatar className="h-6 w-6 mr-1.5 mt-0.5 sm:h-8 sm:w-8 sm:mr-2 sm:mt-1">
                                <AvatarImage src="/ai-assistant.png" alt="AI" />
                                <AvatarFallback>
                                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-gray-100 rounded-2xl px-2.5 py-1.5 text-xs sm:px-3 sm:py-2">
                                <div className="flex items-center gap-1">
                                  <div
                                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                  ></div>
                                  <div
                                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                  ></div>
                                  <div
                                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                  ></div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length < 3 && (
                          <div className="px-3 pb-1.5">
                            <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5">Suggested questions:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {SUGGESTIONS.slice(0, 3).map((suggestion) => (
                                <Button
                                  key={suggestion}
                                  variant="outline"
                                  size="sm"
                                  className="text-[10px] py-0.5 h-auto bg-gray-50 hover:bg-gray-100 text-gray-700"
                                  onClick={() => handleSuggestion(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="p-2.5 border-t">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            handleSend()
                          }}
                          className="flex w-full items-center gap-1.5"
                        >
                          <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 h-8 text-xs bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                          />
                          <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || isTyping}
                            className="h-7 w-7 rounded-full bg-primary hover:bg-primary/90"
                          >
                            <Send className="h-3.5 w-3.5 text-white" />
                          </Button>
                        </form>
                      </CardFooter>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

