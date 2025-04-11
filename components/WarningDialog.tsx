"use client"
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react"
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

interface WarningDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  type: "error" | "warning" | "info" | "success"
  action?: {
    label: string
    onClick: () => void
  }
}

export function WarningDialog({ open, onOpenChange, title, message, type, action }: WarningDialogProps) {
  // Get the appropriate icon and colors based on type
  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-8 w-8 text-amber-500" />
      case "info":
        return <Info className="h-8 w-8 text-blue-500" />
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      default:
        return <AlertTriangle className="h-8 w-8 text-amber-500" />
    }
  }

  const getBgGradient = () => {
    switch (type) {
      case "error":
        return "bg-gradient-to-r from-red-500/90 to-red-600/90"
      case "warning":
        return "bg-gradient-to-r from-amber-500/90 to-amber-600/90"
      case "info":
        return "bg-gradient-to-r from-primary/90 to-blue-600/90"
      case "success":
        return "bg-gradient-to-r from-green-500/90 to-green-600/90"
      default:
        return "bg-gradient-to-r from-amber-500/90 to-amber-600/90"
    }
  }

  const getActionButtonBg = () => {
    switch (type) {
      case "error":
        return "bg-red-500 hover:bg-red-600"
      case "warning":
        return "bg-amber-500 hover:bg-amber-600"
      case "info":
        return "bg-primary hover:bg-primary/90"
      case "success":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-amber-500 hover:bg-amber-600"
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl p-0 overflow-hidden border-0 backdrop-blur-md bg-white/95">
        <div className={`p-6 ${getBgGradient()} text-white`}>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-full">{getIcon()}</div>
            <AlertDialogHeader className="space-y-1">
              <AlertDialogTitle className="text-xl font-semibold text-white">{title}</AlertDialogTitle>
            </AlertDialogHeader>
          </div>
        </div>
        <div className="p-6">
          <AlertDialogDescription className="text-gray-700 text-base">{message}</AlertDialogDescription>
        </div>
        <AlertDialogFooter className="p-6 pt-0 flex gap-3">
          <AlertDialogCancel className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-0">
            Close
          </AlertDialogCancel>
          {action && (
            <AlertDialogAction onClick={action.onClick} className={`rounded-full ${getActionButtonBg()} text-white`}>
              {action.label}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

