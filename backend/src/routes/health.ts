import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/health",
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send("OK");
    },
  );
}
