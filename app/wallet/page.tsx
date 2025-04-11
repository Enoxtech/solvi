import { ArrowRightLeft, User, Wallet } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function WalletPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Wallet & BNPL</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/wallet/transfer">
          <Card className="bg-white hover:bg-gray-50 transition-colors p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRightLeft className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Transfer Funds</h2>
                <p className="text-sm text-gray-600">Transfer to bank accounts</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/wallet/send-to-user">
          <Card className="bg-white hover:bg-gray-50 transition-colors p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Send to User</h2>
                <p className="text-sm text-gray-600">Send money using User ID</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/wallet/withdraw-funds">
          <Card className="bg-white hover:bg-gray-50 transition-colors p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Withdraw Funds</h2>
                <p className="text-sm text-gray-600">Withdraw to bank account</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  )
}

