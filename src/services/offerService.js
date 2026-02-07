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
