import type React from "react"
import { PageBackground } from "./PageBackground"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Use the consistent background component */}
      <PageBackground />

      {/* Content */}
      <div className="relative z-20 flex-grow text-white">{children}</div>
    </div>
  )
}

