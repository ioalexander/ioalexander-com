import Fastify from "fastify";
import { destroyApp, initializeApp } from "./test-utils";

describe("Form (e2e)", () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = await initializeApp();
  });

  afterAll(async () => {
    await destroyApp(app);
  });

  it("ok health", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/form/submit/contact",
      payload: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        message: "Hello world",
        turnstile: "sample token",
      },
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body).toHaveProperty("id");
  });

  it("returns 403 if captcha fails", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/form/submit/contact",
      payload: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        message: "Test message",
        turnstile: "",
      },
    });

    expect(res.statusCode).toBe(403);
    const body = JSON.parse(res.body);
    expect(body).toEqual({ message: "Captcha failed" });
  });

  it("returns 400 if required fields are missing", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/form/submit/contact",
      payload: {},
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body).toHaveProperty("issues");
  });
});
