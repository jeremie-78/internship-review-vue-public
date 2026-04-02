<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const title = computed(() => String(props.error.statusCode ?? 'Erreur'))
const message = computed(
  () => props.error.statusMessage || props.error.message || 'Une erreur est survenue.',
)

function goHome() {
  clearError({ redirect: '/home' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ title }}</h1>
    <p class="text-gray-600 mb-8 text-center max-w-md">{{ message }}</p>
    <button
      type="button"
      class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      @click="goHome"
    >
      Retour à l’accueil
    </button>
  </div>
</template>
