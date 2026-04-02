/**
 * Exemple minimal : GET /api/hello → message pour tester le client ↔ Nitro.
 */
export default defineEventHandler(() => {
  return { message: 'Hello world' }
})
