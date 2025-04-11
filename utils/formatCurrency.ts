export function formatCurrency(amount: number, symbol = "₦"): string {
  // Convert from kobo to main currency unit (e.g., Naira)
  const mainUnitAmount = amount / 100

  // Format with commas for thousands and 2 decimal places
  return `${symbol}${mainUnitAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

