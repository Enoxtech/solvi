"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { HelpCircle, Search, MessageSquare, FileText, Book, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

interface FAQItem {
  question: string
  answer: string
}

interface GuideItem {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

export default function AdminSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs: FAQItem[] = [
    {
      question: "How do I reset a user's password?",
      answer:
        "Navigate to User Management, find the user, click on the options menu, and select 'Reset Password'. You can either set a temporary password or send a reset link to the user's email.",
    },
    {
      question: "How can I monitor system performance?",
      answer:
        "Go to the System Health section in the admin dashboard. There you can view real-time metrics, set up alerts, and access historical performance data.",
    },
    {
      question: "What permissions do I need to modify API settings?",
      answer:
        "You need Administrator or API Manager role to modify API settings. If you don't have access, please contact your system administrator.",
    },
    {
      question: "How do I generate custom reports?",
      answer:
        "In the Analytics section, click on 'Custom Reports'. You can select metrics, date ranges, and export formats to create tailored reports for your needs.",
    },
    {
      question: "Can I schedule system maintenance?",
      answer:
        "Yes, in the System Health section, navigate to 'Maintenance' and use the scheduler to set up maintenance windows. The system will automatically notify users.",
    },
  ]

  const guides: GuideItem[] = [
    {
      title: "User Management Guide",
      description: "Learn how to manage users, roles, and permissions",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      link: "/admin/support/guides/user-management",
    },
    {
      title: "Transaction Processing",
      description: "Understand the transaction lifecycle and troubleshooting",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      link: "/admin/support/guides/transactions",
    },
    {
      title: "API Documentation",
      description: "Comprehensive API reference and integration guides",
      icon: <Book className="h-6 w-6 text-purple-500" />,
      link: "/admin/support/guides/api",
    },
    {
      title: "Security Best Practices",
      description: "Ensure your admin account and system remain secure",
      icon: <FileText className="h-6 w-6 text-red-500" />,
      link: "/admin/support/guides/security",
    },
  ]

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-screen bg-primary-950">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto p-6 bg-primary-900">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-2xl font-bold text-white mb-6">Admin Support Center</h1>

              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20 blur-lg"></div>
                <Card className="bg-primary-800/70 border-white/10 relative overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white">How can we help you today?</CardTitle>
                    <CardDescription className="text-white/70">
                      Search our knowledge base or contact support
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                      <Input
                        placeholder="Search for help articles, guides, or FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/10 border-white/10 text-white placeholder:text-white/50 h-12"
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-auto py-3 px-4 border-white/20 text-white hover:bg-white/10 justify-start"
                      >
                        <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                        <div className="text-left">
                          <div className="font-medium">Contact Support</div>
                          <div className="text-xs text-white/70">Get help from our support team</div>
                        </div>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-auto py-3 px-4 border-white/20 text-white hover:bg-white/10 justify-start"
                      >
                        <HelpCircle className="h-5 w-5 mr-2 text-purple-400" />
                        <div className="text-left">
                          <div className="font-medium">Live Chat</div>
                          <div className="text-xs text-white/70">Chat with a support agent</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-primary-800/50 border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
                      <CardDescription className="text-white/70">Quick answers to common questions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {filteredFAQs.length > 0 ? (
                        <div className="space-y-4">
                          {filteredFAQs.map((faq, index) => (
                            <div key={index} className="border border-white/10 rounded-lg p-4 bg-primary-700/30">
                              <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                              <p className="text-white/70 text-sm">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <HelpCircle className="h-10 w-10 mx-auto text-white/20 mb-2" />
                          <p className="text-white/50">
                            No FAQs match your search. Try different keywords or contact support.
                          </p>
                        </div>
                      )}
                    </CardContent>
                    {filteredFAQs.length > 0 && (
                      <CardFooter className="pt-0">
                        <Button variant="link" className="text-primary hover:text-primary/80">
                          View all FAQs <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardFooter>
                    )}
                  </Card>

                  <Card className="bg-primary-800/50 border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Admin Guides</CardTitle>
                      <CardDescription className="text-white/70">Comprehensive guides for admin tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {guides.map((guide, index) => (
                          <a
                            key={index}
                            href={guide.link}
                            className="block border border-white/10 rounded-lg p-4 bg-primary-700/30 hover:bg-primary-700/50 transition-colors"
                          >
                            <div className="flex items-start">
                              <div className="mr-3 mt-1">{guide.icon}</div>
                              <div>
                                <h3 className="text-white font-medium mb-1">{guide.title}</h3>
                                <p className="text-white/70 text-sm">{guide.description}</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="link" className="text-primary hover:text-primary/80">
                        Browse all guides <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-primary-800/50 border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Support Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Monday - Friday</span>
                          <span className="text-white">9:00 AM - 8:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Saturday</span>
                          <span className="text-white">10:00 AM - 6:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Sunday</span>
                          <span className="text-white">Closed</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-green-400 text-sm font-medium">Support is currently online</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary-800/50 border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white">Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center text-primary hover:text-primary/80">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>Admin Documentation</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                        <a href="#" className="flex items-center text-primary hover:text-primary/80">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>API Reference</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                        <a href="#" className="flex items-center text-primary hover:text-primary/80">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>Release Notes</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                        <a href="#" className="flex items-center text-primary hover:text-primary/80">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>Community Forum</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-white mb-2">Need urgent help?</h3>
                      <p className="text-white/70 text-sm mb-4">
                        For critical issues requiring immediate attention, please use our priority support channel.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Priority Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

