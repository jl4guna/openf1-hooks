import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { TeamRadio, TeamRadioParams } from '../types';

// Define the query key generator
const getTeamRadioQueryKey = (params?: TeamRadioParams): QueryKey => [
  'teamRadio',
  params,
];

/**
 * Custom hook to fetch team radio data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the team radio data (conforms to TeamRadioParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useTeamRadio = (
  params?: TeamRadioParams,
  options?: Omit<
    UseQueryOptions<TeamRadio[], Error, TeamRadio[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getTeamRadioQueryKey(params);

  return useQuery<TeamRadio[], Error, TeamRadio[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<TeamRadio[]>('/team_radio', params),
    ...options,
  });
};
