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

  it('emits "search" on submit with trimmed query', async () => {
    const wrapper = await mountSuspended(SearchBar, {
      props: { modelValue: '  test  ' },
    })
    const form = wrapper.find('form')
    await form.trigger('submit')
    expect(wrapper.emitted('search')).toEqual([['test']])
  })

  it('does not emit "search" on submit if query is empty', async () => {
    const wrapper = await mountSuspended(SearchBar, {
      props: { modelValue: '   ' },
    })
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('search')).toBeUndefined()
  })
})
