"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function PaymentTabs({ activeTab, setActiveTab }: PaymentTabsProps) {
  return (
    <Tabs defaultValue="beneficiary" className="w-full mt-8" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 bg-white/10 rounded-xl p-1">
        <TabsTrigger
          value="beneficiary"
          className={`rounded-lg ${activeTab === "beneficiary" ? "bg-primary text-white" : "text-white/70"}`}
        >
          Beneficiary
        </TabsTrigger>
        <TabsTrigger
          value="frequent"
          className={`rounded-lg ${activeTab === "frequent" ? "bg-primary text-white" : "text-white/70"}`}
        >
          Frequent pay
        </TabsTrigger>
      </TabsList>
      <TabsContent value="beneficiary" className="mt-4">
        <Card className="bg-white/5 backdrop-blur-sm border-0 p-6 rounded-xl">
          <p className="text-white/70 text-center">You haven&apos;t added any beneficiary yet</p>
        </Card>
      </TabsContent>
      <TabsContent value="frequent" className="mt-4">
        <Card className="bg-white/5 backdrop-blur-sm border-0 p-6 rounded-xl">
          <p className="text-white/70 text-center">No frequent payments yet</p>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

