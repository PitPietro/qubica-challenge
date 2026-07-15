import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { CartItem, Product } from '@/types'
import { readStorage, writeStorage } from '@/utils/storage'

const STORAGE_KEY = 'store:cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(readStorage<CartItem[]>(STORAGE_KEY, []))

  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  function addToCart(product: Product, quantity = 1) {
    const existing = items.value.find((item) => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  function setQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    const existing = items.value.find((item) => item.product.id === productId)
    if (existing) existing.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  watch(items, (value) => writeStorage(STORAGE_KEY, value), { deep: true })

  return { items, totalCount, totalPrice, addToCart, removeFromCart, setQuantity, clearCart }
})
