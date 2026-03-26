<script setup>
import { RouterLink } from 'vue-router'
import { logout } from '../services/authService.js'

const props = defineProps({
  user: { type: Object, default: null },
  onLogout: { type: Function, required: true },
})

function handleLogout() {
  logout()
  props.onLogout()
}
</script>

<template>
  <header class="bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- Logo/Titre -->
        <RouterLink
          to="/"
          class="text-2xl md:text-3xl font-bold hover:text-blue-100 transition-colors"
        >
          Internship Review
        </RouterLink>

        <!-- Navigation -->
        <nav class="flex gap-4 md:gap-6 items-center">
          <RouterLink
            to="/"
            class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            active-class="bg-white/20"
          >
            Accueil
          </RouterLink>
          <RouterLink
            to="/results"
            class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
            active-class="bg-white/20"
          >
            Offres
          </RouterLink>

          <!-- État connecté : email + déconnexion -->
          <template v-if="user">
            <span class="px-3 py-1 text-sm text-blue-100">{{ user.email }}</span>
            <button
              type="button"
              class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
              @click="handleLogout"
            >
              Déconnexion
            </button>
          </template>
          <!-- État non connecté : liens Login / Register -->
          <template v-else>
            <RouterLink
              to="/login"
              class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
              active-class="bg-white/20"
            >
              Connexion
            </RouterLink>
            <RouterLink
              to="/register"
              class="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
              active-class="bg-white/20"
            >
              Inscription
            </RouterLink>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
