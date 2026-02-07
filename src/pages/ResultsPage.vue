<script setup>
import { ref, onMounted } from 'vue'
import OfferCard from '../components/OfferCard.vue'
import { getOffers } from '../services/offerService.js'

// Variables réactives pour gérer l'état
const offers = ref([])
const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')

// Fonction pour charger les offres depuis l'API
async function loadOffers() {
  isLoading.value = true
  isError.value = false
  errorMessage.value = ''

  try {
    // Ajouter un délai pour voir le spinner (à retirer en production)
    await Promise.all([getOffers(), new Promise((resolve) => setTimeout(resolve, 400))]).then(
      ([data]) => {
        offers.value = data
      },
    )
  } catch (error) {
    isError.value = true
    errorMessage.value = error.error || 'Erreur lors du chargement des offres'
  } finally {
    isLoading.value = false
  }
}

// Charger les offres au montage du composant
onMounted(() => {
  loadOffers()
})
</script>

<template>
  <div class="min-h-[calc(100vh-200px)] bg-linear-to-b from-blue-50 to-white">
    <div class="container mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Offres de stage</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les meilleures opportunités de stage qui correspondent à vos compétences
        </p>
      </div>

      <!-- Spinner pendant le chargement -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="isError" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-800 font-medium">{{ errorMessage }}</p>
        <button
          @click="loadOffers"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Réessayer
        </button>
      </div>

      <!-- Message si aucune offre -->
      <div v-else-if="offers.length === 0" class="text-center py-20">
        <p class="text-gray-600 text-lg">Aucune offre disponible pour le moment.</p>
      </div>

      <!-- Grille de cartes avec v-for -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
