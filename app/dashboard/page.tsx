import Dashboard from "@/components/Dashboard"
import { WalletProvider } from "@/contexts/WalletContext"
import { CurrencyProvider } from "@/contexts/CurrencyContext"
import { NotificationProvider } from "@/contexts/NotificationContext"

export default function DashboardPage() {
  return (
    <WalletProvider>
      <CurrencyProvider>
        <NotificationProvider>
          <Dashboard />
        </NotificationProvider>
      </CurrencyProvider>
    </WalletProvider>
  )
}

