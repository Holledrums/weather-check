import {
  HourlyForecastInterface,
  MyWeatherInterface,
} from "../interfaces/my-weather.interface";
import { GeocodeInterface } from "../interfaces/geocode.interface";
import { WeatherDataResponse } from "../interfaces/weather-data-response.interface";
import { weatherCodeMap } from "../weather-map/weater-code-map";

export function weatherMapper(
  forecast: WeatherDataResponse,
  geocode: GeocodeInterface
): MyWeatherInterface {
  const hourly = forecast.hourly;

  if (!hourly) {
    throw new Error("Fehlende hourly-Daten in der Forecast-Response");
  }

  const now = new Date();
  now.setMinutes(0, 0, 0); // Runde auf volle Stunde

  const hoursToInclude = 6;

  const forecastEntries: HourlyForecastInterface[] = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const timestamp = new Date(hourly.time[i]);

    if (timestamp >= now && forecastEntries.length < hoursToInclude) {
      forecastEntries.push({
        time: hourly.time[i],
        temperature: `${hourly.temperature_2m[i]} ${
          forecast.hourly_units?.temperature_2m || "°C"
        }`,
        windspeed: `${hourly.wind_speed_10m[i]} ${
          forecast.hourly_units?.wind_speed_10m || "km/h"
        }`,
        winddirection: getCardinalDirections(hourly.wind_direction_10m[i]),
        isDay: hourly.is_day[i],
        weatherDescription:
          weatherCodeMap[hourly.weathercode[i]] || "Unbekannt",
        precipitation: decodePrecipitation(hourly.precipitation[i]),
      });
    }
  }

  return {
    city: geocode.name,
    forecast: forecastEntries,
  };
}

function getCardinalDirections(degrees: number): string {
  const directions = [
    "N",
    "NNO",
    "NO",
    "ONO",
    "O",
    "OSO",
    "SO",
    "SSO",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % 16];
}
function decodePrecipitation(value: number): string {
  if (value === 0) return "Kein Regen ☀️";
  if (value > 0 && value <= 0.2) return "Ein paar Tropfen 🌤️";
  if (value > 0.2 && value <= 1) return "Leichter Regen 🌦️";
  if (value > 1 && value <= 5) return "Regen 🌧️";
  if (value > 5 && value <= 10) return "Starker Regen 🌧️🌧️";
  return "Heftiger Regen ⛈️";
}
