<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <AppHeader />

    <!-- Contenu principal -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped></style>
