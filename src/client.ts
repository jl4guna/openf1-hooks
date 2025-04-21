import { BaseParams } from './types';

const API_BASE_URL = 'https://api.openf1.org/v1';

/**
 * Cleans up parameters by removing undefined or null values.
 */
const cleanParams = (params: Record<string, any>): Record<string, string> => {
  const cleaned: Record<string, string> = {};
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      cleaned[key] = String(params[key]);
    }
  }
  return cleaned;
};

/**
 * Generic function to fetch data from the OpenF1 API using fetch.
 * @param endpoint The API endpoint path (e.g., '/car_data')
 * @param params Optional query parameters for filtering
 * @returns Promise resolving to the fetched data
 */
export const fetchData = async <T>(
  endpoint: string,
  params?: BaseParams
): Promise<T> => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (params) {
    // Clean params and append them to the URL
    const cleaned = cleanParams(params);
    url.search = new URLSearchParams(cleaned).toString();
  }

  try {
    const response = await fetch(url.toString());

    // Check for HTTP errors (fetch doesn't throw on 4xx/5xx)
    if (!response.ok) {
      let errorData: any = null;
      try {
        // Try to parse error response body
        errorData = await response.json();
      } catch (jsonError) {
        // Ignore if response body is not valid JSON
      }
      console.error(
        `API error fetching ${endpoint}: Status ${response.status} ${response.statusText}`,
        errorData
      );
      throw new Error(
        errorData?.message ||
          `HTTP error ${response.status}: ${response.statusText}` ||
          'An unknown API error occurred'
      );
    }

    // Parse the JSON response body
    const data: T = await response.json();
    return data;
  } catch (error) {
    // Handle network errors or errors thrown above
    if (error instanceof Error) {
      console.error(`Error fetching ${endpoint}:`, error.message);
      // Re-throw the existing error or a generic one
      throw error;
    } else {
      // Handle unexpected non-Error throws
      console.error(`Unexpected error fetching ${endpoint}:`, error);
      throw new Error('An unexpected error occurred during fetch');
    }
  }
};
