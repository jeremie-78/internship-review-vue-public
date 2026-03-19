<script setup lang="ts">
// Layout par défaut Nuxt : Header, slot (contenu de la page), Footer.
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
