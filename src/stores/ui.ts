import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const errorMessage = ref<string | null>(null)

  function showError(message = 'Something went wrong. Please try again.') {
    errorMessage.value = message
  }

  function clearError() {
    errorMessage.value = null
  }

  return { errorMessage, showError, clearError }
})
