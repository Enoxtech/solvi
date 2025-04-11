"use client"

import { useState } from "react"
import {
  BankIntegrationAPI,
  type VerifyAccountRequest,
  type BankTransferRequest,
} from "@/components/api/BankIntegrationAPI"

export function useBankIntegration() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isTransferring, setIsTransferring] = useState(false)
  const [isFetchingBanks, setIsFetchingBanks] = useState(false)

  const verifyAccount = async (request: VerifyAccountRequest) => {
    setIsVerifying(true)
    try {
      const response = await BankIntegrationAPI.verifyAccount(request)
      return response
    } catch (error) {
      console.error("Error verifying account:", error)
      return {
        success: false,
        message: "An error occurred while verifying the account",
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const initiateTransfer = async (request: BankTransferRequest) => {
    setIsTransferring(true)
    try {
      const response = await BankIntegrationAPI.initiateTransfer(request)
      return response
    } catch (error) {
      console.error("Error initiating transfer:", error)
      return {
        success: false,
        message: "An error occurred while initiating the transfer",
        timestamp: new Date().toISOString(),
      }
    } finally {
      setIsTransferring(false)
    }
  }

  const getBankList = async () => {
    setIsFetchingBanks(true)
    try {
      return await BankIntegrationAPI.getBankList()
    } catch (error) {
      console.error("Error fetching bank list:", error)
      return []
    } finally {
      setIsFetchingBanks(false)
    }
  }

  const getUserBankAccounts = async () => {
    try {
      return await BankIntegrationAPI.getUserBankAccounts()
    } catch (error) {
      console.error("Error fetching user bank accounts:", error)
      return []
    }
  }

  const checkTransactionStatus = async (transactionId: string) => {
    try {
      return await BankIntegrationAPI.checkTransactionStatus(transactionId)
    } catch (error) {
      console.error("Error checking transaction status:", error)
      return { status: "failed" as const, message: "An error occurred while checking the transaction status" }
    }
  }

  return {
    verifyAccount,
    initiateTransfer,
    getBankList,
    getUserBankAccounts,
    checkTransactionStatus,
    isVerifying,
    isTransferring,
    isFetchingBanks,
  }
}

