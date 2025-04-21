import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { CarData, CarDataParams } from '../types';

// Define the query key generator
const getCarDataQueryKey = (params?: CarDataParams): QueryKey => [
  'carData',
  params,
];

/**
 * Custom hook to fetch car data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the car data (conforms to CarDataParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useCarData = (
  params?: CarDataParams,
  options?: Omit<
    UseQueryOptions<CarData[], Error, CarData[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getCarDataQueryKey(params);

  return useQuery<CarData[], Error, CarData[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<CarData[]>('/car_data', params),
    ...options, // Spread the rest of the options
  });
};
