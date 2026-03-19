<script setup>
import { ref, provide, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import { getStoredUser } from '../services/authService.js'

// État auth : utilisateur connecté (null si déconnecté)
const authUser = ref(null)

function setAuthUser(user) {
  authUser.value = user
}

onMounted(() => {
  authUser.value = getStoredUser()
})

provide('authUser', authUser)
provide('setAuthUser', setAuthUser)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <AppHeader :user="authUser" :on-logout="() => setAuthUser(null)" />

    <!-- Contenu principal -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped></style>
