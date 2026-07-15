import { describe, expect, it } from 'vitest'
import { formatPrice } from '@/utils/formatPrice'

describe('formatPrice', () => {
  it('formats a positive number as USD currency', () => {
    expect(formatPrice(109.95)).toBe('$109.95')
  })

  it('rounds to two decimal places', () => {
    expect(formatPrice(9.999)).toBe('$10.00')
  })

  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('falls back to $0.00 for non-finite input', () => {
    expect(formatPrice(NaN)).toBe('$0.00')
    expect(formatPrice(Infinity)).toBe('$0.00')
  })
})
