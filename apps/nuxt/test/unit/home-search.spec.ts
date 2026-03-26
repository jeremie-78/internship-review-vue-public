import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const projectRoot = join(import.meta.dirname, '..', '..')

describe('Home page search wiring (Story 3.4)', () => {
  it('home.vue wires SearchBar search to router.push(/results?q=...)', () => {
    const homePath = join(projectRoot, 'app', 'pages', 'home.vue')
    expect(existsSync(homePath)).toBe(true)

    const content = readFileSync(homePath, 'utf-8')
    expect(content).toContain('useRouter')
    expect(content).toContain("router.push({ path: '/results', query: { q } })")
    expect(content).toContain('@search="handleSearch"')
  })
})

