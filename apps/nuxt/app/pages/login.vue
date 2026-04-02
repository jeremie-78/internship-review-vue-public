<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

useSeoMeta({
  title: 'Connexion',
  description: 'Connectez-vous à Internship Review pour accéder aux offres de stage.',
})

const route = useRoute()
const router = useRouter()
const { login } = useAuth()

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
    await login({ email: email.value.trim(), password: password.value })
    const raw = route.query.redirect
    const redirect =
      typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//') ? raw : '/home'
    await router.push(redirect)
  } catch (err) {
    const e = err as { error?: string }
    errorMessage.value = e?.error || 'Erreur de connexion'
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
        <label
          for="login-password"
          class="block text-sm font-medium text-gray-700 mb-1"
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
      <NuxtLink to="/register" class="text-blue-600 hover:underline">S'inscrire</NuxtLink>
    </p>
  </div>
</template>

