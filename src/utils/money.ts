export function formatMoney(value: number, currency: 'NGN' | 'RMB') {
  if (currency === 'NGN') return `₦${value.toLocaleString()}`;
  return `RMB ${value.toLocaleString()}`;
}
