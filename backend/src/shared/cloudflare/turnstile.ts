import axios from "axios";
import { envs } from "../envs";
import { FastifyReply, FastifyRequest } from "fastify";

export const validateTurnstile = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<boolean> => {
  const token = (request.body as any).turnstile;

  if (!token) {
    request.log.warn("Captcha token missing from request body");
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
    request.log.error("TURNSTILE_SECRET_KEY not set in environment variables");
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
      reply.code(403).send({ message: "Captcha failed. Data was not success" });
      reply.code(403).send({ message: "Captcha failed" });
      return false;
    }

    return true;
  } catch (err) {
    request.log.error({ err }, "Error during captcha validation request");
    reply.code(403).send({ message: "Captcha failed" });
    return false;
  }
};
