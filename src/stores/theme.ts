import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { readStorage, writeStorage } from '@/utils/storage'

export type ThemeName = 'light' | 'dark'

const STORAGE_KEY = 'store:theme'

function getPreferredTheme(): ThemeName {
  const stored = readStorage<ThemeName | null>(STORAGE_KEY, null)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeName>(getPreferredTheme())

  function applyTheme() {
    document.documentElement.dataset.theme = theme.value
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setTheme(next: ThemeName) {
    theme.value = next
  }

  watch(
    theme,
    (value) => {
      writeStorage(STORAGE_KEY, value)
      applyTheme()
    },
    { immediate: true },
  )

  return { theme, toggleTheme, setTheme }
})
