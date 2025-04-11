"use client"

// Simplified version of the hook
import { useState } from "react"

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{ title: string; description?: string; variant?: "default" | "destructive" }>
  >([])

  const toast = ({
    title,
    description,
    variant = "default",
  }: { title: string; description?: string; variant?: "default" | "destructive" }) => {
    setToasts((prev) => [...prev, { title, description, variant }])

    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.title !== title))
    }, 5000)
  }

  return { toast, toasts }
}

export const toast = () => {
  console.warn("toast function should be accessed via useToast hook")
}

