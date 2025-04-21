import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Meeting, MeetingsParams } from '../types';

// Define the query key generator
const getMeetingsQueryKey = (params?: MeetingsParams): QueryKey => [
  'meetings',
  params,
];

/**
 * Custom hook to fetch meeting data (Grand Prix events) from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the meeting data (conforms to MeetingsParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useMeetings = (
  params?: MeetingsParams,
  options?: Omit<
    UseQueryOptions<Meeting[], Error, Meeting[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getMeetingsQueryKey(params);

  return useQuery<Meeting[], Error, Meeting[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Meeting[]>('/meetings', params),
    ...options,
  });
};
