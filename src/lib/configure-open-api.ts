import type { AppOpenAPI } from "@/lib/types";
import { apiReference } from "@scalar/hono-api-reference";
import packageJson from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Planie API Documentation",
      version: packageJson.version,
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    })
  );
}
