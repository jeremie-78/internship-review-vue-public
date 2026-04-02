import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ResultsPage from '~/pages/results.vue'

const mockGetOffers = vi.fn()
const mockSearchOffers = vi.fn()
vi.mock('~/composables/useOffers', () => ({
  getOffers: (...args: unknown[]) => mockGetOffers(...args),
  searchOffers: (...args: unknown[]) => mockSearchOffers(...args),
}))

describe('Page results (Nuxt runtime)', () => {
  beforeEach(() => {
    mockGetOffers.mockResolvedValue([])
    mockSearchOffers.mockResolvedValue([])
  })

  it('affiche le titre "Offres de stage" et le sous-titre', async () => {
    const wrapper = await mountSuspended(ResultsPage, { route: '/results' })
    expect(wrapper.text()).toContain('Offres de stage')
    expect(wrapper.text()).toContain('Toutes les offres disponibles')
  })

  it('affiche "Aucune offre disponible" quand getOffers retourne un tableau vide', async () => {
    const wrapper = await mountSuspended(ResultsPage, { route: '/results' })
    await vi.waitFor(
      () => {
        expect(wrapper.text()).toContain('Aucune offre disponible')
        expect(mockGetOffers).toHaveBeenCalled()
      },
      { timeout: 2000 },
    )
  })
})
