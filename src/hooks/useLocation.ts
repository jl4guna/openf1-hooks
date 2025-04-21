import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Location, LocationParams } from '../types';

// Define the query key generator
const getLocationQueryKey = (params?: LocationParams): QueryKey => [
  'location',
  params,
];

/**
 * Custom hook to fetch location data (car positions) from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the location data (conforms to LocationParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useLocation = (
  params?: LocationParams,
  options?: Omit<
    UseQueryOptions<Location[], Error, Location[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getLocationQueryKey(params);

  return useQuery<Location[], Error, Location[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Location[]>('/location', params),
    ...options,
  });
};
