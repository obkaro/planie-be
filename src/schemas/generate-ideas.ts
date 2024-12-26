import { z } from "@hono/zod-openapi";

export const params = z.object({
  trip: z.object({
    title: z.string().openapi({ example: "Summer Vacation" }),
    location: z
      .object({
        city: z.string().openapi({ example: "Miami" }),
        state: z.string().openapi({ example: "FL" }),
        country: z.string().openapi({ example: "USA" }),
      })
      .openapi({
        example: {
          city: "Miami",
          state: "FL",
          country: "USA",
        },
      }),
    startDate: z
      .string()
      .date()
      .transform((str) => new Date(str))
      .openapi({ example: "2023-06-01" }),
    endDate: z
      .string()
      .date()
      .transform((str) => new Date(str))
      .openapi({ example: "2023-06-15" }),
    numberOfIdeas: z.number().default(10).openapi({ example: 10 }),
  }),
});

export const response = z.object({
  ideas: z
    .array(
      z.object({
        title: z.string().openapi({ example: "Visit the beach" }),
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
        date: z
          .string()
          .date()
          .transform((str) => new Date(str))
          .openapi({ example: "2023-06-02" }),
        recommendationRatingPercent: z.number().openapi({ example: 85 }),
        description: z.string().openapi({
          example:
            "A relaxing day at the beach with opportunities for sunbathing and swimming.",
        }),
      })
    )
    .openapi({
      example: [
        {
          title: "Visit the beach",
          location: {
            placeName: "Miami Beach",
            streetAddress: "123 Ocean Drive",
            city: "Miami",
          },
          date: "2023-06-02",
          recommendationRatingPercent: 85,
          description:
            "A relaxing day at the beach with opportunities for sunbathing and swimming.",
        },
      ],
    }),
});
