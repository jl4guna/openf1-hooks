import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Interval, IntervalsParams } from '../types';

// Define the query key generator
const getIntervalsQueryKey = (params?: IntervalsParams): QueryKey => [
  'intervals',
  params,
];

/**
 * Custom hook to fetch interval data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the interval data (conforms to IntervalsParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useIntervals = (
  params?: IntervalsParams,
  options?: Omit<
    UseQueryOptions<Interval[], Error, Interval[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getIntervalsQueryKey(params);

  return useQuery<Interval[], Error, Interval[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Interval[]>('/intervals', params),
    ...options,
  });
};
