import { describe, expect, it } from 'vitest'
import { formatCategoryLabel } from '@/utils/formatCategory'

describe('formatCategoryLabel', () => {
  it('capitalizes a single word', () => {
    expect(formatCategoryLabel('electronics')).toBe('Electronics')
  })

  it('capitalizes each word without mangling apostrophes', () => {
    expect(formatCategoryLabel("men's clothing")).toBe("Men's Clothing")
    expect(formatCategoryLabel("women's clothing")).toBe("Women's Clothing")
  })
})
