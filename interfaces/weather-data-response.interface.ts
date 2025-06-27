export interface HourlyWeatherData {
  time: string[]; // ISO-Zeitstempel für jede Stunde
  temperature_2m: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[]; // in Grad
  is_day: number[]; // 1 für Tag, 0 für Nacht
  weathercode: number[]; // WMO-Code
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  precipitation: string;
  wind_speed_10m: string;
  wind_direction_10m: string; // in degrees
  is_day: string; // 1 für Tag, 0 für Nacht
  weathercode: string; // WMO code
}

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
  current_weather_units?: CurrentWeatherUnits;
  current_weather?: CurrentWeather;
  hourly_units?: HourlyUnits;
  hourly?: HourlyWeatherData;
}
