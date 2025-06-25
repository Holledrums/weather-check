"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWeatherDto = void 0;
class MyWeatherDto {
    constructor() {
        this.city = ""; // e.g., "Berlin"
        this.time = ""; // ISO 8601 format, e.g., "2023-10-01T12:00:00Z"
        this.temperature = ""; // e.g., 15.5 for 15.5°C
        this.windspeed = ""; // e.g., 10.2 for 10.2 km/h
        this.winddirection = ""; // e.g., 180 for south
        this.isDay = ""; // "1" for day, "0" for night
        this.weathercode = ""; // WMO code, e.g., "800" for clear sky
    }
}
exports.MyWeatherDto = MyWeatherDto;
