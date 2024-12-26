import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import * as HTTP_STATUS_CODES from "@/lib/http-status-codes";
import createMessageObjectSchema from "@/lib/helpers/create-message-object";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HTTP_STATUS_CODES.OK]: {
        content: {
          "application/json": {
            schema: createMessageObjectSchema("Tasks API"),
          },
        },
        description: "Tasks API Index",
      },
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Tasks API",
      },
      HTTP_STATUS_CODES.OK
    );
  }
);

export default router;
