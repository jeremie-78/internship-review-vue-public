import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Import via relative path (unit tests run in node env)
import * as offersComposable from '../../app/composables/useOffers'

describe('useOffers.searchOffers (unit)', () => {
  const useRuntimeConfigStub = vi.fn()
  const fetchStub = vi.fn()

  beforeEach(() => {
    useRuntimeConfigStub.mockReturnValue({
      public: { apiBase: 'http://localhost:3000/' },
    })

    fetchStub.mockReset()
    vi.stubGlobal('useRuntimeConfig', useRuntimeConfigStub)
    vi.stubGlobal('$fetch', fetchStub)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('fallback vers getOffers si query vide/whitespace', async () => {
    fetchStub.mockResolvedValue([{ id: 1, title: 't', company: 'c', location: 'l', type: 'x' }])

    const res = await offersComposable.searchOffers('   ')
    expect(fetchStub).toHaveBeenCalledTimes(1)
    expect(fetchStub.mock.calls[0]?.[0]).toBe('http://localhost:3000/offers')
    expect(res.length).toBe(1)
  })

  it('appelle $fetch sur /offers?q=... avec query trimée et encodée', async () => {
    fetchStub.mockResolvedValue([{ id: 1, title: 't', company: 'c', location: 'l', type: 'x' }])

    const res = await offersComposable.searchOffers(' front end ')
    expect(fetchStub).toHaveBeenCalledTimes(1)
    expect(fetchStub.mock.calls[0]?.[0]).toBe('http://localhost:3000/offers?q=front%20end')
    expect(res.length).toBe(1)
  })

  it('remonte une OffersError (même format que getOffers) en cas d’erreur $fetch', async () => {
    fetchStub.mockRejectedValue({ data: { error: 'boom' }, statusCode: 500 })

    await expect(offersComposable.searchOffers('test')).rejects.toMatchObject({
      error: 'boom',
      status: 500,
    })
  })
})

