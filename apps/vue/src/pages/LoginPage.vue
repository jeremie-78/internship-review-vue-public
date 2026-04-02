<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService.js'

const router = useRouter()
const setAuthUser = inject('setAuthUser')

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Email et mot de passe requis'
    return
  }
  isLoading.value = true
  try {
    const { user } = await login({ email: email.value.trim(), password: password.value })
    setAuthUser?.(user)
    router.push('/')
  } catch (err) {
    errorMessage.value = err.error || 'Erreur de connexion'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Connexion</h1>
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="vous@exemple.com"
        />
      </div>
      <div>
        <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1"
          >Mot de passe</label
        >
        <input
          id="login-password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="••••••••"
        />
      </div>
      <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ isLoading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
    <p class="mt-4 text-sm text-gray-600">
      Pas de compte ?
      <router-link to="/register" class="text-blue-600 hover:underline">S'inscrire</router-link>
    </p>
  </div>
</template>
