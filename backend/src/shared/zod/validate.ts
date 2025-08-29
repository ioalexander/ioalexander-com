import { FastifyRequest, FastifyReply } from "fastify";
import { ZodSchema } from "zod";

export function validateBody<T>(
  schema: ZodSchema<T>,
  request: FastifyRequest,
  reply: FastifyReply,
): T | null {
  const result = schema.safeParse(request.body);
  if (!result.success) {
    reply
      .code(400)
      .send({
        message: "bad request",
        data: null,
        issues: result.error.issues,
      });
    return null;
  }
  return result.data;
}
