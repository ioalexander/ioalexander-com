import { healthRoutes } from "src/routes/health";
import dataSource from "../db/dataSource";
import Fastify from "fastify";
import { formRoutes } from "src/routes/form";

export const initializeApp = async (): Promise<ReturnType<typeof Fastify>> => {
  const app = Fastify({ logger: { level: "error" } });
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const prefix = "/api";
  await app.register(healthRoutes, { prefix });
  await app.register(formRoutes, { prefix });

  await app.ready();

  return app;
};

export const destroyApp = async (app: ReturnType<typeof Fastify>) => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
  await app.close();
};
