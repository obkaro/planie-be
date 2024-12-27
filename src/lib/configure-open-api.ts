import type { AppOpenAPI } from "@/lib/types";
import { apiReference } from "@scalar/hono-api-reference";
import packageJson from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  const registry = app.openAPIRegistry;

  registry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Enter your API key without the 'Bearer' prefix",
  });

  app.doc("/openapi", {
    openapi: "3.0.0",
    info: {
      title: "Planie API Documentation",
      version: packageJson.version,
      description:
        "An intelligent travel planning assistant, powered by OpenAI",
    },
    // security: [
    //   {
    //     Bearer: [],
    //   },
    // ],
  });

  app.get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "undici",
      },
      spec: {
        url: "/openapi",
      },
    })
  );
}
