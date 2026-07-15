<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/formatPrice'

const cart = useCartStore()
</script>

<template>
  <section class="cart">
    <h1 class="cart__title">Your Cart</h1>

    <p v-if="cart.items.length === 0" class="cart__empty">
      Your cart is empty. <RouterLink :to="{ name: 'home' }">Browse products</RouterLink> to add something.
    </p>

    <div v-else class="cart__layout">
      <ul class="cart__list">
        <li v-for="item in cart.items" :key="item.product.id" class="cart__item">
          <RouterLink :to="{ name: 'product-detail', params: { id: item.product.id } }" class="cart__item-image-link">
            <img class="cart__item-image" :src="item.product.image" :alt="item.product.title" />
          </RouterLink>

          <div class="cart__item-info">
            <RouterLink :to="{ name: 'product-detail', params: { id: item.product.id } }" class="cart__item-title">
              {{ item.product.title }}
            </RouterLink>
            <p class="cart__item-price">{{ formatPrice(item.product.price) }}</p>
          </div>

          <div class="cart__item-quantity">
            <button
              type="button"
              aria-label="Decrease quantity"
              @click="cart.setQuantity(item.product.id, item.quantity - 1)"
            >
              −
            </button>
            <span aria-live="polite">{{ item.quantity }}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              @click="cart.setQuantity(item.product.id, item.quantity + 1)"
            >
              +
            </button>
          </div>

          <p class="cart__item-subtotal">{{ formatPrice(item.product.price * item.quantity) }}</p>

          <button
            type="button"
            class="cart__item-remove"
            :aria-label="`Remove ${item.product.title} from cart`"
            @click="cart.removeFromCart(item.product.id)"
          >
            ✕
          </button>
        </li>
      </ul>

      <aside class="cart__summary">
        <h2 class="cart__summary-title">Summary</h2>
        <div class="cart__summary-row">
          <span>Items</span>
          <span>{{ cart.totalCount }}</span>
        </div>
        <div class="cart__summary-row cart__summary-row--total">
          <span>Total</span>
          <span>{{ formatPrice(cart.totalPrice) }}</span>
        </div>
        <button type="button" class="cart__clear" @click="cart.clearCart">Clear cart</button>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart {
  @include container;
  padding-block: var(--space-lg);
}

.cart__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-md);
}

.cart__empty {
  color: var(--color-text-muted);
  padding: var(--space-xl) 0;

  a {
    color: var(--color-primary);
    text-decoration: underline;
  }
}

.cart__layout {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr;
  align-items: start;

  @include respond-up(lg) {
    grid-template-columns: minmax(0, 1fr) 18rem;
  }
}

.cart__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.cart__item {
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-areas:
    'image info'
    'image quantity'
    'image subtotal';
  gap: var(--space-2xs) var(--space-sm);
  align-items: center;
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-elevated);
  position: relative;

  @include respond-up(sm) {
    grid-template-columns: 4rem 1fr auto auto auto;
    grid-template-areas: 'image info quantity subtotal remove';
  }
}

.cart__item-image-link {
  grid-area: image;
}

.cart__item-image {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  background-color: #ffffff;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.cart__item-info {
  grid-area: info;
  min-width: 0;
}

.cart__item-title {
  display: block;
  font-weight: var(--font-weight-medium);
  @include line-clamp(1);
  @include focus-ring;
}

.cart__item-price {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.cart__item-quantity {
  grid-area: quantity;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3xs) var(--space-2xs);
  width: fit-content;

  button {
    width: 1.5rem;
    height: 1.5rem;
    @include focus-ring;
  }
}

.cart__item-subtotal {
  grid-area: subtotal;
  font-weight: var(--font-weight-semibold);
}

.cart__item-remove {
  position: absolute;
  top: var(--space-2xs);
  right: var(--space-2xs);
  color: var(--color-text-subtle);
  width: 1.5rem;
  height: 1.5rem;
  @include focus-ring;

  &:hover {
    color: var(--color-danger);
  }

  @include respond-up(sm) {
    position: static;
    grid-area: remove;
    justify-self: end;
  }
}

.cart__summary {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-elevated);
  padding: var(--space-md);
  position: sticky;
  top: calc(var(--header-height) + var(--space-md));
}

.cart__summary-title {
  font-size: var(--font-size-md);
  margin-bottom: var(--space-sm);
}

.cart__summary-row {
  display: flex;
  justify-content: space-between;
  padding-block: var(--space-2xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);

  &--total {
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-2xs);
    padding-top: var(--space-sm);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
  }
}

.cart__clear {
  width: 100%;
  margin-top: var(--space-md);
  height: 2.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  @include focus-ring;

  &:hover {
    border-color: var(--color-danger);
    color: var(--color-danger);
  }
}
</style>
