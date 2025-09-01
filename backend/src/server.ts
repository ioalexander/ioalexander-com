import "reflect-metadata";
import Fastify from "fastify";
import dataSource from "../db/dataSource";
import { formRoutes } from "./routes/form";
import { healthRoutes } from "./routes/health";

const app = Fastify({ logger: true, trustProxy: true });

dataSource.initialize().then(() => {
  const prefix = "/api";
  app.register(healthRoutes, { prefix });
  app.register(formRoutes, { prefix });

  app.listen({ port: 4000, host: "0.0.0.0" }, () =>
    console.log("Server running on http://localhost:4000"),
  );
});
