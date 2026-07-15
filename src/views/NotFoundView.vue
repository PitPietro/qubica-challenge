<template>
  <section class="not-found">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__message">We couldn't find the page you're looking for.</p>
    <RouterLink :to="{ name: 'home' }" class="not-found__link">Back to home</RouterLink>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  @include container;
  text-align: center;
  padding-block: var(--space-2xl);
}

.not-found__title {
  font-size: 4rem;
  color: var(--color-text-subtle);
}

.not-found__message {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.not-found__link {
  display: inline-block;
  padding: var(--space-2xs) var(--space-lg);
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  font-weight: var(--font-weight-semibold);
  @include focus-ring;
}
</style>
