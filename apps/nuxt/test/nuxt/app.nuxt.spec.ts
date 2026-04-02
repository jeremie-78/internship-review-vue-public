import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, vi } from 'vitest'
import HomePage from '~/pages/home.vue'

vi.mock('~/services/authService', async (importOriginal) => {
  const mod = await importOriginal<typeof import('~/services/authService')>()
  return {
    ...mod,
    isAuthenticated: () => true,
  }
})

describe('App (Nuxt runtime)', () => {
  it('renders home page with layout and content', async () => {
    const wrapper = await mountSuspended(HomePage, { route: '/home' })
    expect(wrapper.html()).toContain('Trouvez votre stage idéal')
    expect(wrapper.html()).toContain('Internship Review')
  })
})
