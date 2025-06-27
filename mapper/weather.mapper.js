"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherMapper = weatherMapper;
const weater_code_map_1 = require("../weather-map/weater-code-map");
function weatherMapper(forecast, geocode) {
    var _a, _b;
    const hourly = forecast.hourly;
    if (!hourly) {
        throw new Error("Fehlende hourly-Daten in der Forecast-Response");
    }
    const now = new Date();
    now.setMinutes(0, 0, 0); // Runde auf volle Stunde
    const hoursToInclude = 6;
    const forecastEntries = [];
    for (let i = 0; i < hourly.time.length; i++) {
        const timestamp = new Date(hourly.time[i]);
        if (timestamp >= now && forecastEntries.length < hoursToInclude) {
            forecastEntries.push({
                time: hourly.time[i],
                temperature: `${hourly.temperature_2m[i]} ${((_a = forecast.hourly_units) === null || _a === void 0 ? void 0 : _a.temperature_2m) || "°C"}`,
                windspeed: `${hourly.wind_speed_10m[i]} ${((_b = forecast.hourly_units) === null || _b === void 0 ? void 0 : _b.wind_speed_10m) || "km/h"}`,
                winddirection: getCardinalDirections(hourly.wind_direction_10m[i]),
                isDay: hourly.is_day[i],
                weatherDescription: weater_code_map_1.weatherCodeMap[hourly.weathercode[i]] || "Unbekannt",
                precipitation: decodePrecipitation(hourly.precipitation[i]),
            });
        }
    }
    return {
        city: geocode.name,
        forecast: forecastEntries,
    };
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
function decodePrecipitation(value) {
    if (value === 0)
        return "Kein Regen ☀️";
    if (value > 0 && value <= 0.2)
        return "Ein paar Tropfen 🌤️";
    if (value > 0.2 && value <= 1)
        return "Leichter Regen 🌦️";
    if (value > 1 && value <= 5)
        return "Regen 🌧️";
    if (value > 5 && value <= 10)
        return "Starker Regen 🌧️🌧️";
    return "Heftiger Regen ⛈️";
}
