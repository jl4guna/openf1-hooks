# openf1-hooks

React Query wrapper for the unofficial [OpenF1 API](https://openf1.org/).

Provides TypeScript-ready custom hooks to easily fetch Formula 1 data (lap times, telemetry, positions, etc.) within your React applications.

## Installation

```bash
npm install openf1-hooks @tanstack/react-query
# or
yarn add openf1-hooks @tanstack/react-query
# or
pnpm add openf1-hooks @tanstack/react-query
```

**Note:** `@tanstack/react-query` is peer dependencies and need to be installed alongside this package.

## Setup

Wrap your application (or the relevant part of it) with `QueryClientProvider` from `@tanstack/react-query`:

```jsx
// src/main.jsx or src/App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

## Usage

Import the desired hook and use it in your React components.

### **Example: Fetching Session Data**

```jsx
import React from 'react';
import { useSessions } from 'openf1-hooks';

function SessionList() {
  // Fetch sessions for the 2024 Monaco Grand Prix
  const { data: sessions, isLoading, isError, error } = useSessions({
    year: 2024,
    meeting_name: 'Monaco Grand Prix', // Use meeting_name or other filters
  });

  if (isLoading) {
    return <span>Loading sessions...</span>;
  }

  if (isError) {
    return <span>Error fetching sessions: {error.message}</span>;
  }

  return (
    <div>
      <h2>Monaco 2024 Sessions</h2>
      <ul>
        {sessions?.map((session) => (
          <li key={session.session_key}>
            {session.session_name} ({session.session_type}) - Start: {new Date(session.date_start).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionList;
```

### **Example: Fetching Latest Car Data for a Driver**

```jsx
import React from 'react';
import { useCarData } from 'openf1-hooks';

function DriverTelemetry({ driverNumber }) {
  // Fetch latest car data for a specific driver in the latest session
  const { data: carData, isLoading, isError, error } = useCarData(
    {
      driver_number: driverNumber,
      session_key: 'latest',
    },
    {
      // Optional: Refetch every 5 seconds
      refetchInterval: 5000,
    }
  );

  if (isLoading) {
    return <span>Loading telemetry for driver {driverNumber}...</span>;
  }

  if (isError) {
    return <span>Error fetching telemetry: {error.message}</span>;
  }

  // Display the latest telemetry point (API returns an array)
  const latestPoint = carData?.[carData.length - 1];

  return (
    <div>
      <h3>Driver {driverNumber} Telemetry (Latest)</h3>
      {latestPoint ? (
        <pre>{JSON.stringify(latestPoint, null, 2)}</pre>
      ) : (
        <span>No data available.</span>
      )}
    </div>
  );
}

export default DriverTelemetry;
```

## Available Hooks

* `useCarData(params?, options?)`
* `useDrivers(params?, options?)`
* `useIntervals(params?, options?)`
* `useLaps(params?, options?)`
* `useLocation(params?, options?)`
* `useMeetings(params?, options?)`
* `usePit(params?, options?)`
* `usePosition(params?, options?)`
* `useRaceControl(params?, options?)`
* `useSessions(params?, options?)`
* `useStints(params?, options?)`
* `useTeamRadio(params?, options?)`
* `useWeather(params?, options?)`

Refer to `src/types.ts` for the specific parameters (`*Params`) available for each hook and the structure of the returned data.

## Contributing

Contributions are welcome! Please refer to the contribution guidelines.

## License

MIT
