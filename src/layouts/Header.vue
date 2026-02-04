<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Logo/Titre -->
        <RouterLink
          to="/"
          class="text-2xl md:text-3xl font-bold hover:text-blue-100 transition-colors"
        >
          Internship Review
        </RouterLink>

        <!-- Navigation -->
        <nav class="flex gap-4 md:gap-6">
          <RouterLink
            to="/"
            class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            active-class="bg-white/20"
          >
            Accueil
          </RouterLink>
          <RouterLink
            to="/offers"
            class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            active-class="bg-white/20"
          >
            Offres
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
