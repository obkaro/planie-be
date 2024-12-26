import { z } from "@hono/zod-openapi";

export const params = z.object({
  title: z.string().openapi({ example: "Miami Beach" }),
  location: z
    .object({
      placeName: z.string().openapi({ example: "Miami Beach" }),
      streetAddress: z.string().openapi({ example: "123 Ocean Drive" }),
      city: z.string().openapi({ example: "Miami" }),
    })
    .openapi({
      example: {
        placeName: "Miami Beach",
        streetAddress: "123 Ocean Drive",
        city: "Miami",
      },
    }),
});

export const response = z.object({
  placeInfo: z
    .object({
      id: z.string(),
      name: z.string(),
      displayNameText: z.string(),
      types: z.array(z.string()),
      primaryType: z.string(),
      primaryTypeDisplayNameText: z.string(),
      formattedAddress: z.string(),
      shortFormattedAddress: z.string(),
      editorialSummaryText: z.string(),
      photos: z.array(
        z.object({
          // Assuming PlacePhoto has some properties, but since they're not shown
          // in the image, we'll leave it as a basic object for now
        })
      ),
      websiteUri: z.string(),
      googleMapsUri: z.string(),
      latLng: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
    .openapi({
      example: {
        id: "ChIJN1t_tGlXwokRAFUEcm_6qrc",
        name: "Miami Beach",
        displayNameText: "Miami Beach",
        types: ["tourist_attraction", "beach"],
        primaryType: "tourist_attraction",
        primaryTypeDisplayNameText: "Tourist Attraction",
        formattedAddress: "Miami Beach, FL 33139, United States",
        shortFormattedAddress: "Miami Beach, FL",
        editorialSummaryText:
          "Famous beach destination known for its Art Deco district",
        photos: [],
        websiteUri: "https://www.miamibeachfl.gov",
        googleMapsUri: "https://maps.google.com/?q=Miami+Beach",
        latLng: {
          lat: 25.7907,
          lng: -80.13,
        },
      },
    }),
});
