<template>
  <div class="skeleton" aria-hidden="true">
    <div class="skeleton__image"></div>
    <div class="skeleton__line skeleton__line--category"></div>
    <div class="skeleton__line skeleton__line--title"></div>
    <div class="skeleton__line skeleton__line--title short"></div>
    <div class="skeleton__line skeleton__line--price"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-elevated);
}

.skeleton__image {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-2xs);
}

.skeleton__image,
.skeleton__line {
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

.skeleton__line {
  height: 0.75rem;

  &--category {
    width: 40%;
    height: 0.6rem;
  }

  &--title {
    width: 90%;

    &.short {
      width: 60%;
    }
  }

  &--price {
    width: 30%;
    margin-top: var(--space-2xs);
  }
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
