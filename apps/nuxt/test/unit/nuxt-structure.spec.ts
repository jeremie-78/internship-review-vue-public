import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const projectRoot = join(import.meta.dirname, '..', '..')
const appDir = join(projectRoot, 'app')

describe('Nuxt structure (AC #1, #7)', () => {
  it('nuxt.config has css global and Tailwind via Vite', async () => {
    const configPath = join(projectRoot, 'nuxt.config.ts')
    expect(existsSync(configPath)).toBe(true)
    const content = readFileSync(configPath, 'utf-8')
    expect(content).toContain('css:')
    expect(content).toContain('tailwindcss')
    expect(content).toMatch(/vite|plugins/)
  })

  it('app/app.vue uses NuxtLayout and NuxtPage', () => {
    const appPath = join(projectRoot, 'app', 'app.vue')
    expect(existsSync(appPath)).toBe(true)
    const content = readFileSync(appPath, 'utf-8')
    expect(content).toContain('NuxtPage')
    expect(content).toContain('NuxtLayout')
  })

  it('app/pages/ directory exists (Nuxt srcDir)', () => {
    expect(existsSync(join(appDir, 'pages'))).toBe(true)
  })

  it('app/components/ and app/layouts/ exist (AC #2)', () => {
    expect(existsSync(join(appDir, 'components'))).toBe(true)
    expect(existsSync(join(appDir, 'layouts'))).toBe(true)
  })

  it('default layout and home page exist (AC #3, #4)', () => {
    expect(existsSync(join(appDir, 'layouts', 'default.vue'))).toBe(true)
    expect(existsSync(join(appDir, 'pages', 'home.vue'))).toBe(true)
    const layoutContent = readFileSync(join(appDir, 'layouts', 'default.vue'), 'utf-8')
    expect(layoutContent).toContain('<slot />')
    expect(layoutContent).toContain('AppHeader')
    expect(layoutContent).toContain('AppFooter')
  })

  it('AppHeader and AppFooter use NuxtLink (AC #5)', () => {
    const headerPath = join(appDir, 'components', 'AppHeader.vue')
    const footerPath = join(appDir, 'components', 'AppFooter.vue')
    expect(existsSync(headerPath)).toBe(true)
    expect(existsSync(footerPath)).toBe(true)
    const headerContent = readFileSync(headerPath, 'utf-8')
    expect(headerContent).toContain('NuxtLink')
  })
})
