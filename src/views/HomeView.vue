<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProducts, fetchProductsByCategory } from '@/services/products.service'
import type { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard.vue'
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton.vue'
import { formatCategoryLabel } from '@/utils/formatCategory'

const route = useRoute()

const products = ref<Product[]>([])
const isLoading = ref(true)
const hasFailed = ref(false)

const activeCategory = computed(() => {
  const value = route.query.category
  return typeof value === 'string' && value.length > 0 ? value : null
})

const pageTitle = computed(() =>
    activeCategory.value ? formatCategoryLabel(activeCategory.value) : 'All Products',
)

async function loadProducts() {
  isLoading.value = true
  hasFailed.value = false
  try {
    products.value = activeCategory.value
        ? await fetchProductsByCategory(activeCategory.value)
        : await fetchProducts()
  } catch {
    hasFailed.value = true
    products.value = []
  } finally {
    isLoading.value = false
  }
}

watch(activeCategory, loadProducts, { immediate: true })
</script>

<template>
  <section class="home" aria-labelledby="home-heading">
    <div class="home__header">
      <h1 id="home-heading" class="home__title">{{ pageTitle }}</h1>
      <p v-if="!isLoading && !hasFailed" class="home__count">
        {{ products.length }} {{ products.length === 1 ? 'product' : 'products' }}
      </p>
    </div>

    <div v-if="isLoading" class="home__grid" aria-hidden="true">
      <ProductCardSkeleton v-for="n in 8" :key="n" />
    </div>

    <p v-else-if="hasFailed" class="home__state">
      We couldn't load these products right now. Please try refreshing the page.
    </p>

    <p v-else-if="products.length === 0" class="home__state">
      No products found in this category.
    </p>

    <div v-else class="home__grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  @include container;
  padding-block: var(--space-lg);
}

.home__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.home__title {
  font-size: var(--font-size-xl);
  text-transform: capitalize;
}

.home__count {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.home__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);

  @include respond-up(sm) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include respond-up(md) {
    grid-template-columns: repeat(4, 1fr);
  }

  @include respond-up(xl) {
    grid-template-columns: repeat(5, 1fr);
  }
}

.home__state {
  padding: var(--space-2xl) 0;
  text-align: center;
  color: var(--color-text-muted);
}
</style>
