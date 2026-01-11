import { node } from "@elysiajs/node";
import { createFileRoute } from "@tanstack/react-router";
import { Elysia } from "elysia";

const elysiaApi = new Elysia({ adapter: node(), prefix: "/api" }).get(
  "/",
  () => 'Yes, Arknights Vietnam Station is using Elysia.js for the API <(")'
);

const handle = ({ request }: { request: Request }) => elysiaApi.fetch(request);

export const Route = createFileRoute("/(vns)/api/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
    },
  },
});
