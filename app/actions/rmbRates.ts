"use server"

import { revalidatePath } from "next/cache"

// This is a mock implementation. In a real application, you would connect to a database.
let currentRmbRate = {
  rate: 150.75,
  lastUpdated: new Date().toISOString(),
}

export async function getRmbRate() {
  // In a real application, you would fetch this from a database
  return currentRmbRate
}

export async function updateRmbRate(newRate: number) {
  try {
    // Validate the new rate
    if (isNaN(newRate) || newRate <= 0) {
      return {
        success: false,
        error: "Invalid rate. Please provide a positive number.",
      }
    }

    // In a real application, you would update this in a database
    currentRmbRate = {
      rate: newRate,
      lastUpdated: new Date().toISOString(),
    }

    // Revalidate the pages that display the RMB rate
    revalidatePath("/admin")
    revalidatePath("/admin/rmb-rates")
    revalidatePath("/dashboard")
    revalidatePath("/currency-exchange")

    return {
      success: true,
      message: "RMB rate updated successfully",
    }
  } catch (error) {
    console.error("Error updating RMB rate:", error)
    return {
      success: false,
      error: "Failed to update RMB rate",
    }
  }
}

