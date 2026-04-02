/**
 * Service d'authentification Nuxt (portage du service Vue).
 * - login/register: utilise json-server via `GET /users?email=...` et `POST /users`
 * - token + user: stockés en `localStorage`
 *
 * Note: toutes les lectures/écritures `localStorage` sont client-only (SSR-safe).
 */

export interface AuthUser {
  id: number
  email: string
  name: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface AuthError {
  error: string
  status?: number
}

// Schéma json-server: l'utilisateur stocké contient aussi `password`
interface JsonServerUser {
  id: number
  email: string
  name: string
  password: string
}

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

function getApiBase(): string {
  const config = useRuntimeConfig()
  return (config.public.apiBase as string).replace(/\/$/, '')
}

function getUserFromLocalStorage(): AuthUser | null {
  const storage = getLocalStorage()
  if (!storage) return null
  const raw = storage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function setUserToLocalStorage(user: AuthUser): void {
  const storage = getLocalStorage()
  if (!storage) return
  storage.setItem(USER_KEY, JSON.stringify(user))
}

function setTokenToLocalStorage(token: string): void {
  const storage = getLocalStorage()
  if (!storage) return
  storage.setItem(TOKEN_KEY, token)
}

function removeLocalAuth(): void {
  const storage = getLocalStorage()
  if (!storage) return
  storage.removeItem(TOKEN_KEY)
  storage.removeItem(USER_KEY)
}

/**
 * Connexion : GET /users?email=..., vérification du mot de passe côté client
 */
export async function login(credentials: { email: string; password: string }): Promise<AuthResponse> {
  const { email, password } = credentials

  const base = getApiBase()
  const url = `${base}/users?email=${encodeURIComponent(email)}`

  try {
    const users = await $fetch<JsonServerUser[]>(url)
    const user = Array.isArray(users) ? users[0] : null

    if (!user || user.password !== password) {
      throw { error: 'Email ou mot de passe incorrect', status: 401 } satisfies AuthError
    }

    const token = `token-${user.id}`
    const safeUser: AuthUser = { id: user.id, email: user.email, name: user.name }

    setTokenToLocalStorage(token)
    setUserToLocalStorage(safeUser)

    return { token, user: safeUser }
  } catch (e: unknown) {
    if (typeof e === 'object' && e && 'error' in e) throw e
    throw {
      error: e instanceof Error ? e.message : 'Erreur de connexion',
      status: (e as { status?: number }).status,
    } satisfies AuthError
  }
}

/**
 * Inscription : POST /users (json-server) + stocke token/user
 */
export async function register(data: {
  email: string
  password: string
  name?: string
}): Promise<AuthResponse> {
  const { email, password, name } = data

  const base = getApiBase()
  const usersUrl = `${base}/users?email=${encodeURIComponent(email)}`

  try {
    const users = await $fetch<JsonServerUser[]>(usersUrl)
    const existing = Array.isArray(users) ? users[0] : null

    if (existing) {
      throw { error: 'Cet email est déjà utilisé', status: 400 } satisfies AuthError
    }

    const created = await $fetch<JsonServerUser>(`${base}/users`, {
      method: 'POST',
      body: {
        email,
        password,
        name: name || email,
        createdAt: new Date().toISOString(),
      },
    })

    const token = `token-${created.id}`
    const safeUser: AuthUser = { id: created.id, email: created.email, name: created.name }

    setTokenToLocalStorage(token)
    setUserToLocalStorage(safeUser)

    return { token, user: safeUser }
  } catch (e: unknown) {
    if (typeof e === 'object' && e && 'error' in e) throw e
    throw {
      error: e instanceof Error ? e.message : "Erreur lors de l'inscription",
      status: (e as { status?: number }).status,
    } satisfies AuthError
  }
}

/**
 * Déconnexion : supprime token + user
 */
export function logout(): void {
  removeLocalAuth()
}

/**
 * Retourne le token stocké ou null (client-only)
 */
export function getToken(): string | null {
  const storage = getLocalStorage()
  if (!storage) return null
  return storage.getItem(TOKEN_KEY)
}

/**
 * Retourne l'utilisateur stocké (client-only)
 */
export function getStoredUser(): AuthUser | null {
  return getUserFromLocalStorage()
}

/**
 * Indique si l'utilisateur est connecté (token présent)
 */
export function isAuthenticated(): boolean {
  return !!getToken()
}

