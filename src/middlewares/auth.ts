import { bearerAuth } from "hono/bearer-auth";
import type { Context, MiddlewareHandler, Next } from "hono";
import type { AppBindings } from "@/lib/types";

export function auth(): MiddlewareHandler<AppBindings> {
  return async (c: Context<AppBindings>, next: Next) => {
    const authHeader = c.req.header("Authorization") || "";
    const receivedToken = authHeader.replace("Bearer ", "");

    // Debug logging
    console.log("Expected token:", `-${c.env.CLIENT_API_KEY}-`);

    try {
      const isValid = receivedToken === c.env.CLIENT_API_KEY;
      if (!isValid) {
        return c.json(
          {
            message: "Authentication failed - token mismatch",
            details: "Please check your API key format and try again",
          },
          401,
          {
            "WWW-Authenticate": 'Bearer realm="Ideas API"',
          }
        );
      }
      await next();
    } catch (error) {
      console.error("Auth Error:", error);
      return c.json({ message: "Authentication failed" }, 401, {
        "WWW-Authenticate": 'Bearer realm="Ideas API"',
      });
    }
  };
}
