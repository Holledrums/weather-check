export interface CurrentWeatherUnits {
  time: string; // ISO 8601 format
  interval: string; // in seconds
  temperature: string; // in °C
  windspeed: string; // in km/h
  winddirection: string; // in degrees
  is_day: string; // 1 for day, 0 for night
  weathercode: string; // WMO code
}

export interface CurrentWeather {
  time: string; // ISO 8601 format
  interval: number; // in seconds
  temperature: number; // in °C
  windspeed: number; // in km/h
  winddirection: number; // in degrees
  is_day: number; // 1 for day, 0 for night
  weathercode: number; // WMO code
}

export interface WeatherDataResponse {
  latitude: number; // e.g., 52.5200 for Berlin
  longitude: number; // e.g., 13.4050 for Berlin
  generationtime_ms: number; // e.g., 100.123
  utc_offset_seconds: number; // e.g., 3600 for UTC+1
  timezone: string; // e.g., "Europe/Berlin"
  timezone_abbreviation: string; // e.g., "GMT"
  elevation: number; // elevation in meters
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
}
