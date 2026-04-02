<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-800 text-gray-300 mt-auto">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-center md:text-left">
          © {{ currentYear }} Internship Review. Tous droits réservés.
        </p>
        <div class="flex gap-6 text-sm">
          <a href="#" class="hover:text-white transition-colors">À propos</a>
          <a href="#" class="hover:text-white transition-colors">Contact</a>
          <a href="#" class="hover:text-white transition-colors">Mentions légales</a>
        </div>
      </div>
    </div>
  </footer>
</template>
