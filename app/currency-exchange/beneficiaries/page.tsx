"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Beneficiary {
  id: string
  name: string
  alipayId: string
  qrCodeUrl: string
}

export default function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("beneficiaries")
    if (stored) {
      setBeneficiaries(JSON.parse(stored))
    }
  }, [])

  const handleDelete = (id: string) => {
    const updated = beneficiaries.filter((b) => b.id !== id)
    setBeneficiaries(updated)
    localStorage.setItem("beneficiaries", JSON.stringify(updated))
    setDeleteId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-blue-600/80">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/currency-exchange/send-to" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">Beneficiaries</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 max-w-lg mx-auto">
        <AnimatePresence mode="popLayout">
          {beneficiaries.length > 0 ? (
            <motion.div className="space-y-4">
              {beneficiaries.map((beneficiary) => (
                <motion.div
                  key={beneficiary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card className="bg-white/90 backdrop-blur-md border-0 shadow-lg">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/alipay-logo.png"
                            alt="Alipay"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{beneficiary.name}</h3>
                          <p className="text-sm text-gray-500">ID: {beneficiary.alipayId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(beneficiary.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        <Link href={`/currency-exchange/send-to?beneficiary=${beneficiary.id}`}>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-white"
            >
              <p className="text-xl font-medium mb-2">No beneficiaries yet</p>
              <p className="text-white/80">Save a beneficiary when sending RMB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Beneficiary</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this beneficiary? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

