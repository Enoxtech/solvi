"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, Search, HelpCircle, Book, FileText, MessageSquare, Phone, Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Import WhatsApp icon
import { PhoneIcon as WhatsApp } from "lucide-react"

// FAQ categories
const categories = [
  {
    id: "general",
    title: "General",
    icon: HelpCircle,
    color: "bg-blue-500",
  },
  {
    id: "account",
    title: "Account & Security",
    icon: Book,
    color: "bg-green-500",
  },
  {
    id: "transactions",
    title: "Transactions",
    icon: FileText,
    color: "bg-amber-500",
  },
  {
    id: "support",
    title: "Support",
    icon: MessageSquare,
    color: "bg-purple-500",
  },
]

// FAQ items
const faqs = [
  {
    id: "1",
    category: "general",
    question: "What is SOLVI?",
    answer:
      "SOLVI is a multifunctional companion app for Nigerian entrepreneurs, offering services like currency exchange, logistics, bill payments, and more.",
  },
  {
    id: "2",
    category: "general",
    question: "How do I get started with SOLVI?",
    answer:
      "To get started, create an account, verify your identity, and fund your wallet. You can then access all our services from the dashboard.",
  },
  {
    id: "3",
    category: "account",
    question: "How do I change my password?",
    answer:
      "Go to Profile > Change Password to update your password. You'll need to enter your current password for security verification.",
  },
  {
    id: "4",
    category: "account",
    question: "How do I enable two-factor authentication?",
    answer: "Go to Profile > Two-Factor Authentication and follow the instructions to enhance your account security.",
  },
  {
    id: "5",
    category: "transactions",
    question: "How do I buy RMB?",
    answer:
      "Go to Currency Exchange, enter the amount you want to buy, and follow the prompts to complete your purchase.",
  },
  {
    id: "6",
    category: "transactions",
    question: "What's the current exchange rate?",
    answer:
      "The current exchange rate is displayed on the Currency Exchange page. Rates are updated regularly throughout the day.",
  },
  {
    id: "7",
    category: "transactions",
    question: "How long do transactions take?",
    answer:
      "Most transactions are processed within 5 minutes during business hours (9am to 5pm). Outside these hours, it may take longer.",
  },
  {
    id: "8",
    category: "support",
    question: "How do I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@solvi.com or by phone at +234 123 456 7890.",
  },
]

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === null || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white">
        <Link href="/" className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold">Help Center</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 pb-32 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10 pr-4 py-6 rounded-2xl"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <motion.div key={category.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Card
                  className={cn(
                    "bg-white/10 backdrop-blur-md border-0 shadow-lg cursor-pointer transition-all",
                    selectedCategory === category.id && "ring-2 ring-white",
                  )}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3 mt-2",
                        category.color,
                      )}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white font-medium">{category.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              {selectedCategory
                ? `${categories.find((c) => c.id === selectedCategory)?.title} FAQs`
                : searchQuery
                  ? "Search Results"
                  : "Frequently Asked Questions"}
            </h2>

            {filteredFaqs.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg p-6 text-center">
                <HelpCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or category filter, or ask our AI assistant for help.
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg overflow-hidden">
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900">{faq.question}</h3>
                          <ChevronRight
                            className={cn(
                              "h-5 w-5 text-gray-500 transition-transform",
                              expandedFaq === faq.id && "transform rotate-90",
                            )}
                          />
                        </div>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t border-gray-100"
                          >
                            <p className="text-gray-600">{faq.answer}</p>
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Options */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 mt-2">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Phone Support</h3>
                  <p className="text-sm text-gray-600 mb-3">Available 9am-5pm</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Call Us</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 mt-2">
                    <WhatsApp className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">WhatsApp Support</h3>
                  <p className="text-sm text-gray-600 mb-3">Quick Responses</p>
                  <Button className="w-full bg-green-500 hover:bg-green-600">WhatsApp Us</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 mt-2">
                    <Mail className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-3">24/7 Response</p>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Email Us</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Assistant Prompt */}
          <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need more help?</h3>
              <p className="text-gray-600 mb-4">
                Our AI assistant is available 24/7 to answer your questions and provide support.
              </p>
              <Button
                className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={() => {
                  // Find the AI assistant button and click it
                  const aiAssistantButton = document.querySelector(".ai-assistant-trigger") as HTMLButtonElement
                  if (aiAssistantButton) {
                    aiAssistantButton.click()
                  } else {
                    // If the button isn't found, try to find the actual component
                    const aiAssistantWidget = document.querySelector(".ai-assistant-widget") as HTMLButtonElement
                    if (aiAssistantWidget) {
                      aiAssistantWidget.click()
                    }
                  }
                }}
              >
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

