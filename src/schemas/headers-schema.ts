import { z } from "zod";

export const headersSchema = z.object({
  Authorization: z.string().openapi({
    description: "Bearer token for authentication",
    // example: "Bearer SECRET",
  }),
});
