"use client"

import dynamic from "next/dynamic"

const DynamicBottomNav = dynamic(() => import("@/components/BottomNav"), {
  ssr: false,
})

export function BottomNavWrapper() {
  return (
    <div className="relative z-30">
      <DynamicBottomNav />
    </div>
  )
} 