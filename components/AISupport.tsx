"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const AISupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")

    // TODO: Implement actual AI chat logic here
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: "This is a placeholder AI response." }])
    }, 1000)
  }

  return (
    <>
      <Button className="fixed bottom-20 right-6 rounded-full p-4 shadow-lg" onClick={() => setIsOpen(true)}>
        <MessageSquare className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 w-96"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Support</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${message.role === "user" ? "bg-primary-100 ml-auto" : "bg-gray-100"}`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button onClick={handleSend}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

