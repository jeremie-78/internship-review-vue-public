import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

describe('App (Nuxt runtime)', () => {
  it('renders home page with layout and content', async () => {
    const wrapper = await mountSuspended(App, { route: '/home-page' })
    expect(wrapper.html()).toContain('Trouvez votre stage idéal')
    expect(wrapper.html()).toContain('Internship Review')
  })
})
