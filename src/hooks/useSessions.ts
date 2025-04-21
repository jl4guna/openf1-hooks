import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Session, SessionsParams } from '../types';

// Define the query key generator
const getSessionsQueryKey = (params?: SessionsParams): QueryKey => [
  'sessions',
  params,
];

/**
 * Custom hook to fetch session data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the session data (conforms to SessionsParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useSessions = (
  params?: SessionsParams,
  options?: Omit<
    UseQueryOptions<Session[], Error, Session[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getSessionsQueryKey(params);

  return useQuery<Session[], Error, Session[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Session[]>('/sessions', params),
    ...options,
  });
};
