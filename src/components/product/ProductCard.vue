<script setup lang="ts">
import type { Product } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

defineProps<{ product: Product }>()

</script>

<template>
  <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }" class="card">
    <div class="card__image-wrap">
      <img class="card__image" :src="product.image" :alt="product.title" loading="lazy" />
    </div>
    <p class="card__category">{{ product.category }}</p>
    <h3 class="card__title">{{ product.title }}</h3>
    <p class="card__price">{{ formatPrice(product.price) }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-elevated);
  color: var(--color-text);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
  @include focus-ring;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-border-strong);
  }
}

.card__image-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-sm);
  overflow: hidden;
}

.card__image {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: transform var(--transition-base);
}

.card:hover .card__image {
  transform: scale(1.05);
}

.card__category {
  font-size: var(--font-size-xs);
  color: var(--color-text-subtle);
  text-transform: capitalize;
  margin-bottom: var(--space-3xs);
}

.card__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-base),serif;
  @include line-clamp(2);
  margin-bottom: var(--space-2xs);
  min-height: 2.5em;
}

.card__price {
  margin-top: auto;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}
</style>
