<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-pressed="theme.theme === 'dark'"
    :aria-label="theme.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="theme.toggleTheme"
  >
    <span aria-hidden="true">{{ theme.theme === 'dark' ? '🌙' : '☀️' }}</span>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-full);
  font-size: 1.1rem;
  @include focus-ring;

  &:hover {
    background-color: var(--color-bg-subtle);
  }
}
</style>
