// This is a simulated API component for bank integration
// Simulating Paystack-like functionality

export interface BankAccount {
  bankName: string
  accountNumber: string
  accountName: string
  bankCode: string
}

export interface BankTransferRequest {
  amount: number
  accountNumber: string
  bankCode: string
  narration?: string
  reference?: string
}

export interface BankTransferResponse {
  success: boolean
  transactionId?: string
  message: string
  timestamp: string
}

export interface VerifyAccountRequest {
  accountNumber: string
  bankCode: string
}

export interface VerifyAccountResponse {
  success: boolean
  accountName?: string
  message: string
}

export class BankIntegrationAPI {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.paystack.co"
  private static apiKey = process.env.PAYSTACK_SECRET_KEY || ""

  // Simulate verifying a bank account
  static async verifyAccount(request: VerifyAccountRequest): Promise<VerifyAccountResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate successful response
    if (request.accountNumber.length === 10) {
      return {
        success: true,
        accountName: "John Doe",
        message: "Account verified successfully",
      }
    }

    // Simulate error
    return {
      success: false,
      message: "Invalid account number",
    }
  }

  // Simulate initiating a bank transfer
  static async initiateTransfer(request: BankTransferRequest): Promise<BankTransferResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful response
    if (request.amount > 0 && request.accountNumber.length === 10) {
      return {
        success: true,
        transactionId: `TXN-${Date.now()}`,
        message: "Transfer initiated successfully",
        timestamp: new Date().toISOString(),
      }
    }

    // Simulate error
    return {
      success: false,
      message: "Transfer failed. Please check your details and try again.",
      timestamp: new Date().toISOString(),
    }
  }

  // Simulate getting bank list
  static async getBankList(): Promise<{ code: string; name: string }[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a simulated list of banks
    return [
      { code: "044", name: "Access Bank" },
      { code: "063", name: "Access Bank (Diamond)" },
      { code: "050", name: "Ecobank Nigeria" },
      { code: "070", name: "Fidelity Bank" },
      { code: "011", name: "First Bank of Nigeria" },
      { code: "214", name: "First City Monument Bank" },
      { code: "058", name: "Guaranty Trust Bank" },
      { code: "030", name: "Heritage Bank" },
      { code: "301", name: "Jaiz Bank" },
      { code: "082", name: "Keystone Bank" },
      { code: "076", name: "Polaris Bank" },
      { code: "101", name: "Providus Bank" },
      { code: "221", name: "Stanbic IBTC Bank" },
      { code: "068", name: "Standard Chartered Bank" },
      { code: "232", name: "Sterling Bank" },
      { code: "100", name: "Suntrust Bank" },
      { code: "032", name: "Union Bank of Nigeria" },
      { code: "033", name: "United Bank for Africa" },
      { code: "215", name: "Unity Bank" },
      { code: "035", name: "Wema Bank" },
      { code: "057", name: "Zenith Bank" },
    ]
  }

  // Simulate getting user's bank accounts
  static async getUserBankAccounts(): Promise<BankAccount[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a simulated list of user's bank accounts
    return [
      {
        bankName: "Access Bank",
        accountNumber: "0123456789",
        accountName: "John Doe",
        bankCode: "044",
      },
      {
        bankName: "Zenith Bank",
        accountNumber: "2345678901",
        accountName: "John Doe",
        bankCode: "057",
      },
    ]
  }

  // Simulate checking transaction status
  static async checkTransactionStatus(
    transactionId: string,
  ): Promise<{ status: "pending" | "completed" | "failed"; message: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate different statuses based on the transaction ID
    if (transactionId.endsWith("0")) {
      return { status: "failed", message: "Transaction failed due to insufficient funds" }
    } else if (transactionId.endsWith("5")) {
      return { status: "pending", message: "Transaction is being processed" }
    } else {
      return { status: "completed", message: "Transaction completed successfully" }
    }
  }
}

