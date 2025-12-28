import { Elysia } from "elysia";

import comicPlugin from "@/app/api/[[...slugs]]/blog/plugin";
import blogPlugin from "@/app/api/[[...slugs]]/comic/plugin";
import { auth } from "@/lib/auth";

const app = new Elysia({ prefix: "/api" })
    .use(blogPlugin)
    .use(comicPlugin)
    .mount(auth.handler);

export const GET = app.fetch;
export const POST = app.fetch;

export type API = typeof app;
