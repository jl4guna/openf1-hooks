import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Driver, DriversParams } from '../types';

// Define the query key generator
const getDriversQueryKey = (params?: DriversParams): QueryKey => [
  'drivers',
  params,
];

/**
 * Custom hook to fetch driver data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the driver data (conforms to DriversParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useDrivers = (
  params?: DriversParams,
  options?: Omit<
    UseQueryOptions<Driver[], Error, Driver[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getDriversQueryKey(params);

  return useQuery<Driver[], Error, Driver[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Driver[]>('/drivers', params),
    ...options,
  });
};
