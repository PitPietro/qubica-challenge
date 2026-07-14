<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const route = useRoute()
const auth = useAuthStore()


const isNavOpen = ref(false)
const activeCategory = computed(() => (route.query.category as string | undefined) ?? null)

function isActive(category: string | null): boolean {
  if (route.name !== 'home') return false
  return activeCategory.value === category
}

function closeNav() {
  isNavOpen.value = false
}

</script>

<template>
  <header class="header">
    <div class="header__bar">
      <RouterLink :to="{ name: 'home' }" class="header__brand" @click="closeNav">
        <span class="header__store-name">FakeStore</span>
      </RouterLink>

      <button
          type="button"
          class="header__nav-toggle"
          :aria-expanded="isNavOpen"
          aria-controls="primary-navigation"
          @click="isNavOpen = !isNavOpen"
      >
        <span class="visually-hidden">Toggle navigation</span>
        <span class="header__burger" :class="{ 'header__burger--open': isNavOpen }" aria-hidden="true"></span>
      </button>

      <nav
          id="primary-navigation"
          class="header__nav"
          :class="{ 'header__nav--open': isNavOpen }"
          aria-label="Product categories"
      >
        <RouterLink
            :to="{ name: 'home' }"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': isActive(null) }"
            @click="closeNav"
        >
          All
        </RouterLink>
      </nav>

      <div class="header__actions">
        <RouterLink v-if="!auth.isAuthenticated" :to="{ name: 'login' }" class="header__auth-link" @click="closeNav">
          Log In
        </RouterLink>
        <button v-else type="button" class="header__auth-link" @click="auth.logout(); closeNav()">
          Log Out
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg-elevated);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.header__bar {
  @include container;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  min-height: var(--header-height);
  flex-wrap: wrap;
  position: relative;
}

.header__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  font-family: var(--font-family-heading),serif;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  color: var(--color-text);
  @include focus-ring;
  border-radius: var(--radius-sm);
}

.header__logo {
  font-size: 1.5rem;
}

.header__nav-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: auto;
  border-radius: var(--radius-sm);
  @include focus-ring;

  @include respond-up(lg) {
    display: none;
  }
}

.header__burger,
.header__burger::before,
.header__burger::after {
  display: block;
  width: 1.25rem;
  height: 2px;
  background-color: var(--color-text);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.header__burger {
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
  }

  &::before {
    top: -6px;
  }

  &::after {
    top: 6px;
  }

  &--open {
    background-color: transparent;

    &::before {
      top: 0;
      transform: rotate(45deg);
    }

    &::after {
      top: 0;
      transform: rotate(-45deg);
    }
  }
}

.header__nav {
  display: none;
  flex-direction: column;
  width: 100%;
  order: 3;
  padding-block: var(--space-2xs);
  gap: var(--space-3xs);

  &--open {
    display: flex;
  }

  @include respond-up(lg) {
    display: flex;
    flex-direction: row;
    order: initial;
    width: auto;
    flex: 1;
    flex-wrap: wrap;
    padding-block: 0;
  }
}

.header__nav-link {
  padding: var(--space-2xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  transition: background-color var(--transition-fast), color var(--transition-fast);
  @include focus-ring;

  &:hover {
    background-color: var(--color-bg-subtle);
    color: var(--color-text);
  }

  &--active {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-primary-contrast);
    }
  }
}

.header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-left: auto;

  @include respond-up(lg) {
    margin-left: 0;
  }
}

.header__icon-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-full);
  font-size: 1.1rem;
  color: var(--color-text);
  @include focus-ring;

  &:hover {
    background-color: var(--color-bg-subtle);
  }
}

.header__badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 1.1rem;
  height: 1.1rem;
  padding-inline: 3px;
  border-radius: var(--radius-full);
  background-color: var(--color-accent);
  color: #1a1a1a;
  font-size: 0.65rem;
  font-weight: var(--font-weight-bold);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.header__auth-link {
  padding: var(--space-2xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  white-space: nowrap;
  transition: background-color var(--transition-fast), color var(--transition-fast);
  @include focus-ring;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
  }
}

.visually-hidden {
  @include visually-hidden;
}
</style>
