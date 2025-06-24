import axios from "axios";
import dotenv from "dotenv";
import { fetchWeatherApi } from "openmeteo";
import {
  GeocodeInterface,
  GeocodeResponseInterface,
} from "./dtos/geocode.interface";

dotenv.config();

const API_BASE_URL = process.env.WEATHER_API_BASE_URL;

async function getWeather(city?: string) {
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
    const response = await fetchWeatherApi(`${baseUrl}/forecast`, params);

    console.log("Weather data:", response);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function fetchGeocodingApi(city: string): Promise<GeocodeInterface> {
  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&countryCode=DE&count=1`
  );

  const data: GeocodeResponseInterface = response.data;

  const geocode = data.results.find(
    (geocode: GeocodeInterface) =>
      geocode.name.toLowerCase() === city.toLowerCase()
  );

  if (!geocode) {
    throw new Error(`Geocode not found for city: ${city}`);
  }

  return geocode;
}

getWeather();
