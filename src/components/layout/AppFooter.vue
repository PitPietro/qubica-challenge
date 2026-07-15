<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__bar">
      <span class="footer__copyright">
        © {{ currentYear }} Qubica Fake Store. All rights reserved.
      </span>

      <a
          href="https://pietropoluzzi.it"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__link"
      >
        pietropoluzzi.it
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.footer__bar {
  @include container;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-xs);
  min-height: var(--header-height);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.footer__copyright {
  font-weight: var(--font-weight-medium);
}

.footer__link {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
  @include focus-ring;

  &:hover {
    color: var(--color-primary-contrast);
    background-color: var(--color-primary);
    padding-inline: var(--space-3xs);
  }
}
</style>