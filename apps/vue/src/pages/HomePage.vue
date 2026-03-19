<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import { MagnifyingGlassIcon, StarIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const searchInput = ref('')

function handleSearch(query) {
  // Navigation vers /results avec query params
  router.push({
    path: '/results',
    query: { q: query },
  })
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12 bg-linear-to-b from-gray-50 to-white"
  >
    <!-- Section Hero -->
    <div class="text-center mb-12 max-w-2xl">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trouvez votre stage idéal</h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8">
        Parcourez des milliers d'offres de stage et trouvez celle qui correspond à vos aspirations
      </p>
    </div>

    <!-- Barre de recherche -->
    <SearchBar v-model="searchInput" @search="handleSearch" />

    <!-- Section informations -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
      <div class="text-center p-6">
        <div class="flex justify-center mb-3">
          <MagnifyingGlassIcon class="h-10 w-10 text-blue-600" aria-hidden="true" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-900">Recherche facile</h3>
        <p class="text-gray-600 text-sm">Trouvez rapidement les offres qui vous intéressent</p>
      </div>

      <div class="text-center p-6">
        <div class="flex justify-center mb-3">
          <StarIcon class="h-10 w-10 text-blue-600" aria-hidden="true" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-900">Favoris</h3>
        <p class="text-gray-600 text-sm">Sauvegardez vos offres préférées pour plus tard</p>
      </div>

      <div class="text-center p-6">
        <div class="flex justify-center mb-3">
          <ChartBarIcon class="h-10 w-10 text-blue-600" aria-hidden="true" />
        </div>
        <h3 class="font-semibold text-lg mb-2 text-gray-900">Détails complets</h3>
        <p class="text-gray-600 text-sm">Accédez à toutes les informations nécessaires</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
