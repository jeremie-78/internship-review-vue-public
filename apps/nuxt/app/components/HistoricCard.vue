<script setup lang="ts">
import type { Offer } from '~/composables/useOffers'

defineProps<{
  offer: Offer
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ offer.title }}</h3>
    <span
      class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
    >
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ offer.date }}</h3>
    <icon-base icon-name="write"><icon-write /></icon-base>
    </span>
  </div>
</template>
