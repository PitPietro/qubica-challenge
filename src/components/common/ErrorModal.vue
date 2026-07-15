<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const closeButton = ref<HTMLButtonElement | null>(null)

watch(
  () => ui.errorMessage,
  async (message) => {
    if (!message) return
    await nextTick()
    closeButton.value?.focus()
  },
)
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="ui.errorMessage"
      class="modal-overlay"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
      @click.self="ui.clearError"
      @keydown.esc="ui.clearError"
    >
      <div class="modal">
        <p class="modal__icon" aria-hidden="true">⚠️</p>
        <h2 id="error-modal-title" class="modal__title">Something went wrong</h2>
        <p id="error-modal-description" class="modal__message">{{ ui.errorMessage }}</p>
        <button ref="closeButton" type="button" class="modal__button" @click="ui.clearError">
          Dismiss
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-overlay);
  padding: var(--space-sm);
}

.modal {
  width: 100%;
  max-width: 24rem;
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-lg);
  text-align: center;
}

.modal__icon {
  font-size: 2rem;
  margin-bottom: var(--space-2xs);
}

.modal__title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-2xs);
}

.modal__message {
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);
}

.modal__button {
  padding: var(--space-2xs) var(--space-lg);
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  font-weight: var(--font-weight-semibold);
  @include focus-ring;

  &:hover {
    background-color: var(--color-primary-hover);
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--transition-base);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal,
.modal-fade-leave-active .modal {
  transition: transform var(--transition-base);
}

.modal-fade-enter-from .modal {
  transform: scale(0.95);
}
</style>
