import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCategories } from '@/services/products.service'
import type { Category } from '@/types'

export const useCatalogStore = defineStore('catalog', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  let loaded = false

  async function loadCategories(force = false) {
    if (loaded && !force) return
    isLoading.value = true
    error.value = null
    try {
      categories.value = await fetchCategories()
      loaded = true
    } catch {
      error.value = 'Unable to load categories.'
    } finally {
      isLoading.value = false
    }
  }

  return { categories, isLoading, error, loadCategories }
})
