// We will define all API response types and query parameter types here

/**
 * Base type for query parameters common to multiple endpoints.
 * Allows filtering by `session_key` and `meeting_key`.
 */
export interface BaseParams {
  session_key?: number | 'latest';
  meeting_key?: number | 'latest';
  driver_number?: number;
  [key: string]: any; // Allow any other string key for flexible filtering like speed>=300 etc.
}

// --- Car Data ---

/**
 * Represents the structure of a single car data entry from the API.
 */
export interface CarData {
  brake: number; // 0 or 100
  date: string; // ISO 8601 timestamp
  driver_number: number;
  drs: number; // DRS status code (see documentation for mapping)
  meeting_key: number;
  n_gear: number; // 0-8
  rpm: number;
  session_key: number;
  speed: number; // km/h
  throttle: number; // percentage
}

/**
 * Type alias for query parameters for the car_data endpoint.
 * Uses BaseParams for common filters and allows specific car_data field filtering.
 */
export type CarDataParams = BaseParams;

// --- Drivers ---

/**
 * Represents the structure of a single driver entry from the API.
 */
export interface Driver {
  broadcast_name: string;
  country_code: string;
  driver_number: number;
  first_name: string;
  full_name: string;
  headshot_url: string;
  last_name: string;
  meeting_key: number;
  name_acronym: string;
  session_key: number;
  team_colour: string; // Hex color code RRGGBB
  team_name: string;
}

/**
 * Type alias for query parameters for the drivers endpoint.
 */
export type DriversParams = BaseParams;

// --- Intervals ---

/**
 * Represents the structure of a single interval entry from the API.
 */
export interface Interval {
  date: string; // ISO 8601 timestamp
  driver_number: number;
  gap_to_leader: number | string | null; // Seconds, "+1 LAP", or null
  interval: number | string | null; // Seconds, "+1 LAP", or null
  meeting_key: number;
  session_key: number;
}

/**
 * Type alias for query parameters for the intervals endpoint.
 */
export type IntervalsParams = BaseParams;

// --- Laps ---

/**
 * Represents the structure of a single lap entry from the API.
 */
export interface Lap {
  date_start: string; // ISO 8601 timestamp
  driver_number: number;
  duration_sector_1: number | null;
  duration_sector_2: number | null;
  duration_sector_3: number | null;
  i1_speed: number | null; // Speed at intermediate 1 (km/h)
  i2_speed: number | null; // Speed at intermediate 2 (km/h)
  is_pit_out_lap: boolean;
  lap_duration: number | null; // Total lap time in seconds
  lap_number: number;
  meeting_key: number;
  segments_sector_1: number[]; // Array of mini-sector values (see documentation)
  segments_sector_2: number[];
  segments_sector_3: number[];
  session_key: number;
  st_speed: number | null; // Speed at speed trap (km/h)
}

/**
 * Type alias for query parameters for the laps endpoint.
 * Adds `lap_number` to the base parameters.
 */
export interface LapsParams extends BaseParams {
  lap_number?: number;
}

// --- Location ---

/**
 * Represents the structure of a single location entry (car position) from the API.
 */
export interface Location {
  date: string; // ISO 8601 timestamp
  driver_number: number;
  meeting_key: number;
  session_key: number;
  x: number; // Cartesian coordinate
  y: number; // Cartesian coordinate
  z: number; // Cartesian coordinate
}

/**
 * Type alias for query parameters for the location endpoint.
 * Allows filtering by date ranges in addition to base params.
 */
export interface LocationParams extends BaseParams {
  date?: string; // Can be used with operators like date>=..., date<...
}

// --- Meetings ---

/**
 * Represents the structure of a single meeting (Grand Prix event) from the API.
 */
export interface Meeting {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_start: string; // ISO 8601 timestamp
  gmt_offset: string; // e.g., "08:00:00"
  location: string;
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  year: number;
}

/**
 * Type alias for query parameters for the meetings endpoint.
 */
export interface MeetingsParams extends BaseParams {
  year?: number;
  country_name?: string;
  country_code?: string;
  circuit_key?: number;
  circuit_short_name?: string;
  meeting_name?: string;
  // Note: date_start filtering uses operators like date_start>=...
}

// --- Pit ---

/**
 * Represents the structure of a single pit stop entry from the API.
 */
export interface Pit {
  date: string; // ISO 8601 timestamp
  driver_number: number;
  lap_number: number;
  meeting_key: number;
  pit_duration: number; // Seconds
  session_key: number;
}

/**
 * Type alias for query parameters for the pit endpoint.
 */
export interface PitParams extends BaseParams {
  lap_number?: number;
  pit_duration?: number; // Can be used with operators like pit_duration<...
}

// --- Position ---

/**
 * Represents the structure of a single position entry from the API.
 */
export interface Position {
  date: string; // ISO 8601 timestamp
  driver_number: number;
  meeting_key: number;
  position: number;
  session_key: number;
}

/**
 * Type alias for query parameters for the position endpoint.
 */
export interface PositionParams extends BaseParams {
  position?: number; // Can be used with operators like position<=...
}

// --- Race Control ---

/**
 * Represents the structure of a single race control message from the API.
 */
export interface RaceControl {
  category: string;
  date: string; // ISO 8601 timestamp
  driver_number: number | null;
  flag: string | null; // e.g., "YELLOW", "GREEN", "BLACK AND WHITE"
  lap_number: number | null;
  meeting_key: number;
  message: string;
  scope: string; // e.g., "Track", "Driver", "Sector"
  sector: number | null;
  session_key: number;
}

/**
 * Type alias for query parameters for the race_control endpoint.
 */
export interface RaceControlParams extends BaseParams {
  category?: string;
  flag?: string;
  lap_number?: number;
  scope?: string;
  sector?: number;
  date?: string; // Can be used with operators like date>=...
}

// --- Sessions ---

/**
 * Represents the structure of a single session entry (Practice, Qualifying, Race) from the API.
 */
export interface Session {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_end: string; // ISO 8601 timestamp
  date_start: string; // ISO 8601 timestamp
  gmt_offset: string; // e.g., "02:00:00"
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string; // e.g., "Practice 1", "Qualifying", "Race", "Sprint"
  session_type: string; // e.g., "Practice", "Qualifying", "Race"
  year: number;
}

/**
 * Type alias for query parameters for the sessions endpoint.
 */
export interface SessionsParams extends BaseParams {
  year?: number;
  country_name?: string;
  country_code?: string;
  circuit_key?: number;
  circuit_short_name?: string;
  location?: string;
  session_name?: string;
  session_type?: string;
  // Note: date_start/date_end filtering uses operators like date_start>=...
}

// --- Stints ---

/**
 * Represents the structure of a single stint entry from the API.
 */
export interface Stint {
  compound: string; // e.g., "SOFT", "MEDIUM", "HARD"
  driver_number: number;
  lap_end: number;
  lap_start: number;
  meeting_key: number;
  session_key: number;
  stint_number: number;
  tyre_age_at_start: number; // Laps
}

/**
 * Type alias for query parameters for the stints endpoint.
 */
export interface StintsParams extends BaseParams {
  compound?: string;
  lap_start?: number;
  lap_end?: number;
  stint_number?: number;
  tyre_age_at_start?: number; // Can be used with operators like tyre_age_at_start>=...
}

// --- Team Radio ---

/**
 * Represents the structure of a single team radio recording entry from the API.
 */
export interface TeamRadio {
  date: string; // ISO 8601-like timestamp (precision might vary)
  driver_number: number;
  meeting_key: number;
  recording_url: string; // URL to the MP3 file
  session_key: number;
}

/**
 * Type alias for query parameters for the team_radio endpoint.
 */
export interface TeamRadioParams extends BaseParams {
  date?: string; // Can be used with operators like date>=...
}

// --- Weather ---

/**
 * Represents the structure of a single weather entry from the API.
 */
export interface Weather {
  air_temperature: number; // Celsius
  date: string; // ISO 8601 timestamp
  humidity: number; // Percentage
  meeting_key: number;
  pressure: number; // mbar
  rainfall: number; // Boolean (0 or 1 in data)
  session_key: number;
  track_temperature: number; // Celsius
  wind_direction: number; // Degrees (0-359)
  wind_speed: number; // m/s
}

/**
 * Type alias for query parameters for the weather endpoint.
 */
export interface WeatherParams extends BaseParams {
  air_temperature?: number;
  humidity?: number;
  pressure?: number;
  rainfall?: number;
  track_temperature?: number;
  wind_direction?: number;
  wind_speed?: number;
  date?: string; // Can be used with operators like date>=...
}

// We will add specific types for other endpoints below
