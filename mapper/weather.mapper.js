"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherMapper = weatherMapper;
const my_weather_dto_1 = require("../dtos/my-weather.dto");
const weater_code_map_1 = require("../weather-map/weater-code-map");
function weatherMapper(forecast, geocode) {
    const currentWeather = forecast.current_weather;
    const currentUnits = forecast.current_weather_units;
    const myWeather = new my_weather_dto_1.MyWeatherDto();
    myWeather.city = geocode.name;
    myWeather.time = currentWeather.time;
    myWeather.isDay = currentWeather.is_day;
    myWeather.temperature = `${currentWeather.temperature} ${currentUnits.temperature}`;
    myWeather.winddirection = getCardinalDirections(currentWeather.winddirection);
    myWeather.windspeed = `${currentWeather.windspeed} ${currentUnits.windspeed}`;
    myWeather.weatherDescription =
        weater_code_map_1.weatherCodeMap[currentWeather.weathercode] || "Unbekannt";
    return myWeather;
}
function getCardinalDirections(degrees) {
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
