import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import z from "zod";

import { comicSeries } from "@/db/schema";
import { s3Client } from "@/lib/aws-s3";
import { drizzleDb } from "@/lib/drizzle";
import { ComicSeriesData, CompleteComicData } from "@/schema/comic";

const ITEMS_PER_PAGE = 10;

const comicPlugin = new Elysia({ prefix: "/comic" })
    .get(
        "/",
        async ({ query }) => {
            const { page } = query;

            const results = await drizzleDb
                .select()
                .from(comicSeries)
                .offset((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);

            return {
                message: results,
                canMoveNext: results.length === ITEMS_PER_PAGE,
                next: page + 1,
            };
        },
        {
            query: z.object({
                page: z.coerce.number().positive().default(1),
            }),
            response: z.object({
                message: z.array(ComicSeriesData),
                canMoveNext: z.boolean(),
                next: z.number().positive(),
            }),
        },
    )
    .get(
        "/:series",
        async ({ params, status }) => {
            const { series } = params;

            const entry = await drizzleDb.query.comicSeries.findFirst({
                with: {
                    chapters: true,
                    contributors: true,
                },
                where: eq(comicSeries.comicSeriesId, series),
            });

            if (!entry) {
                return status("Not Found", { error: "No entry" });
            }

            return {
                message: entry,
            };
        },
        {
            params: z.object({
                series: z.string(),
            }),
            response: {
                200: z.object({ message: CompleteComicData }),
                404: z.object({ error: z.string() }),
            },
        },
    )
    .get(
        "/:series/:chapter/images",
        async ({ params, status }) => {
            const { series, chapter } = params;

            const resp = await s3Client.list(
                {
                    prefix: `${series}/${chapter}`,
                },
                {
                    bucket: process.env.COMIC_ASSETS_AWS_BUCKET,
                },
            );

            const objects = resp.contents;

            if (!objects || !objects.filter((x) => x.size && x.size > 0)) {
                return status("Not Found", { error: "No images in record." });
            }

            return {
                message: objects
                    .filter((x) => x.size && x.size > 0)
                    .map((obj) => {
                        return {
                            name: obj.key,
                            url: `${process.env.COMIC_ASSETS_URL_PREFIX}/${obj.key}`,
                        };
                    }),
            };
        },
        {
            params: z.object({
                series: z.string(),
                chapter: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.array(
                        z.object({
                            name: z.string(),
                            url: z.url(),
                        }),
                    ),
                }),
                404: z.object({ error: z.string() }),
            },
            details: {
                summary: "Sign in the user",
                tags: ["comic"],
            },
        },
    );

export default comicPlugin;
