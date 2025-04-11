"use client"

import { useState, useEffect } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileLayout } from "@/components/ProfileLayout"
import { generateUserId } from "@/utils/generateUserId"
import { useToast } from "@/components/ui/use-toast"

export default function UserIdPage() {
  const [userId, setUserId] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Generate a user ID on initial load
    setUserId(generateUserId("John", "Doe"))
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(userId)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "User ID has been copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerate = () => {
    setIsGenerating(true)
    // Simulate a delay for better UX
    setTimeout(() => {
      setUserId(generateUserId("John", "Doe"))
      setIsGenerating(false)
      toast({
        title: "ID Regenerated",
        description: "Your unique user ID has been updated.",
      })
    }, 800)
  }

  return (
    <ProfileLayout title="User ID" backUrl="/profile">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Your Unique User ID</CardTitle>
            <CardDescription>
              This is your unique identifier in the Velocia system. You can share this ID with others to receive
              payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div className="font-mono text-lg font-semibold text-primary">{userId}</div>
              <Button variant="ghost" size="icon" onClick={handleCopy} disabled={copied}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Your user ID is a combination of your name and a unique identifier. It cannot be changed manually, but you
              can regenerate it if needed.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleRegenerate}
              disabled={isGenerating}
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Regenerate ID"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ProfileLayout>
  )
}

