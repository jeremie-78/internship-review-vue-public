<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header />

    <!-- Contenu principal -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped></style>
