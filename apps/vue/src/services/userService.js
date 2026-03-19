/**
 * Service utilisateur : infos utilisateur courant (lecture depuis le stockage auth)
 * Pour une auth simple 1h, on lit l'utilisateur déjà stocké par authService au login/register.
 */

import { getStoredUser } from './authService.js'

/**
 * Retourne l'utilisateur courant (stocké après login/register) ou null
 * @returns {{ id: number, email: string, name: string } | null}
 */
export function getCurrentUser() {
  return getStoredUser()
}
