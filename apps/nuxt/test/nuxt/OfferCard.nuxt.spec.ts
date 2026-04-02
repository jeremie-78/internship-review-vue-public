import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import OfferCard from '~/components/OfferCard.vue'

const offer = {
  id: 1,
  title: 'Développeur Full Stack',
  company: 'TechCorp',
  location: 'Paris, France',
  type: 'Stage',
}

describe('OfferCard (Nuxt runtime)', () => {
  it('affiche titre, entreprise, localisation et type', async () => {
    const wrapper = await mountSuspended(OfferCard, {
      props: { offer },
    })
    expect(wrapper.text()).toContain('Développeur Full Stack')
    expect(wrapper.text()).toContain('TechCorp')
    expect(wrapper.text()).toContain('Paris, France')
    expect(wrapper.text()).toContain('Stage')
  })

  it('contient un h3 pour le titre et un badge pour le type', async () => {
    const wrapper = await mountSuspended(OfferCard, {
      props: { offer },
    })
    const h3 = wrapper.find('h3')
    expect(h3.exists()).toBe(true)
    expect(h3.text()).toBe(offer.title)
    const badge = wrapper.find('span.rounded-full')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe(offer.type)
  })
})
