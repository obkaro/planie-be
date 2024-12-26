import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import ideas from "@/routes/ideas/ideas.index";

const app = createApp();

const routes = [ideas] as const;

routes.forEach((route) => {
  app.route("/", route);
});

configureOpenAPI(app);

export type AppType = typeof routes[number];

export default app;
