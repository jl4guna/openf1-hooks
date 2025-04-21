import axios from 'axios';
import { BaseParams } from './types';

const API_BASE_URL = 'https://api.openf1.org/v1';

// Create an axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Generic function to fetch data from the OpenF1 API.
 * @param endpoint The API endpoint path (e.g., '/car_data')
 * @param params Optional query parameters for filtering
 * @returns Promise resolving to the fetched data
 */
export const fetchData = async <T>(
  endpoint: string,
  params?: BaseParams
): Promise<T> => {
  try {
    const response = await apiClient.get<T>(endpoint, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error(
        `Axios error fetching ${endpoint}:`,
        error.response?.status,
        error.message
      );
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'An unknown API error occurred'
      );
    } else {
      // Handle unexpected errors
      console.error(`Unexpected error fetching ${endpoint}:`, error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Example usage (for testing purposes, can be removed later):
// fetchData<{ any[] }>('/sessions', { year: 2023, country_name: 'Monaco' })
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
