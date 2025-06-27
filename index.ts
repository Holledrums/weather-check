import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { weatherMapper } from "./mapper/weather.mapper";
import {
  GeocodeInterface,
  GeocodeResponseInterface,
} from "./interfaces/geocode.interface";
import { MyWeatherDto } from "./dtos/my-weather.dto";
import { WeatherDataResponse } from "./interfaces/weather-data-response.interface";

dotenv.config();

const API_BASE_URL = process.env.WEATHER_API_BASE_URL;

async function getWeather(city?: string): Promise<MyWeatherDto | undefined> {
  const targetCity = city || process.env.DEFAULT_CITY || "Berlin";
  const baseUrl = `${
    API_BASE_URL ? API_BASE_URL : "https://api.open-meteo.com/v1/"
  }`;

  const geocode = await fetchGeocodingApi(targetCity);

  const { latitude, longitude } = geocode;

  const params = {
    latitude,
    longitude,
    current_weather: true,
  };

  try {
    const forecastResponse: AxiosResponse<WeatherDataResponse> =
      await axios.get(`${baseUrl}/forecast`, {
        params,
      });

    return weatherMapper(forecastResponse.data, geocode);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function fetchGeocodingApi(city: string): Promise<GeocodeInterface> {
  try {
    const response = await axios.get<GeocodeResponseInterface>(
      `https://geocoding-api.open-meteo.com/v1/search`,
      { params: { name: city, countryCode: "DE", count: 1 } }
    );

    const geocode = response.data.results.find(
      (g) => g.name.toLowerCase() === city.toLowerCase()
    );

    if (!geocode) {
      throw new Error(`Kein Geocode für "${city}" gefunden.`);
    }

    return geocode;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fehler bei der Geocoding-Abfrage: ${error.message}`);
    } else {
      throw new Error(`Fehler bei der Geocoding-Abfrage: ${String(error)}`);
    }
  }
}

getWeather(process.argv[2])
  .then((weather) => {
    console.log(weather);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
