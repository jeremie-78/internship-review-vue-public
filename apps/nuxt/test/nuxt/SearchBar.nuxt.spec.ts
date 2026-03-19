import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SearchBar from '~/components/SearchBar.vue'

describe('SearchBar (Nuxt runtime)', () => {
  it('renders input and Rechercher button', async () => {
    const wrapper = await mountSuspended(SearchBar, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.text()).toContain('Rechercher')
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('does not navigate on submit (recherche non fonctionnelle)', async () => {
    const wrapper = await mountSuspended(SearchBar, {
      props: { modelValue: 'test' },
    })
    const form = wrapper.find('form')
    await form.trigger('submit')
    // Aucun NuxtLink ni router utilisé : pas de navigation attendue.
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    expect(links.length).toBe(0)
  })
})
