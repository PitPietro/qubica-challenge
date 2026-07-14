import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { login as loginRequest } from '@/services/auth.service'
import type { LoginCredentials } from '@/types'
import { readStorage, removeStorage, writeStorage } from '@/utils/storage'

const TOKEN_KEY = 'store:auth-token'
const USERNAME_KEY = 'store:auth-username'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(readStorage<string | null>(TOKEN_KEY, null))
  const username = ref<string | null>(readStorage<string | null>(USERNAME_KEY, null))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoading.value = true
    error.value = null
    try {
      const response = await loginRequest(credentials)
      token.value = response.token
      username.value = credentials.username
      writeStorage(TOKEN_KEY, response.token)
      writeStorage(USERNAME_KEY, credentials.username)
      return true
    } catch {
      error.value = 'Invalid username or password.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    token.value = null
    username.value = null
    removeStorage(TOKEN_KEY)
    removeStorage(USERNAME_KEY)
  }

  return { token, username, isLoading, error, isAuthenticated, login, logout }
})
