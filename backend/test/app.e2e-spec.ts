import Fastify from "fastify";
import { destroyApp, initializeApp } from "./test-utils";

describe("App (e2e)", () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = await initializeApp();
  });

  afterAll(async () => {
    await destroyApp(app);
  });

  it("ok health", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/health",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("OK");
  });
});
