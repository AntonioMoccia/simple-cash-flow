import { Client } from "@googlemaps/google-maps-services-js";

export class GoogleService {
  googleMapsClient: Client;
  constructor() {
    this.googleMapsClient = new Client({});
  }

  async getSuggestions(input: string, language: string = "it") {
    const suggestions = await this.googleMapsClient.placeAutocomplete({
      params: {
        input: input,
        key: process.env.GOOGLE_MAPS_API_KEY!,
        language,
      },
    });
        console.log(suggestions)
    return suggestions.data.predictions;
  }

  async getCoords(place_id: string) {
    const response = await this.googleMapsClient.geocode({
      params: {
        place_id,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    });

    console.log(JSON.stringify(response.data))

    const coords = response.data.results[0].geometry.location;
    const coords_last = response.data;

    return {
      lat: coords.lat,
      lng: coords.lng,
      coords_last
    };
  }
}
