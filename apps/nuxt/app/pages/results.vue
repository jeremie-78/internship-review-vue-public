<script setup lang="ts">
import type { Offer } from '~/composables/useOffers'

// Story 3-3 : pas de recherche, uniquement getOffers() au chargement
const offers = ref<Offer[]>([])
const isLoading = ref(true)
const isError = ref(false)
const errorMessage = ref('')

async function loadOffers() {
  isLoading.value = true
  isError.value = false
  errorMessage.value = ''
  try {
    offers.value = await getOffers()
  } catch (e: unknown) {
    const err = e as { error?: string }
    isError.value = true
    errorMessage.value = err?.error ?? 'Erreur lors du chargement des offres'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadOffers()
})
</script>

<template>
  <div class="min-h-[calc(100vh-200px)] bg-linear-to-b from-blue-50 to-white">
    <div class="container mx-auto px-4 py-12">
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Offres de stage
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Toutes les offres disponibles
        </p>
      </div>

      <!-- Spinner -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        />
      </div>

      <!-- Erreur -->
      <div
        v-else-if="isError"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-800 font-medium">{{ errorMessage }}</p>
        <button
          type="button"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          @click="loadOffers"
        >
          Réessayer
        </button>
      </div>

      <!-- Aucune offre -->
      <div v-else-if="offers.length === 0" class="text-center py-20">
        <p class="text-gray-600 text-lg">Aucune offre disponible pour le moment.</p>
      </div>

      <!-- Grille de cartes -->
      <div v-else>
        <p class="text-gray-600 text-sm mb-6 text-center">
          <span class="font-semibold text-gray-900">{{ offers.length }}</span>
          {{ offers.length === 1 ? 'résultat trouvé' : 'résultats trouvés' }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
        </div>
      </div>
    </div>
  </div>
</template>
