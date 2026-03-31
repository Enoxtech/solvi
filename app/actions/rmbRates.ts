"use server"

export interface RmbRates {
  buyRate: number   // NGN per RMB (how many Naira per 1 RMB)
  sellRate: number  // NGN per RMB (how many Naira per 1 RMB)
  timestamp: number
}

const MOCK_RATES: RmbRates = {
  buyRate: 61.5,
  sellRate: 60.8,
  timestamp: Date.now(),
}

export async function getRmbRates(): Promise<RmbRates> {
  // In production, fetch from a real rate API
  return MOCK_RATES
}

export async function getBuyRate(): Promise<number> {
  const rates = await getRmbRates()
  return rates.buyRate
}

export async function getSellRate(): Promise<number> {
  const rates = await getRmbRates()
  return rates.sellRate
}
