import { DollarSign } from "lucide-react"
import { getRmbRate } from "@/app/actions/rmbRates"

export async function RmbRateDisplay() {
  const rmbRate = await getRmbRate()

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Current RMB Rate</h3>
          <p className="text-2xl font-bold">₦{rmbRate.rate.toFixed(2)}</p>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <DollarSign className="h-6 w-6 text-primary" />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Last updated: {new Date(rmbRate.lastUpdated).toLocaleString()}
      </p>
    </div>
  )
}

