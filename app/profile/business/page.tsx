"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProfileLayout } from "@/components/ProfileLayout"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const businessCategories = ["Retail", "E-commerce", "Manufacturing", "Services", "Technology", "Others"]

export default function BusinessInformation() {
  const [formData, setFormData] = useState({
    businessName: "shopprime1",
    email: "skybondnyc@gmail.com",
    category: "",
    address: "No 14 Tanzania Road Barnawa",
    isRegistered: "",
  })
  const { toast } = useToast()

  const handleSubmit = () => {
    toast({
      title: "Success",
      description: "Business information updated successfully",
    })
  }

  return (
    <ProfileLayout title="Business Information" backLink="/profile">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto p-10 space-y-6 mt-10 mb-10">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Business Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Store address (Optional)</Label>
            <div className="relative">
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-gray-50 pr-10"
              />
              {formData.address && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                  onClick={() => setFormData({ ...formData, address: "" })}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Is your business registered with the CAC?</Label>
            <RadioGroup
              value={formData.isRegistered}
              onValueChange={(value) => setFormData({ ...formData, isRegistered: value })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-full">
          Update Details
        </Button>
      </motion.div>
    </ProfileLayout>
  )
}

