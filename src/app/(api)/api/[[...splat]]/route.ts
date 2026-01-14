import { node } from "@elysiajs/node";
import { Elysia } from "elysia";

import { elysiaComic } from "@/app/(api)/api/[[...splat]]/-plugins/comic";

export const elysia = new Elysia({ adapter: node(), prefix: "/api" })
  .get("/", () => 'Yes, Arknights Vietnam Station is using Elysia.js for the API <(")')
  .get("/make-tea", ({ status }) => {
    return status("I'm a teapot");
  })
  .use(elysiaComic)
  .headers({
    "X-VNS-API-Version": "1.0",
  });

export const GET = elysia.fetch;
export const POST = elysia.fetch;
export const HEAD = elysia.fetch;
export const PUT = elysia.fetch;
export const DELETE = elysia.fetch;
export const OPTIONS = elysia.fetch;

export type ElysiaAPI = typeof elysia;
