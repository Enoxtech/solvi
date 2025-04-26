"use client"

import { motion } from "framer-motion"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfileLayout } from "@/components/ProfileLayout"

export default function ManageCards() {
  return (
    <ProfileLayout title="Manage Cards" backLink="/profile">
      <div className="max-w-lg mx-auto p-10 flex flex-col items-center justify-center mt-10 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Your cards will show up here</h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Add a debit or credit card to make payments faster and easier
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white">Add New Card</Button>
        </motion.div>
      </div>
    </ProfileLayout>
  )
}

