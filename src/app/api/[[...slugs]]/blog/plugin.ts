import { and, gte, lte } from "drizzle-orm";
import { Elysia } from "elysia";
import z from "zod";

import { blog } from "@/db/schema";
import { drizzleDb } from "@/lib/drizzle";
import { BlogSchema } from "@/schema/blog";

const ITEMS_PER_PAGE = 10;

const blogPlugin = new Elysia({ prefix: "/blog" }).get(
    "/",
    async ({ query }) => {
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

        return {
            message: records,
            canMoveNext: records.length === ITEMS_PER_PAGE,
            next: page + 1,
        };
    },
    {
        query: z.object({
            page: z.coerce.number().positive().default(1),
        }),
        response: z.object({
            message: z.array(BlogSchema),
            canMoveNext: z.boolean(),
            next: z.number().positive(),
        }),
    },
);

export default blogPlugin;
