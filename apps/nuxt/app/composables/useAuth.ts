/**
 * Etat auth Nuxt (state partagé + actions).
 * Portage du pattern Vue (provide/inject) vers `useState` + composable.
 */

import { onMounted } from 'vue'
import type { AuthResponse, AuthUser } from '~/services/authService'
import { getStoredUser, login as authLogin, logout as authLogout, register as authRegister } from '~/services/authService'

export function useAuth() {
  const authUser = useState<AuthUser | null>('authUser', () => null)
  const hydrated = useState<boolean>('authUserHydrated', () => false)

  onMounted(() => {
    if (hydrated.value) return
    authUser.value = getStoredUser()
    hydrated.value = true
  })

  async function login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const res = await authLogin(credentials)
    authUser.value = res.user
    return res
  }

  async function register(data: { email: string; password: string; name?: string }): Promise<AuthResponse> {
    const res = await authRegister(data)
    authUser.value = res.user
    return res
  }

  function logout() {
    authLogout()
    authUser.value = null
  }

  return { authUser, login, register, logout }
}

