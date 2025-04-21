import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Lap, LapsParams } from '../types';

// Define the query key generator
const getLapsQueryKey = (params?: LapsParams): QueryKey => ['laps', params];

/**
 * Custom hook to fetch lap data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the lap data (conforms to LapsParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useLaps = (
  params?: LapsParams,
  options?: Omit<
    UseQueryOptions<Lap[], Error, Lap[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getLapsQueryKey(params);

  return useQuery<Lap[], Error, Lap[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Lap[]>('/laps', params),
    ...options,
  });
};
