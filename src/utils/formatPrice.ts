const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(value: number): string {
  if (!Number.isFinite(value)) return currencyFormatter.format(0)
  return currencyFormatter.format(value)
}
