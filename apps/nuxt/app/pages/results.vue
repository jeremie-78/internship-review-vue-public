<script setup lang="ts">
import type { Offer } from '~/composables/useOffers'
import { FunnelIcon, XMarkIcon } from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Offres de stage',
  description: 'Recherchez et parcourez les offres de stage disponibles.',
})

const offers = ref<Offer[]>([])
const isLoading = ref(true)
const isError = ref(false)
const errorMessage = ref('')

const route = useRoute()
const router = useRouter()

const searchInput = ref('')
const currentQuery = computed(() => {
  const q = route.query.q
  return typeof q === 'string' ? q : ''
})

async function loadOffers() {
  const q = currentQuery.value.trim()
  isLoading.value = true
  isError.value = false
  errorMessage.value = ''
  try {
    offers.value = q ? await searchOffers(q) : await getOffers()
  } catch (e: unknown) {
    const err = e as { error?: string }
    isError.value = true
    errorMessage.value = err?.error ?? 'Erreur lors du chargement des offres'
  } finally {
    isLoading.value = false
  }
}

function handleSearch(q: string) {
  router.push({ path: '/results', query: { q } })
}

function clearSearch() {
  router.push({ path: '/results' })
}

watch(
  () => currentQuery.value,
  (q) => {
    searchInput.value = q
    loadOffers()
  },
  { immediate: true },
)
</script>

<template>
  <div class="min-h-[calc(100vh-200px)] bg-linear-to-b from-blue-50 to-white">
    <div class="container mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Offres de stage</h1>
        <p v-if="currentQuery.trim()" class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Résultats pour : <span class="font-semibold text-blue-600">"{{ currentQuery }}"</span>
        </p>
        <p v-else class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Toutes les offres disponibles
        </p>
        <!-- Barre de recherche -->
        <div class="mb-6">
          <SearchBar v-model="searchInput" @search="handleSearch" />
        </div>
        <!-- Badge de recherche active avec bouton de reset -->
        <div v-if="currentQuery.trim()" class="flex justify-center mb-6">
          <div
            class="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 border border-blue-200 rounded-full shadow-sm hover:shadow-md transition-all group"
          >
            <FunnelIcon class="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
            <span class="text-sm font-medium text-blue-900">
              Recherche active : <span class="font-semibold">"{{ currentQuery }}"</span>
            </span>
            <button
              type="button"
              class="ml-1 p-1.5 rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 group-hover:bg-blue-100"
              aria-label="Réinitialiser la recherche et afficher toutes les offres"
              title="Afficher toutes les offres"
              @click="clearSearch"
            >
              <XMarkIcon class="h-4 w-4 text-blue-600" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <!-- Spinner pendant le chargement -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="isError" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-800 font-medium">{{ errorMessage }}</p>
        <button
          type="button"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          @click="loadOffers"
        >
          Réessayer
        </button>
      </div>

      <!-- Message si aucune offre -->
      <div v-else-if="offers.length === 0" class="text-center py-20">
        <p v-if="currentQuery.trim()" class="text-gray-600 text-lg mb-2">
          Aucun résultat trouvé pour <span class="font-semibold">"{{ currentQuery }}"</span>
        </p>
        <p v-else class="text-gray-600 text-lg">Aucune offre disponible pour le moment.</p>
        <p v-if="currentQuery.trim()" class="text-gray-500 text-sm mt-2">
          Essayez avec d'autres mots-clés ou
          <button type="button" class="text-blue-600 hover:text-blue-700 underline" @click="clearSearch">
            affichez toutes les offres
          </button>
        </p>
      </div>

      <!-- Nombre de résultats et grille de cartes -->
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
