/**
 * Service d'authentification : login, register, logout, token en localStorage
 * Utilise json-server : GET /users?email=... pour login, POST /users pour register.
 */

import { apiRequest } from './api.js'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

/**
 * Connexion : GET /users?email=..., vérification du mot de passe côté client, stocke token + user en localStorage
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id: number, email: string, name: string } }>}
 */
export async function login(credentials) {
  const { email, password } = credentials
  const users = await apiRequest(`/users?email=${encodeURIComponent(email)}`)
  const user = Array.isArray(users) ? users[0] : null
  if (!user || user.password !== password) {
    throw { error: 'Email ou mot de passe incorrect', status: 401 }
  }
  const token = `token-${user.id}`
  const safeUser = { id: user.id, email: user.email, name: user.name }
  setToken(token)
  setUser(safeUser)
  return { token, user: safeUser }
}

/**
 * Inscription : POST /users (json-server), stocke token + user en localStorage
 * @param {{ email: string, password: string, name?: string }} data
 * @returns {Promise<{ token: string, user: { id: number, email: string, name: string } }>}
 */
export async function register(data) {
  const { email, password, name } = data
  const users = await apiRequest(`/users?email=${encodeURIComponent(email)}`)
  const existing = Array.isArray(users) ? users[0] : null
  if (existing) {
    throw { error: 'Cet email est déjà utilisé', status: 400 }
  }
  const created = await apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      name: name || email,
      createdAt: new Date().toISOString(),
    }),
  })
  const token = `token-${created.id}`
  const safeUser = { id: created.id, email: created.email, name: created.name }
  setToken(token)
  setUser(safeUser)
  return { token, user: safeUser }
}

/**
 * Déconnexion : supprime le token et l'utilisateur du localStorage
 */
export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

/**
 * Retourne le token stocké ou null
 * @returns {string | null}
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Stocke le token en localStorage
 * @param {string} token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * Retourne l'utilisateur stocké (objet parsé) ou null
 * @returns {{ id: number, email: string, name: string } | null}
 */
export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/**
 * Stocke l'utilisateur en localStorage
 * @param {{ id: number, email: string, name: string }} user
 */
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/**
 * Indique si l'utilisateur est connecté (token présent)
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken()
}
