import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FormSubmissionContactRepository } from "../repositories/form-submission-contact.repository";
import dataSource from "../../db/dataSource";
import { z } from "zod";
import * as geoip from "geoip-lite";
import { validateTurnstile } from "../shared/cloudflare/turnstile";
import { validateBody } from "../shared/zod/validate";
import { sendTelegramNotification } from "../shared/telegram/notification";

const formSubmitContactSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be at most 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be at most 50 characters" }),
  email: z
    .email({ message: "Invalid email address" })
    .max(1000, { message: "Email must be at most 1000 characters" }),
  phone: z
    .string()
    .max(100, { message: "Phone must be at most 100 characters" })
    .optional(),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(10000, { message: "Message must be at most 10000 characters" }),
});

type FormSubmitContactDto = z.infer<typeof formSubmitContactSchema>;

export async function formRoutes(fastify: FastifyInstance) {
  const repository = new FormSubmissionContactRepository(dataSource);

  fastify.post(
    "/form/submit/contact",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = validateBody(formSubmitContactSchema, request, reply);

      if (!body) {
        return;
      }

      const isTurnstileValid = await validateTurnstile(request, reply);
      if (!isTurnstileValid) {
        return;
      }

      try {
        const userAgent = request.headers["user-agent"] || "";

        const geo = geoip.lookup(request.ip);

        const submission = await repository.create({
          answerFirstName: body.firstName,
          answerLastName: body.lastName,
          answerEmail: body.email,
          answerPhone: body.phone,
          answerMessage: body.message,
          userAgent,
          country: geo?.country,
          city: geo?.city,
        });

        reply.code(201).send({ id: submission.id });

        sendTelegramNotification(`
*New form submission!*

*First Name:* ${body.firstName}
*Last Name:* ${body.lastName}
*Email:* ${body.email}
*Phone:* ${body.phone}
*User Agent:* ${userAgent}
*Country:* ${geo?.country || "N/A"}
*City:* ${geo?.city || "N/A"}
*Message:* \n \n ${body.message}
        `);
      } catch (err) {
        fastify.log.error({ err }, "Failed to submit contact form");
        sendTelegramNotification(
          `Failed to submit contact form. Error:\n\`\`\`\n${JSON.stringify(err)}\n\`\`\``,
        );
        reply.code(500).send({ message: "Failed to submit form" });
      }
    },
  );
}
