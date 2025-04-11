"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileLayout } from "@/components/ProfileLayout"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Why we need your BVN?",
    answer:
      "Your BVN helps us verify your identity and ensure the security of your account. It's a requirement for all financial services in Nigeria.",
  },
  {
    question: "What details are you verifying with my BVN?",
    answer:
      "We verify your full name, date of birth, and phone number to ensure they match our records. We do not have access to your bank accounts or transactions.",
  },
  {
    question: "What do I do if BVN verification fails?",
    answer:
      "If verification fails, please ensure you entered the correct BVN. If the problem persists, contact our support team with a screenshot of the error message.",
  },
]

export default function BVNVerification() {
  const [bvn, setBvn] = useState("")
  const { toast } = useToast()

  const handleVerify = () => {
    if (!bvn || bvn.length !== 11) {
      toast({
        title: "Invalid BVN",
        description: "Please enter a valid 11-digit BVN",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Verification in progress",
      description: "Please wait while we verify your BVN",
    })
    // Here you would make an API call to verify the BVN
  }

  return (
    <ProfileLayout title="Identity Verification" backLink="/profile/kyc">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">BVN</h2>
          <p className="text-gray-600 mt-1">Enter your Bank Verification Number</p>
        </div>

        <div className="space-y-6">
          <Input
            value={bvn}
            onChange={(e) => setBvn(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="Enter BVN"
            className="h-14 bg-gray-50 border-2 border-gray-200 rounded-full text-lg"
          />

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl bg-orange-50/50">
                <AccordionTrigger className="px-4 py-3 text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Button onClick={handleVerify} className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full">
          Verify
        </Button>
      </div>
    </ProfileLayout>
  )
}

