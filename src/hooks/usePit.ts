import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Pit, PitParams } from '../types';

// Define the query key generator
const getPitQueryKey = (params?: PitParams): QueryKey => ['pit', params];

/**
 * Custom hook to fetch pit stop data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the pit stop data (conforms to PitParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const usePit = (
  params?: PitParams,
  options?: Omit<
    UseQueryOptions<Pit[], Error, Pit[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getPitQueryKey(params);

  return useQuery<Pit[], Error, Pit[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Pit[]>('/pit', params),
    ...options,
  });
};
