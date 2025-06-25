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
dotenv_1.default.config();
const API_BASE_URL = process.env.WEATHER_API_BASE_URL;
function getWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetCity = city || process.env.DEFAULT_CITY || "Berlin";
        const baseUrl = `${API_BASE_URL ? API_BASE_URL : "https://api.open-meteo.com/v1/"}`;
        const geocode = yield fetchGeocodingApi(targetCity);
        const { latitude, longitude } = geocode;
        const params = {
            latitude,
            longitude,
            current_weather: true,
        };
        try {
            const response = yield axios_1.default.get(`${baseUrl}/forecast`, { params });
            console.log("Weather data:", response.data);
            // return weatherMapper(response.data, geocode);
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
}
function fetchGeocodingApi(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&countryCode=DE&count=1`);
        const data = response.data;
        const geocode = data.results.find((geocode) => geocode.name.toLowerCase() === city.toLowerCase());
        if (!geocode) {
            throw new Error(`Geocode not found for city: ${city}`);
        }
        return geocode;
    });
}
getWeather();
