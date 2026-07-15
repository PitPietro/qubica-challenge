import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductCard from '@/components/product/ProductCard.vue'
import type { Product } from '@/types'

const product: Product = {
  id: 1,
  title: 'Test Backpack',
  price: 42.5,
  description: 'A sturdy backpack for testing.',
  category: 'electronics',
  image: 'https://example.com/backpack.png',
  rating: { rate: 4.2, count: 12 },
}

function mountCard() {
  setActivePinia(createPinia())
  return mount(ProductCard, {
    props: { product },
    global: {
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}

describe('ProductCard', () => {
  it('renders the product image, title, and formatted price', () => {
    const wrapper = mountCard()

    const image = wrapper.get('img')
    expect(image.attributes('src')).toBe(product.image)
    expect(image.attributes('alt')).toBe(product.title)
    expect(wrapper.text()).toContain('Test Backpack')
    expect(wrapper.text()).toContain('$42.50')
  })

  it('links to the product detail route', () => {
    const wrapper = mountCard()
    const link = wrapper.getComponent(RouterLinkStub)
    expect(link.props().to).toEqual({ name: 'product-detail', params: { id: product.id } })
  })

  it('toggles the wishlist state when the heart button is clicked', async () => {
    const wrapper = mountCard()
    const wishlistButton = wrapper.get('.card__wishlist')

    expect(wishlistButton.attributes('aria-pressed')).toBe('false')

    await wishlistButton.trigger('click')

    expect(wishlistButton.attributes('aria-pressed')).toBe('true')
  })
})
