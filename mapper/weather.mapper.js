"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherMapper = weatherMapper;
const my_weather_dto_1 = require("../dtos/my-weather.dto");
function weatherMapper(forecast, geocode) {
    const myWeather = new my_weather_dto_1.MyWeatherDto();
    myWeather.city = geocode.country;
}
