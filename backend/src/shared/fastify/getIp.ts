import { FastifyRequest } from "fastify";

export const getIp = (request: FastifyRequest): string => {
  return (
    request.headers["cf-connecting-ip"] ||
    request.headers["x-forwarded-for"] ||
    request.ip
  )?.toString();
};
