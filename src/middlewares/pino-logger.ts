import { pinoLogger as logger, type Env } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

import type { MiddlewareHandler } from "hono/types";
import type { AppBindings } from "@/lib/types";
import type { Context } from "hono";

export function pinoLogger() {
  return ((c, next) =>
    logger({
      pino: pino(
        {
          level: c.env.LOG_LEVEL || "info",
        },
        c.env.NODE_ENV === "production" ? undefined : pretty()
      ),
      http: {
        reqId: () => crypto.randomUUID(),
      },
    })(c as unknown as Context<Env>, next)) satisfies MiddlewareHandler<AppBindings>;
}
