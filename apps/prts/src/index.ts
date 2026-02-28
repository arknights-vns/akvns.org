import { node } from "@elysiajs/node";
import { Elysia } from "elysia";

new Elysia({ adapter: node() })
  .get("/", () => 'Yes, Arknights Vietnam Station is using Elysia.js for the API <(")')
  .get("/make-coffee", ({ status }) => {
    return status("I'm a teapot");
  })
  .headers({
    "X-VNS-API-Version": "1.0",
  })
  .listen(Number.parseInt(process.env.PORT ?? "8888", 10), ({ hostname, port }) => {
    // biome-ignore lint/suspicious/noConsole: :exu_stare:
    console.info(`🦊 Elysia is running at ${hostname}:${port}`);
  });
