import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'
import router from '../router'

describe('App', () => {
  it('mounts and renders layout', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    await router.isReady()
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.text()).toContain('Internship Review')
  })
})
