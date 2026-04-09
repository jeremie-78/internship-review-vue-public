<script setup lang="ts">

defineProps<{
  search: any
}>()

const router = useRouter()

function goToSearch() {
  router.push(`/searches/${props.search.id}`)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ search.text }}</h3>
    <span
      class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
    >
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ search.date }}</h3>
    </span>
    <button class="text-gray-400 hover:text-red-500 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
