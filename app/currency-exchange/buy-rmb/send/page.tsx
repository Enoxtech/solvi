"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SendToRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/currency-exchange/buy-rmb")
  }, [router])
  return null
}
