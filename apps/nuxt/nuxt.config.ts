import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils/module'],
  routeRules: {
    '/': { redirect: '/home-page' },
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
