import "reflect-metadata";
import { DataSource } from "typeorm";
import Fastify from "fastify";

const app = Fastify({ logger: true });

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db_data/data.db",
  synchronize: false,
  entities: [],
});

AppDataSource.initialize().then(() => {
  app.register(
    async (fastify) => {
      fastify.get("/health", async (req, reply) => {
        reply.send({ success: true });
      });
    },
    { prefix: "/api" },
  );

  app.listen({ port: 3000 }, () => console.log("Server running on 3000"));
});
