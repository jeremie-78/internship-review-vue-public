/**
 * Routes accessibles sans être connecté : uniquement /login et /register.
 * Côté serveur : pas de redirection (localStorage / token indisponibles).
 */
import { isAuthenticated } from '~/services/authService'

const GUEST_ONLY = new Set(['/login', '/register'])

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const authed = isAuthenticated()
  const path = to.path

  if (!authed && !GUEST_ONLY.has(path)) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }

  if (authed && GUEST_ONLY.has(path)) {
    return navigateTo('/home')
  }
})
