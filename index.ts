import axios from "axios";

const API_KEY = process.env.WEATHER_API_KEY;
const API_BASE_URL = process.env.WEATHER_API_BASE_URL;
const DEFAULT_CITY = process.env.DEFAULT_CITY;

async function getWeather(city: string = DEFAULT_CITY) {
  if (!API_KEY || !API_BASE_URL) {
    console.error("API_KEY or API_BASE_URL is not set.");
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/search/?query=${city}`, {
      params: {
        query: "Leipzig",
        appid: API_KEY,
        units: "metric",
      },
    });
    console.log("Weather data:", response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

getWeather();
