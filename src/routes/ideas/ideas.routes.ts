import { createRoute } from "@hono/zod-openapi";
import * as HTTP_STATUS_CODES from "@/lib/http-status-codes";
import { params, response } from "@/schemas/generate-ideas";
import createErrorSchema from "@/lib/helpers/create-error-schema";
import { headersSchema } from "@/schemas/headers-schema";
import { bearerAuth } from "hono/bearer-auth";
import { auth } from "@/middlewares/auth";

const tags = ["Ideas"];

export const generateIdeas = createRoute({
  tags,
  method: "post",
  path: "/generate",
  request: {
    headers: headersSchema,
    body: {
      content: {
        "application/json": {
          schema: params,
        },
      },
    },
  },
  middleware: [auth()] as const,
  responses: {
    [HTTP_STATUS_CODES.OK]: {
      content: {
        "application/json": {
          schema: response,
        },
      },
      description: "Generate ideas for a trip",
    },
    [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(params),
        },
      },
      description: "Invalid request",
    },
  },
});

export type GenerateIdeasRoute = typeof generateIdeas;
