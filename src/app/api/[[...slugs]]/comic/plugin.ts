import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { and, eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { CacheControl, cacheControl } from "elysiajs-cdn-cache";
import z from "zod";

import { comicChapter, comicSeries } from "@/db/schema";
import { s3Client } from "@/lib/aws-s3";
import { drizzleDb } from "@/lib/drizzle";
import { redisClient } from "@/lib/redis";
import { ComicImage, ComicSeriesData, CompleteComicData } from "@/schema/comic";

const ITEMS_PER_PAGE = 10;

const comicPlugin = new Elysia({ prefix: "/comic" })
    .use(cacheControl())
    .get(
        "/",
        async ({ query, cacheControl }) => {
            const { page } = query;

            const results = await drizzleDb
                .select()
                .from(comicSeries)
                .offset((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);

            cacheControl.set(
                "Cache-Control",
                new CacheControl()
                    .set("public", true)
                    .set("max-age", 24 * 60 * 60)
                    .set("s-maxage", 2 * 24 * 60 * 60),
            );

            return {
                message: results,
                canMoveNext: results.length === ITEMS_PER_PAGE,
                next: results.length === ITEMS_PER_PAGE ? page + 1 : null,
            };
        },
        {
            query: z.object({
                page: z.coerce.number().positive().default(1),
            }),
            response: z.object({
                message: z.array(ComicSeriesData),
                canMoveNext: z.boolean(),
                next: z.number().positive().nullable(),
            }),
        },
    )
    .get(
        "/:series",
        async ({ params, status, cacheControl }) => {
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

            cacheControl.set(
                "Cache-Control",
                new CacheControl()
                    .set("public", true)
                    .set("max-age", 24 * 60 * 60)
                    .set("s-maxage", 2 * 24 * 60 * 60),
            );

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
        "/:series/info/:chapter/images",
        async ({ params, status, cacheControl }) => {
            const { series, chapter } = params;
            const REDIS_KEY = `comic-assets:${series}:${chapter}`;

            if (await redisClient.exists(REDIS_KEY)) {
                const value = await redisClient.get(REDIS_KEY);
                if (value) {
                    cacheControl.set(
                        "Cache-Control",
                        new CacheControl()
                            .set("public", true)
                            .set("max-age", 365 * 24 * 60 * 60)
                            .set("s-maxage", 2 * 365 * 24 * 60 * 60),
                    );

                    return {
                        message: await z
                            .array(ComicImage)
                            .parseAsync(JSON.parse(value)),
                    };
                }
            }

            const resp = await s3Client.send(
                new ListObjectsV2Command({
                    Prefix: `${series}/${chapter}`,
                    Bucket: process.env.COMIC_ASSETS_AWS_BUCKET,
                }),
            );

            const objects = resp.Contents;

            if (!objects || !objects.filter((x) => x.Size && x.Size > 0)) {
                return status("Not Found", { error: "No images in record." });
            }

            const filteredObjects = objects
                .filter((x) => x.Size && x.Size > 0)
                .map((obj) => {
                    return {
                        // biome-ignore lint/style/noNonNullAssertion: There is.
                        name: obj.Key!,
                        url: `${process.env.COMIC_ASSETS_URL_PREFIX}/${obj.Key}`,
                    };
                });

            await redisClient.set(
                REDIS_KEY,
                JSON.stringify(filteredObjects),
                "EX",
                7 * 24 * 60 * 60,
            );

            cacheControl.set(
                "Cache-Control",
                new CacheControl()
                    .set("public", true)
                    .set("max-age", 365 * 24 * 60 * 60)
                    .set("s-maxage", 2 * 365 * 24 * 60 * 60),
            );

            return {
                message: filteredObjects,
            };
        },
        {
            params: z.object({
                series: z.string(),
                chapter: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.array(ComicImage),
                }),
                404: z.object({ error: z.string() }),
            },
        },
    )
    .get(
        "/:series/info/:chapter",
        async ({ params, status, cacheControl }) => {
            const { series, chapter } = params;

            const data = await drizzleDb
                .select({
                    name: comicChapter.chapterName,
                    prev: comicChapter.prevChapterId,
                    next: comicChapter.nextChapterId,
                })
                .from(comicChapter)
                .where(
                    and(
                        eq(comicChapter.comicSeriesId, series),
                        eq(comicChapter.comicChapterId, chapter),
                    ),
                )
                .limit(1);

            if (data.length === 0) {
                return status("Not Found", {
                    error: "No entry",
                });
            }

            cacheControl.set(
                "Cache-Control",
                new CacheControl()
                    .set("public", true)
                    .set("max-age", 60 * 60)
                    .set("s-maxage", 24 * 60 * 60),
            );

            return {
                message: data[0],
            };
        },
        {
            params: z.object({
                series: z.string(),
                chapter: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.object({
                        name: z.string(),
                        prev: z.string().nullable(),
                        next: z.string().nullable(),
                    }),
                }),
                404: z.object({ error: z.string() }),
            },
        },
    );

export default comicPlugin;
