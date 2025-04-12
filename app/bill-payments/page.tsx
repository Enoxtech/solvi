"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Wifi,
  Phone,
  Tv,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Search,
  Radio,
  Lightbulb,
  Repeat,
  Dice6,
  GraduationCap,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ServiceCard } from "./components/service-card"
import { ProviderDialog } from "./components/provider-dialog"
import { useWallet } from "@/contexts/WalletContext"
import { TransactionHistory } from "./components/transaction-history"
import { useRouter } from "next/navigation"
import { PageBackground } from "@/components/PageBackground"

const services = [
  {
    icon: <Phone className="h-8 w-8 text-white" />,
    label: "Airtime Top-up",
    color: "before:from-green-500 before:to-green-600",
    type: "airtime",
  },
  {
    icon: <Wifi className="h-8 w-8 text-white" />,
    label: "Buy Data",
    color: "before:from-blue-500 before:to-blue-600",
    type: "data",
  },
  {
    icon: <Tv className="h-8 w-8 text-white" />,
    label: "Cable Subscription",
    color: "before:from-purple-500 before:to-purple-600",
    type: "tv",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    label: "Utility Payment",
    color: "before:from-yellow-500 before:to-yellow-600",
    type: "utility",
  },
  {
    icon: <Radio className="h-8 w-8 text-white" />,
    label: "Internet Bill",
    color: "before:from-pink-500 before:to-pink-600",
    type: "internet",
  },
  {
    icon: <Dice6 className="h-8 w-8 text-white" />,
    label: "Betting",
    color: "before:from-red-500 before:to-red-600",
    type: "betting",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-white" />,
    label: "Examination",
    color: "before:from-teal-500 before:to-teal-600",
    type: "examination",
  },
]

export default function BillPayments() {
  const { formattedBalance } = useWallet()
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState<
    "data" | "airtime" | "tv" | "utility" | "betting" | "examination" | null
  >(null)

  const router = useRouter()

  const filteredServices = services.filter((service) => service.label.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleServiceClick = (type: "data" | "airtime" | "tv" | "utility" | "betting" | "examination" | string) => {
    if (type === "data") {
      router.push("/bill-payments/data")
    } else if (type === "airtime") {
      router.push("/bill-payments/airtime")
    } else if (type === "tv") {
      router.push("/bill-payments/tv")
    } else if (type === "utility") {
      router.push("/bill-payments/utility/electricity")
    } else if (type === "betting") {
      router.push("/bill-payments/betting")
    } else if (type === "examination") {
      router.push("/bill-payments/examination")
    } else {
      setSelectedServiceType(null)
      setDialogOpen(true)
    }
  }

  const handleProviderSelect = (provider: any) => {
    // Handle provider selection
    console.log("Selected provider:", provider)
  }

  return (
    <div className="min-h-screen relative">
      <PageBackground />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white text-center flex-1">Bill Payments</h1>
          <div className="w-6"></div>
        </motion.div>

        {/* Wallet Balance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 rounded-2xl shadow-lg shadow-black/30">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm opacity-80">Wallet Balance:</span>
              <span className="font-bold text-lg">{formattedBalance}</span>
            </div>
          </Card>
        </motion.div>

        {/* Search Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 relative">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10 pr-4 py-6 rounded-2xl"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ServiceCard
                icon={service.icon}
                label={service.label}
                color={service.color}
                onClick={() => handleServiceClick(service.type)}
              />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <Card className="bg-white/5 backdrop-blur-sm border-0 shadow-lg shadow-black/30">
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <Button variant="outline" className="bg-white/10 text-white border-0 hover:bg-white/20 py-6 rounded-xl">
                <Repeat className="h-5 w-5 mr-2" />
                Repeat Transaction
              </Button>
              <Button variant="outline" className="bg-white/10 text-white border-0 hover:bg-white/20 py-6 rounded-xl">
                <ChevronRight className="h-5 w-5 ml-2" />
                View History
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Transaction History</h2>
          <TransactionHistory />
        </motion.div>

        {/* Provider Selection Dialog */}
        {selectedServiceType && (
          <ProviderDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            type={selectedServiceType}
            onSelect={handleProviderSelect}
          />
        )}
      </div>
    </div>
  )
}

