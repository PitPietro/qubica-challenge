<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchProductById } from '@/services/products.service'
import type { Product } from '@/types'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{ id: number }>()

const product = ref<Product | null>(null)
const isLoading = ref(true)
const hasFailed = ref(false)
const quantity = ref(1)
const justAdded = ref(false)

async function loadProduct(id: number) {
  isLoading.value = true
  hasFailed.value = false
  justAdded.value = false
  quantity.value = 1
  try {
    product.value = await fetchProductById(id)
  } catch {
    hasFailed.value = true
    product.value = null
  } finally {
    isLoading.value = false
  }
}

watch(() => props.id, loadProduct, { immediate: true })

function addToCart() {
  if (!product.value) return
  justAdded.value = true
  window.setTimeout(() => {
    justAdded.value = false
  }, 2000)
}

</script>

<template>
  <section class="detail">
    <RouterLink :to="{ name: 'home' }" class="detail__back">← Back to products</RouterLink>

    <div v-if="isLoading" class="detail__skeleton" aria-busy="true" aria-live="polite">
      <div class="detail__skeleton-image"></div>
      <div class="detail__skeleton-body">
        <div class="detail__skeleton-line" style="width: 30%"></div>
        <div class="detail__skeleton-line" style="width: 80%; height: 1.75rem"></div>
        <div class="detail__skeleton-line" style="width: 20%; height: 1.5rem"></div>
        <div class="detail__skeleton-line" style="width: 100%"></div>
        <div class="detail__skeleton-line" style="width: 95%"></div>
        <div class="detail__skeleton-line" style="width: 70%"></div>
      </div>
    </div>

    <p v-else-if="hasFailed" class="detail__state">
      We couldn't load this product. Please try again later.
    </p>

    <article v-else-if="product" class="detail__content">
      <div class="detail__image-wrap">
        <img class="detail__image" :src="product.image" :alt="product.title" />
      </div>

      <div class="detail__info">
        <p class="detail__category">{{ product.category }}</p>
        <h1 class="detail__title">{{ product.title }}</h1>
        <p class="detail__rating" v-if="product.rating">
          <span aria-hidden="true">⭐ {{ product.rating.rate }}</span>
          <span class="visually-hidden">Rating {{ product.rating.rate }} out of 5</span>
          <span class="detail__rating-count">({{ product.rating.count }} reviews)</span>
        </p>
        <p class="detail__price">{{ formatPrice(product.price) }}</p>
        <p class="detail__description">{{ product.description }}</p>

        <div class="detail__actions">
          <div class="detail__quantity">
            <label for="quantity" class="detail__quantity-label">Quantity</label>
            <div class="detail__quantity-control">
              <button
                type="button"
                :disabled="quantity <= 1"
                aria-label="Decrease quantity"
                @click="quantity = Math.max(1, quantity - 1)"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                v-model.number="quantity"
                aria-label="Quantity"
              />
              <button type="button" aria-label="Increase quantity" @click="quantity++">+</button>
            </div>
          </div>

          <button type="button" class="detail__add-to-cart" @click="addToCart">
            {{ justAdded ? 'Added to cart ✓' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.detail {
  @include container;
  padding-block: var(--space-lg);
}

.detail__back {
  display: inline-block;
  margin-bottom: var(--space-md);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  @include focus-ring;

  &:hover {
    color: var(--color-text);
  }
}

.detail__state {
  padding: var(--space-2xl) 0;
  text-align: center;
  color: var(--color-text-muted);
}

.detail__content {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;

  @include respond-up(md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
}

.detail__image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  aspect-ratio: 1 / 1;
}

.detail__image {
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
}

.detail__category {
  color: var(--color-text-subtle);
  text-transform: capitalize;
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-2xs);
}

.detail__title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-2xs);
}

.detail__rating {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-sm);
}

.detail__rating-count {
  color: var(--color-text-subtle);
  margin-left: var(--space-3xs);
}

.detail__price {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-md);
}

.detail__description {
  color: var(--color-text-muted);
  line-height: var(--line-height-base);
  margin-bottom: var(--space-lg);
}

.detail__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
}

.detail__quantity-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--space-3xs);
}

.detail__quantity-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;

  button {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.1rem;
    @include focus-ring;

    &:hover:not(:disabled) {
      background-color: var(--color-bg-subtle);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  input {
    width: 2.75rem;
    height: 2.25rem;
    text-align: center;
    border-inline: 1px solid var(--color-border);
    background-color: var(--color-bg-elevated);
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.detail__add-to-cart {
  padding: var(--space-2xs) var(--space-lg);
  height: 2.25rem;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  font-weight: var(--font-weight-semibold);
  transition: background-color var(--transition-fast);
  @include focus-ring;

  &:hover {
    background-color: var(--color-primary-hover);
  }
}

.detail__skeleton {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;

  @include respond-up(md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

.detail__skeleton-image {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-lg);
}

.detail__skeleton-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.detail__skeleton-image,
.detail__skeleton-line {
  background: linear-gradient(
    100deg,
    var(--color-bg-subtle) 30%,
    var(--color-border) 50%,
    var(--color-bg-subtle) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

.detail__skeleton-line {
  height: 1rem;
}

.visually-hidden {
  @include visually-hidden;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
