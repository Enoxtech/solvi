"use client"

import { useEffect } from "react"

export function FocusVisiblePolyfill() {
  useEffect(() => {
    // Add focus-visible class to html element
    document.documentElement.classList.add("js-focus-visible")
    document.documentElement.setAttribute("data-js-focus-visible", "")
  }, [])

  return null
} 