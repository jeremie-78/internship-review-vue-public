import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from '~/components/AppHeader.vue'

describe('AppHeader (Nuxt runtime)', () => {
  it('renders app title and navigation links', async () => {
    const wrapper = await mountSuspended(AppHeader)
    expect(wrapper.text()).toContain('Internship Review')
    expect(wrapper.text()).toContain('Accueil')
    expect(wrapper.text()).toContain('Offres')
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    expect(links.length).toBeGreaterThanOrEqual(2)
  })
})
