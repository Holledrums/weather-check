"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const weather_mapper_1 = require("./mapper/weather.mapper");
const console_1 = require("console");
dotenv_1.default.config();
const API_BASE_URL = process.env.WEATHER_API_BASE_URL;
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetCity = city || process.env.DEFAULT_CITY || "Berlin";
        const baseUrl = `${API_BASE_URL ? API_BASE_URL : "https://api.open-meteo.com/v1/"}`;
        const geocode = yield fetchGeocodingApi(targetCity);
        const { latitude, longitude } = geocode;
        const timeNow = new Date();
        const today = timeNow.toISOString().split("T")[0];
        const tomorrow = new Date(timeNow.getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
        const params = {
            latitude,
            longitude,
            hourly: [
                "temperature_2m",
                "precipitation",
                "wind_speed_10m",
                "wind_direction_10m",
                "is_day",
                "weathercode",
            ],
            start_date: today,
            end_date: tomorrow,
            timezone: "auto",
        };
        try {
            const forecastResponse = yield axios_1.default.get(`${baseUrl}/forecast`, {
                params,
            });
            (0, console_1.log)("Forecast Response:", forecastResponse.data);
            return (0, weather_mapper_1.weatherMapper)(forecastResponse.data, geocode);
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
}
function fetchGeocodingApi(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://geocoding-api.open-meteo.com/v1/search`, { params: { name: city, countryCode: "DE", count: 1 } });
            const geocode = response.data.results.find((g) => g.name.toLowerCase() === city.toLowerCase());
            if (!geocode) {
                throw new Error(`Kein Geocode für "${city}" gefunden.`);
            }
            return geocode;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Fehler bei der Geocoding-Abfrage: ${error.message}`);
            }
            else {
                throw new Error(`Fehler bei der Geocoding-Abfrage: ${String(error)}`);
            }
        }
    });
}
getWeather(process.argv[2])
    .then((weather) => {
    console.log(weather);
})
    .catch((error) => {
    console.error("Error:", error.message);
});
