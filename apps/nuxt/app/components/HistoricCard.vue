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
    <icon-base icon-name="write"><icon-write /></icon-base>
    </span>
  </div>
</template>
