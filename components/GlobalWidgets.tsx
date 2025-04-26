"use client"

import { AIAssistantWidget } from "@/components/AIAssistantWidget"
import { TransactionNotification } from "@/components/TransactionNotification"
import { useAuth } from "@/contexts/AuthContext"

export function GlobalWidgets() {
  const { isAuthPage } = useAuth()
  if (isAuthPage) return null
  return (
    <>
      <AIAssistantWidget />
      <TransactionNotification />
    </>
  )
} 