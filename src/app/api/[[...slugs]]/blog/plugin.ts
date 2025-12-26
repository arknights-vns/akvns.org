import { and, gte, lte } from "drizzle-orm";
import { Elysia } from "elysia";
import { CacheControl, cacheControl } from "elysiajs-cdn-cache";
import z from "zod";

import { blog } from "@/db/schema";
import { drizzleDb } from "@/lib/drizzle";
import { BlogSchema } from "@/schema/blog";

const ITEMS_PER_PAGE = 10;

const blogPlugin = new Elysia({ prefix: "/blog" }).use(cacheControl()).get(
    "/",
    async ({ query, cacheControl }) => {
        const { page } = query;

        const records = await drizzleDb
            .select()
            .from(blog)
            .where(
                and(
                    gte(blog.id, (page - 1) * ITEMS_PER_PAGE),
                    lte(blog.id, page * ITEMS_PER_PAGE),
                ),
            );

        cacheControl.set(
            "Cache-Control",
            new CacheControl()
                .set("public", true)
                .set("max-age", 24 * 60 * 60)
                .set("s-maxage", 2 * 24 * 60 * 60),
        );

        return {
            message: records,
            canMoveNext: records.length === ITEMS_PER_PAGE,
            next: records.length === ITEMS_PER_PAGE ? page + 1 : null,
        };
    },
    {
        query: z.object({
            page: z.coerce.number().positive().default(1),
        }),
        response: z.object({
            message: z.array(BlogSchema),
            canMoveNext: z.boolean(),
            next: z.number().positive().nullable(),
        }),
    },
);

export default blogPlugin;
