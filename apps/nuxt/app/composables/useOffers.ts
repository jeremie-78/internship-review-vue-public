/**
 * Composable pour récupérer les offres depuis l'API (json-server).
 * Story 3-3 : getOffers uniquement (pas de recherche).
 */

export interface Offer {
  id: number
  title: string
  company: string
  location: string
  type: string
  description?: string
  salary?: string
  contractType?: string
  startDate?: string
}

export interface OffersError {
  error: string
  status?: number
}

/**
 * Récupère toutes les offres depuis l'API (GET /offers).
 * @throws {OffersError} en cas d'erreur réseau ou API
 */
export async function getOffers(): Promise<Offer[]> {
  const config = useRuntimeConfig()
  const base = config.public.apiBase as string
  const url = `${base.replace(/\/$/, '')}/offers`

  try {
    const data = await $fetch<Offer[]>(url)
    return Array.isArray(data) ? data : []
  } catch (e: unknown) {
    const err = e as { data?: { error?: string }; statusCode?: number }
    throw {
      error: err?.data?.error ?? (e instanceof Error ? e.message : 'Erreur lors du chargement des offres'),
      status: err?.statusCode,
    } as OffersError
  }
}
