/**
 * Service for managing internship offers
 * Provides functions to fetch offers from the API
 */

import { apiRequest } from './api.js'

/**
 * Get all offers from the API
 * @returns {Promise<Array>} Array of offers
 * @throws {Object} Error object with { error: string, status?: number }
 */
export async function getOffers() {
  try {
    const offers = await apiRequest('/offers')
    return offers
  } catch (error) {
    throw {
      error: error.error || 'Failed to fetch offers',
      status: error.status,
    }
  }
}

/**
 * Search offers by query string
 * @param {string} query - Search query (keywords)
 * @returns {Promise<Array>} Array of matching offers
 * @throws {Object} Error object with { error: string, status?: number }
 */
export async function searchOffers(query) {
  try {
    // Si query est vide, retourner toutes les offres
    if (!query || query.trim() === '') {
      return await getOffers()
    }

    // Recherche avec query params
    const offers = await apiRequest(`/offers?q=${encodeURIComponent(query.trim())}`)
    return offers
  } catch (error) {
    throw {
      error: error.error || 'Failed to search offers',
      status: error.status,
    }
  }
}
