import openapi, { fromTypes } from "@elysiajs/openapi";
import serverTiming from "@elysiajs/server-timing";
import { Elysia } from "elysia";
import z from "zod";

import comicPlugin from "@/app/api/[[...slugs]]/blog/plugin";
import blogPlugin from "@/app/api/[[...slugs]]/comic/plugin";
import { auth } from "@/lib/auth";

const app = new Elysia({ prefix: "/api" })
    .use(
        openapi({
            references: fromTypes(),
            mapJsonSchema: {
                zod: z.toJSONSchema,
            },
            enabled: process.env.NODE_ENV === "development",
        }),
    )
    .use(
        serverTiming({
            enabled: process.env.NODE_ENV === "development",
        }),
    )
    .use(blogPlugin)
    .use(comicPlugin)
    .mount(auth.handler);

export const GET = app.fetch;
export const POST = app.fetch;

export type API = typeof app;
