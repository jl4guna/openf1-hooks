import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Stint, StintsParams } from '../types';

// Define the query key generator
const getStintsQueryKey = (params?: StintsParams): QueryKey => [
  'stints',
  params,
];

/**
 * Custom hook to fetch stint data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the stint data (conforms to StintsParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useStints = (
  params?: StintsParams,
  options?: Omit<
    UseQueryOptions<Stint[], Error, Stint[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getStintsQueryKey(params);

  return useQuery<Stint[], Error, Stint[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Stint[]>('/stints', params),
    ...options,
  });
};
