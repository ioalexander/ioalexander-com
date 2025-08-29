import axios from "axios";
import { envs } from "../envs";
import { FastifyReply, FastifyRequest } from "fastify";

export const validateTurnstile = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<boolean> => {
  const token = (request.body as any).turnstile;

  if (!token) {
    reply.code(403).send({
      message: "Captcha failed",
    });
    return false;
  }

  if (envs.NODE_ENV === "development" || envs.IS_TESTING) {
    return true;
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey && envs.NODE_ENV !== "development") {
    reply.code(500).send({
      message: "TURNSTILE_SECRET_KEY not set in environment variables",
    });
    return false;
  }

  try {
    const response = await axios.get(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        params: {
          secret: secretKey,
          response: token,
          remoteip: request.ip,
        },
      },
    );

    if (!response.data.success) {
      reply.code(403).send({ message: "Captcha failed" });
      return false;
    }

    return true;
  } catch {
    reply.code(403).send({ message: "Captcha failed" });
  }
};
