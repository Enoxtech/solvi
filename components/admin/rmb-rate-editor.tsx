"use client"

import type React from "react"

import { useState } from "react"
import { updateRmbRate } from "@/app/actions/rmbRates"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, RefreshCw, Save, RotateCcw } from "lucide-react"

interface RmbRateEditorProps {
  initialRate: number
  lastUpdated: string
}

export function RmbRateEditor({ initialRate, lastUpdated }: RmbRateEditorProps) {
  const [rate, setRate] = useState(initialRate.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isNaN(Number(rate)) || Number(rate) <= 0) {
      toast({
        title: "Invalid rate",
        description: "Please enter a valid positive number",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await updateRmbRate(Number(rate))

      if (result.success) {
        toast({
          title: "Rate updated",
          description: `RMB rate has been updated to ₦${Number(rate).toFixed(2)}`,
        })
      } else {
        throw new Error(result.error || "Failed to update rate")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-6 bg-gradient-to-r from-blue-600/30 to-purple-600/30 p-6 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
            <RefreshCw className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-white">₦{initialRate.toFixed(2)}</div>
              <div className="text-sm text-purple-300">per 1 RMB</div>
            </div>
            <div className="mt-1 text-sm text-purple-300">Last updated: {new Date(lastUpdated).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="rate" className="text-white text-lg">
            New RMB Rate (₦)
          </Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-purple-300 text-xl font-bold">₦</span>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="border-purple-700 bg-purple-900/30 pl-8 text-white placeholder:text-purple-300 focus:border-purple-600 text-xl h-14"
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 h-12 px-6"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Rate
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setRate(initialRate.toString())}
            disabled={isSubmitting}
            className="border-purple-700 text-purple-300 hover:bg-purple-800 hover:text-white h-12"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-md bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-4 text-purple-100 border border-purple-700/30">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-300" />
          <div>
            <h3 className="font-medium text-white">Important Note</h3>
            <p className="mt-1 text-sm">
              Updating the RMB rate will affect all transactions and calculations across the platform. This change will
              be immediately reflected in the user interface for all currency exchange operations.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

