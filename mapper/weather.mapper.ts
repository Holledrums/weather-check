import { MyWeatherDto } from "../dtos/my-weather.dto";
import { GeocodeInterface } from "../interfaces/geocode.interface";
import { WeatherDataResponse } from "../interfaces/weather-data-respomse.interface";
import { weatherCodeMap } from "../weather-map/weater-code-map";

export function weatherMapper(
  forecast: WeatherDataResponse,
  geocode: GeocodeInterface
): MyWeatherDto {
  const currentWeather = forecast.current_weather;
  const currentUnits = forecast.current_weather_units;

  const myWeather = new MyWeatherDto();

  myWeather.city = geocode.name;
  myWeather.time = currentWeather.time;
  myWeather.isDay = currentWeather.is_day;
  myWeather.temperature = `${currentWeather.temperature} ${currentUnits.temperature}`;
  myWeather.winddirection = getCardinalDirections(currentWeather.winddirection);
  myWeather.windspeed = `${currentWeather.windspeed} ${currentUnits.windspeed}`;
  myWeather.weatherDescription =
    weatherCodeMap[currentWeather.weathercode] || "Unbekannt";

  return myWeather;
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
