import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { RaceControl, RaceControlParams } from '../types';

// Define the query key generator
const getRaceControlQueryKey = (params?: RaceControlParams): QueryKey => [
  'raceControl',
  params,
];

/**
 * Custom hook to fetch race control messages from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the race control messages (conforms to RaceControlParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useRaceControl = (
  params?: RaceControlParams,
  options?: Omit<
    UseQueryOptions<RaceControl[], Error, RaceControl[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getRaceControlQueryKey(params);

  return useQuery<RaceControl[], Error, RaceControl[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<RaceControl[]>('/race_control', params),
    ...options,
  });
};
