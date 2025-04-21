import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { fetchData } from '../client';
import { Weather, WeatherParams } from '../types';

// Define the query key generator
const getWeatherQueryKey = (params?: WeatherParams): QueryKey => [
  'weather',
  params,
];

/**
 * Custom hook to fetch weather data from the OpenF1 API.
 *
 * @param params - Optional parameters to filter the weather data (conforms to WeatherParams).
 * @param options - Optional React Query options.
 * @returns The result of the useQuery hook.
 */
export const useWeather = (
  params?: WeatherParams,
  options?: Omit<
    UseQueryOptions<Weather[], Error, Weather[], QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryKey = getWeatherQueryKey(params);

  return useQuery<Weather[], Error, Weather[], QueryKey>({
    queryKey: queryKey,
    queryFn: () => fetchData<Weather[]>('/weather', params),
    ...options,
  });
};
