# openf1-hooks

**React Query hooks for the unofficial [OpenF1 API](https://openf1.org/).**

This library provides a set of clean, typed, custom React Query hooks to easily fetch real-time and historical Formula 1 data directly from the OpenF1 API within your React applications. Simplify data fetching, caching, and state management for F1 stats like lap times, car telemetry, driver positions, weather, and more.

Built with TypeScript for robust type safety.

[![npm version](https://badge.fury.io/js/openf1-hooks.svg)](https://badge.fury.io/js/openf1-hooks) <!-- TODO: Update badge link after publishing -->

## Features

*   **Simple API:** One hook per OpenF1 API endpoint.
*   **Type-Safe:** Fully written in TypeScript with exported types for API responses and query parameters.
*   **React Query Integration:** Leverages `@tanstack/react-query` (v5) for caching, background updates, stale-while-revalidate, etc.
*   **Lightweight:** Uses native `fetch` and has minimal dependencies.
*   **Flexible Filtering:** Supports all filtering capabilities of the OpenF1 API.

## Installation

```bash
npm install openf1-hooks @tanstack/react-query
# or
yarn add openf1-hooks @tanstack/react-query
# or
pnpm add openf1-hooks @tanstack/react-query
```

**Peer Dependencies:**

This package requires `@tanstack/react-query` (v5) and `react` (>=16.8.0) to be installed in your project.

## Setup

Ensure your application is wrapped with `QueryClientProvider` from `@tanstack/react-query`.

```jsx
// Example: src/main.jsx or src/App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'; // Your main application component

// 1. Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Optional: Default query config (e.g., stale time)
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// 2. Wrap your App with the QueryClientProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

## Usage

1.  **Import** the hook corresponding to the OpenF1 API endpoint you need.
2.  **Call** the hook within your functional React component, optionally passing parameters for filtering and React Query options.
3.  **Use** the returned state (`data`, `isLoading`, `isError`, `error`, etc.) to render your UI.

### Return Value

Each hook returns the standard object provided by React Query's `useQuery`, which includes:

*   `data`: The fetched data from the API (typed according to the endpoint, e.g., `Session[]`, `CarData[]`). `undefined` while loading or if an error occurred.
*   `isLoading`: `true` if the query is currently fetching for the first time.
*   `isFetching`: `true` if the query is fetching in the background (e.g., refetching).
*   `isSuccess`: `true` if the query completed successfully.
*   `isError`: `true` if the query encountered an error.
*   `error`: The error object if `isError` is true, otherwise `null`.
*   `refetch`: A function to manually trigger a refetch of the query.
*   ... and other `useQuery` properties.

### Examples

**1. Fetching All Meetings in 2024**

```jsx
import React from 'react';
import { useMeetings, Meeting } from 'openf1-hooks'; // Import hook and type

function MeetingList() {
  const { data: meetings, isLoading, isError, error } = useMeetings({ year: 2024 });

  if (isLoading) return <p>Loading meetings...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>F1 Meetings 2024</h2>
      <ul>
        {meetings?.map((meeting: Meeting) => (
          <li key={meeting.meeting_key}>
            {meeting.meeting_name} ({meeting.country_name}) - {new Date(meeting.date_start).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**2. Fetching Specific Driver Info for the Latest Session**

```jsx
import React from 'react';
import { useDrivers, Driver } from 'openf1-hooks';

function DriverInfo({ driverNumber = 1 }) { // Default to Max Verstappen (No. 1)
  const { data: driverData, isLoading, isError } = useDrivers(
    { driver_number: driverNumber, session_key: 'latest' },
    { staleTime: Infinity } // Optional: Keep this data fresh indefinitely
  );

  if (isLoading) return <p>Loading driver {driverNumber} info...</p>;
  // API returns an array, even for a single driver query
  const driver = driverData?.[0];

  if (isError || !driver) return <p>Could not load driver info.</p>;

  return (
    <div>
      <h3>{driver.full_name} (#{driver.driver_number})</h3>
      <p>Team: {driver.team_name}</p>
      <img src={driver.headshot_url} alt={driver.full_name} width="100" />
    </div>
  );
}
```

**3. Fetching High-Speed Car Telemetry (Filtering with Operators)**

This example demonstrates filtering car data where speed is greater than or equal to 330 km/h.

```jsx
import React from 'react';
import { useCarData, CarData } from 'openf1-hooks';

function HighSpeedMoments({ sessionKey = 'latest', driverNumber = 55 }) {
  const { data, isLoading, isError } = useCarData(
    {
      session_key: sessionKey,
      driver_number: driverNumber,
      // Pass filter operators directly as string keys
      'speed>=': 330, // Get data points where speed >= 330
    },
    {
      refetchInterval: 10000, // Optional: refetch every 10 seconds
    }
  );

  if (isLoading) return <p>Loading high speed data...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <div>
      <h4>High Speed Telemetry (>= 330 km/h) for Driver {driverNumber}</h4>
      {data && data.length > 0 ? (
        <ul>
          {data.map((point: CarData) => (
            <li key={point.date}>
              Speed: {point.speed} km/h, RPM: {point.rpm}, Gear: {point.n_gear} at {new Date(point.date).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No telemetry points found matching criteria.</p>
      )}
    </div>
  );
}
```

## Available Hooks

Each hook corresponds to an endpoint in the OpenF1 API v1.

| Hook             | Endpoint          | Fetches                                      | Parameter Type    |
| :--------------- | :---------------- | :------------------------------------------- | :---------------- |
| `useCarData`     | `/car_data`       | Car telemetry (speed, rpm, gear, drs, etc.)  | `CarDataParams`   |
| `useDrivers`     | `/drivers`        | Driver information (name, number, team, etc.) | `DriversParams`   |
| `useIntervals`   | `/intervals`      | Time intervals between drivers               | `IntervalsParams` |
| `useLaps`        | `/laps`           | Lap timing data (lap times, sector times)    | `LapsParams`      |
| `useLocation`    | `/location`       | Car location data (x, y, z coordinates)      | `LocationParams`  |
| `useMeetings`    | `/meetings`       | Meeting (Grand Prix) details                 | `MeetingsParams`  |
| `usePit`         | `/pit`            | Pit stop information                         | `PitParams`       |
| `usePosition`    | `/position`       | Driver positions during a session            | `PositionParams`  |
| `useRaceControl` | `/race_control`   | Race control messages (flags, SC, incidents) | `RaceControlParams`|
| `useSessions`    | `/sessions`       | Session details (FP1, Quali, Race, etc.)     | `SessionsParams`  |
| `useStints`      | `/stints`         | Driver stints (tyre compound, lap range)     | `StintsParams`    |
| `useTeamRadio`   | `/team_radio`     | Team radio recording URLs                  | `TeamRadioParams` |
| `useWeather`     | `/weather`        | Weather information                          | `WeatherParams`   |

## Parameters and Filtering

All hooks accept an optional `params` object as the first argument to filter the API results. These correspond to the query parameters supported by the OpenF1 API.

*   **Common Parameters:** Most endpoints support `session_key`, `meeting_key`, and `driver_number`. Use the value `'latest'` for `session_key` or `meeting_key` to get data from the most recent session or meeting.
*   **Specific Parameters:** Each hook uses a specific parameter type (e.g., `LapsParams`, `SessionsParams`, see table above) which may include additional fields relevant to that endpoint (e.g., `lap_number` for `useLaps`, `year` for `useSessions`). Refer to `src/types.ts` (or the generated type definitions) for details.
*   **Operator Filtering:** The OpenF1 API allows filtering with operators (like `>`, `<`, `>=`, `<=`). You can pass these directly as keys in the `params` object. The key should be the field name followed by the operator.
    *   Example: `params: { 'speed>=': 300 }` filters for car data where speed is greater than or equal to 300.
    *   Example: `params: { 'date<': '2024-05-20T12:00:00' }` filters for data before a specific timestamp.
*   Refer to the [OpenF1 API Documentation - Data Filtering](https://openf1.org/#data-filtering) section for more details on available filters and operators.

## Types

All API response types (e.g., `CarData`, `Session`, `Meeting`) and parameter types (e.g., `CarDataParams`, `SessionsParams`) are exported by the library.
You can import them directly for type hinting and better developer experience:

```typescript
import { useSessions, Session, SessionsParams } from 'openf1-hooks';

const params: SessionsParams = { year: 2024 };

// Type for the data variable will be Session[] | undefined
const { data } = useSessions(params);
```

The source of truth for these types is `src/types.ts` in the repository and the generated `dist/index.d.ts` file in the published package.

## Contributing

Contributions are welcome! Please open an issue or pull request on the [GitHub repository](https://github.com/jl4guna/openf1-hooks).

(TODO: Add more detailed contribution guidelines if needed).

## License

MIT
