<script setup lang="ts">
// Navigation : NuxtLink pour les liens internes (pas de Vue Router manuel).
</script>

<template>
  <header class="bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <NuxtLink
          to="/home"
          class="text-2xl md:text-3xl font-bold hover:text-blue-100 transition-colors"
        >
          Internship Review
        </NuxtLink>
        <nav class="flex gap-4 md:gap-6 items-center">
          <NuxtLink
            to="/home"
            class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            active-class="bg-white/20"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
            to="/results"
            class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            active-class="bg-white/20"
          >
            Offres
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
