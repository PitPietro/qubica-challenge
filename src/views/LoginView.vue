<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')

function fillDemoCredentials() {
  username.value = 'mor_2314'
  password.value = '83r5^_'
}

async function onSubmit() {
  const success = await auth.login({ username: username.value, password: password.value })
  if (success) {
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(redirect)
  }
}
</script>

<template>
  <section class="login">
    <div class="login__card">
      <h1 class="login__title">Log In</h1>
      <p class="login__hint">
        This store uses the
        <a href="https://fakestoreapi.com/docs" target="_blank" rel="noopener noreferrer">Fake Store API</a>.
        Use a demo account to sign in:
        <button type="button" class="login__demo-button" @click="fillDemoCredentials">
          Fill demo credentials
        </button>
      </p>

      <form class="login__form" novalidate @submit.prevent="onSubmit">
        <div class="login__field">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            autocomplete="username"
            required
            :disabled="auth.isLoading"
          />
        </div>

        <div class="login__field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            :disabled="auth.isLoading"
          />
        </div>

        <p v-if="auth.error" class="login__error" role="alert">{{ auth.error }}</p>

        <button type="submit" class="login__submit" :disabled="auth.isLoading">
          {{ auth.isLoading ? 'Logging in…' : 'Log In' }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.login {
  @include container;
  display: flex;
  justify-content: center;
  padding-block: var(--space-2xl);
}

.login__card {
  width: 100%;
  max-width: 24rem;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
}

.login__title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
}

.login__hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-md);

  a {
    color: var(--color-primary);
    text-decoration: underline;
  }
}

.login__demo-button {
  display: inline;
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: underline;
  @include focus-ring;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.login__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xs);

  label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  input {
    height: 2.5rem;
    padding-inline: var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    color: var(--color-text);
    @include focus-ring;
  }
}

.login__error {
  color: var(--color-danger);
  background-color: var(--color-danger-bg);
  padding: var(--space-2xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}

.login__submit {
  height: 2.5rem;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-2xs);
  transition: background-color var(--transition-fast);
  @include focus-ring;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}
</style>
