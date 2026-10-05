/**
 * API Configuration and utilities
 * Uses VITE_CODESPACE_NAME environment variable for multi-environment support
 * Falls back to localhost:8000 if VITE_CODESPACE_NAME is not defined
 */

const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getBaseUrl();

/**
 * Parses API response to handle both paginated and array responses
 * @param {Object} data - Response data from API
 * @returns {Array} Array of items
 */
export const parseApiResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  
  if (data && typeof data === 'object') {
    // Handle paginated responses with common property names
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.results)) return data.results;
  }
  
  return [];
};

/**
 * Fetches data from API endpoint
 * @param {string} endpoint - API endpoint (e.g., '/activities')
 * @returns {Promise<Array>} Array of items from API
 */
export const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return parseApiResponse(data);
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return [];
  }
};
