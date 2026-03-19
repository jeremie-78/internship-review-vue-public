<script setup>
// Définir les props pour recevoir les données de l'offre
defineProps({
  offer: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ offer.title }}</h3>
    <p class="text-gray-600 mb-1">{{ offer.company }}</p>
    <p class="text-gray-500 text-sm mb-2">{{ offer.location }}</p>
    <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
      {{ offer.type }}
    </span>
  </div>
</template>

<style scoped></style>
