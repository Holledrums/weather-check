export interface GeocodeInterface {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin3: string;
  admin4: string;
}
export interface GeocodeResponseInterface {
  results: GeocodeInterface[];
  generationtime_ms: number;
  version: string;
  license: string;
  query: {
    name: string;
    country_code: string;
    count: number;
  };
}
