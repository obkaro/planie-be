import * as HTTP_STATUS_CODES from "@/lib/http-status-codes";
import * as HTTP_STATUS_PHRASES from "@/lib/http-status-phrases";

import type { RouteHandler } from "@hono/zod-openapi";
import type { GenerateIdeasRoute } from "./ideas.routes";
import type { AppBindings } from "@/lib/types";
import { response as schema } from "@/schemas/generate-ideas";
import { z } from "zod";

import { generateObject, NoObjectGeneratedError } from "ai";
import { getProviders } from "@/lib/get-providers";

export const generateIdeas: RouteHandler<
  GenerateIdeasRoute,
  AppBindings
> = async (c) => {
  console.log("generateIdeas");
  const prompt =
    `Generate ideas for a trip with the following details:` +
    `${JSON.stringify(c.req.valid("json"))}`;

  let ideas: z.infer<typeof schema>;

  try {
    ({ object: ideas } = await generateObject({
      model: getProviders(c.env).openaiProvider,
      schema,
      system:
        "You are a savvy travel planner and agent with knowledge" +
        " of all the best places, experiences and things to do on a trip" +
        " however popular or rare they may be.",
      prompt,
    }));

    return c.json(ideas, HTTP_STATUS_CODES.OK);
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.log("NoObjectGeneratedError");
      console.log("Cause:", error.cause);
      console.log("Text:", error.text);
      console.log("Response:", error.response);
      console.log("Usage:", error.usage);
    }
    console.log(error);
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: "no_updates",
              path: [],
              message: "Unable to generate ideas",
            },
          ],
          name: "UnknownError",
        },
      },
      HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY
    );
  }
};
