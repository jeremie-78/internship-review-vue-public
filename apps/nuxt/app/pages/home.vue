<script setup lang="ts">
// Page d'accueil : route /home.
// Contenu et design alignés sur l'app Vue.
// La recherche navigue vers /results?q=... (Story 3.4).
import { MagnifyingGlassIcon, StarIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Accueil',
  description: 'Trouvez votre stage idéal : recherche d’offres et parcours simple.',
})

const searchInput = ref('')
const { authUser } = useAuth()
const isImporting = ref(false)
const importError = ref<string | null>(null)

const importResult = ref<{
  imported: number
  failed: number
  totalFound: number
  message: string
} | null>(null)

const router = useRouter()
function handleSearch(q: string) {
  router.push({ path: '/results', query: { q } })
}

/** Exemple : appel route Nitro et log de la réponse (voir `server/api/hello.get.ts`). */
async function logHelloFromApi() {
  const data = await $fetch<{ message: string }>('/api/hello')
  console.log('[API /api/hello]', data.message)
}

async function handleImportOffers() {
  if (isImporting.value || !authUser.value) return

  isImporting.value = true
  importError.value = null
  importResult.value = null

  try {
    const response = await $fetch<{
      imported: number
      failed: number
      totalFound: number
      message: string
    }>('/api/offers/import', {
      method: 'POST',
    })

    importResult.value = response
  } catch (error: unknown) {
    const err = error as { data?: { message?: string; error?: string } }
    importError.value =
      err?.data?.message ||
      err?.data?.error ||
      (error instanceof Error ? error.message : "Erreur lors de l'import des offres.")
  } finally {
    isImporting.value = false
  }
}
</script>

<template>
  <div
    class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12 bg-linear-to-b from-gray-50 to-white"
  >
    <!-- Section Hero (même disposition que Vue) -->
    <div class="text-center mb-12 max-w-2xl">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Trouvez votre stage idéal</h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8">
        Parcourez des milliers d'offres de stage et trouvez celle qui correspond à vos aspirations
      </p>
    </div>

    <!-- Barre de recherche (auto-import SearchBar depuis app/components/) -->
    <SearchBar v-model="searchInput" @search="handleSearch" />

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <NuxtLink
        to="/results"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Voir toutes les offres
      </NuxtLink>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 bg-white text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        @click="logHelloFromApi"
      >
        Tester l’API (hello)
      </button>

      <button
        v-if="authUser"
        type="button"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium"
        :disabled="isImporting"
        @click="handleImportOffers"
      >
        {{ isImporting ? 'Import en cours...' : 'Charger des offres' }}
      </button>
    </div>

    <p v-if="importError" class="mt-3 text-sm text-red-600">
      {{ importError }}
    </p>

    <p v-if="importResult" class="mt-3 text-sm text-emerald-700">
      {{ importResult.message }} (imported: {{ importResult.imported }}, failed:
      {{ importResult.failed }}, totalFound: {{ importResult.totalFound }})
    </p>

    <!-- Section informations : 3 blocs avec Heroicons (AC #3, #7) -->
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
