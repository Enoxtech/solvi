import { toast } from "@/components/ui/use-toast"

export async function getWalletState() {
  console.log("Getting wallet state...")
  try {
    // Check if walletProvider exists
    if (typeof window === "undefined" || !window.walletProvider) {
      console.log("Wallet provider not found")
      throw new Error("Wallet provider not found")
    }

    console.log("Calling getProviderState...")
    const state = await window.walletProvider.getProviderState()
    console.log("Provider state:", state)

    // Check if the state indicates no account exists
    if (state.error && state.error.includes("No account exist")) {
      console.log("No account exists in the wallet")
      throw new Error("No account exists in the wallet")
    }

    return state
  } catch (error) {
    console.error("Failed to get wallet state:", error)

    let errorMessage = "Failed to connect to your wallet. Please try again."

    if (error instanceof Error) {
      if (error.message === "No account exists in the wallet") {
        errorMessage = "No account found in your wallet. Please create an account and try again."
      } else if (error.message === "Wallet provider not found") {
        errorMessage = "Wallet provider not found. Please make sure you have a wallet extension installed and enabled."
      }
    }

    toast({
      title: "Wallet Error",
      description: errorMessage,
      variant: "destructive",
    })

    return null
  }
}

