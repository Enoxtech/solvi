export type CurrencyCode = "NGN" | "USD" | "RMB"

// Add the missing currencySymbols export
export const currencySymbols = {
  NGN: "₦",
  USD: "$",
  RMB: "¥",
}

export function formatCurrency(amount: number, currency: CurrencyCode = "NGN"): string {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency === "NGN" ? "NGN" : currency === "USD" ? "USD" : "CNY",
    minimumFractionDigits: 2,
  })

  return formatter.format(amount)
}

export function formatAmount(amount: number | string, currency: CurrencyCode = "NGN"): string {
  if (typeof amount === "string") {
    // Try to extract numeric value if it's a string with currency symbol
    const numericValue = Number.parseFloat(amount.replace(/[^0-9.-]+/g, ""))
    if (isNaN(numericValue)) return amount // Return original if parsing fails
    amount = numericValue
  }

  return formatCurrency(amount, currency)
}

type RateMap = {
  [key: string]: number
}

type CurrencyRates = {
  [key in CurrencyCode]: RateMap
}

export function convertCurrency(amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number {
  // Example conversion rates (in a real app, these would come from an API)
  const rates: CurrencyRates = {
    NGN: { USD: 0.00067, RMB: 0.0048 },
    USD: { NGN: 1500, RMB: 7.2 },
    RMB: { NGN: 210, USD: 0.14 },
  } as const

  if (fromCurrency === toCurrency) return amount

  return amount * rates[fromCurrency][toCurrency]
}

