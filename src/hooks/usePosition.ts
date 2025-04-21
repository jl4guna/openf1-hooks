import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Position, PositionParams } from '../types';

// Define the query key generator
const getPositionQueryKey = (params?: PositionParams): QueryKey => [
  'position',
  params,
];

/**
 * Custom hook to fetch position data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the position data (conforms to PositionParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const usePosition = (
  params?: PositionParams,
  options?: Omit<
    UseQueryOptions<Position[], Error, Position[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getPositionQueryKey(params);

  return useQuery<Position[], Error, Position[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Position[]>('/position', params),
    ...options,
  });
};
