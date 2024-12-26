import { createRouter } from "@/lib/create-app";

import * as handlers from "./ideas.handlers";
import * as routes from "./ideas.routes";

const router = createRouter().openapi(
  routes.generateIdeas,
  handlers.generateIdeas
);

export default router;
