/**
 * Base API configuration and helper functions
 * Provides centralized API configuration and error handling
 */

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Standardized error format
 * @typedef {Object} ApiError
 * @property {string} error - Error message
 * @property {number} [status] - HTTP status code
 */

/**
 * Helper function for API calls with error handling
 * @param {string} endpoint - API endpoint (relative to base URL)
 * @param {RequestInit} [options] - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - Response data or throws error
 * @throws {ApiError} - Standardized error object
 */
export async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    })

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')

    if (!response.ok) {
      const errorData = isJson ? await response.json().catch(() => ({})) : {}
      throw {
        error: errorData.error || `HTTP Error: ${response.statusText}`,
        status: response.status,
      }
    }

    // Return parsed JSON or empty object for non-JSON responses
    if (isJson) {
      return await response.json()
    }

    return {}
  } catch (error) {
    // Handle network errors or other fetch failures
    if (error.error) {
      // Already formatted error from above
      throw error
    }

    throw {
      error: error.message || 'Network error: Failed to fetch',
      status: error.status,
    }
  }
}

/**
 * Export API configuration for use in other services
 */
export const apiConfig = {
  baseURL: API_BASE_URL,
}
