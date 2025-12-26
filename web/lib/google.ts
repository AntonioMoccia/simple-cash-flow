import { Client } from "@googlemaps/google-maps-services-js";

const googleMapsClient = new Client({});

export const getSuggestions = async (input: string) => {
  const suggestions = await googleMapsClient.placeAutocomplete({
    params: {
      input: input,
      key: process.env.GOOGLE_MAPS_API_KEY!,
      language:'it'
    },
  });
  return suggestions.data.predictions
};
