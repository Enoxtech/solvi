import { getRmbRate } from "@/app/actions/rmbRates"
import { RmbRateEditor } from "@/components/admin/rmb-rate-editor"
import { RmbRateHistory } from "@/components/admin/rmb-rate-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Clock, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default async function RmbRatesPage() {
  const rmbRate = await getRmbRate()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">RMB Rate Management</h1>
        <p className="text-purple-300">Manage and update RMB to Naira exchange rates</p>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-1">
          <TabsTrigger
            value="current"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            Current Rate
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            Rate History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card className="border-purple-800/30 bg-gradient-to-br from-purple-950 to-blue-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-purple-400" />
                Current RMB Rate
              </CardTitle>
              <CardDescription className="text-purple-300">
                Update the current RMB to Naira exchange rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RmbRateEditor initialRate={rmbRate.rate} lastUpdated={rmbRate.lastUpdated} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-purple-800/30 bg-gradient-to-br from-purple-950 to-blue-950 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-purple-400" />
                Rate History
              </CardTitle>
              <CardDescription className="text-purple-300">View historical RMB rate changes</CardDescription>
            </CardHeader>
            <CardContent>
              <RmbRateHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-purple-800/30 bg-gradient-to-br from-purple-950 to-blue-950 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Rate Impact Analysis
            </CardTitle>
            <CardDescription className="text-purple-300">Analyze how rate changes affect transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-purple-300">
              This section shows how rate changes impact transactions and user balances. The data is synchronized with
              the user-facing currency exchange system in real-time.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-purple-300">Daily Transactions</p>
                <p className="text-2xl font-bold text-white">1,245</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-sm text-purple-300">Average Amount</p>
                <p className="text-2xl font-bold text-white">₦125,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-800/30 bg-gradient-to-br from-purple-950 to-blue-950 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-400" />
              Automated Rate Updates
            </CardTitle>
            <CardDescription className="text-purple-300">Configure automated rate updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-purple-300">
              Configure automated rate updates based on external sources or schedules. Changes will be automatically
              reflected in the user interface.
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                <div>
                  <p className="text-white font-medium">Auto-update from API</p>
                  <p className="text-sm text-purple-300">Updates every 6 hours</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-update" />
                  <Label htmlFor="auto-update" className="sr-only">
                    Auto-update
                  </Label>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                <div>
                  <p className="text-white font-medium">Email notifications</p>
                  <p className="text-sm text-purple-300">When rate changes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notify" defaultChecked />
                  <Label htmlFor="email-notify" className="sr-only">
                    Email notifications
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

