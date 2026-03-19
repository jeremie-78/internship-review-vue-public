<script setup>
import { computed } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['search', 'update:modelValue'])

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function handleSubmit() {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto">
    <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3">
      <!-- Input de recherche -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une offre de stage (ex: développeur, marketing...)"
        class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
      />

      <!-- Bouton de recherche -->
      <button
        type="submit"
        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!searchQuery.trim()"
      >
        <span class="flex items-center justify-center gap-2">
          <MagnifyingGlassIcon class="h-5 w-5 text-white" aria-hidden="true" />
          Rechercher
        </span>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
