<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import ErrorModal from '@/components/common/ErrorModal.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <AppHeader />
  <main id="main-content" class="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <ErrorModal />
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  position: relative;
}
</style>
