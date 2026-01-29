import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { CacheControl, cacheControl } from "elysiajs-cdn-cache";
import { z } from "zod";

import { comicSeries } from "@/db/schema/vns-schema";
import { s3Client } from "@/lib/aws-s3";
import { drizzleDb } from "@/lib/drizzle";
import { redisClient } from "@/lib/redis";
import { ComicImage, ComicSeriesData, CompleteComicData } from "@/schema/comic";

const ITEMS_PER_PAGE = 15;

export const elysiaComic = new Elysia({ prefix: "/comic" })
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
          .set("s-maxage", 2 * 24 * 60 * 60)
      );

      return {
        message: results,
        canMoveNext: results.length === ITEMS_PER_PAGE,
        next: results.length === ITEMS_PER_PAGE ? page + 1 : 0,
      };
    },
    {
      query: z.object({
        page: z.coerce.number().positive().default(1),
      }),
      response: z.object({
        message: z.array(ComicSeriesData),
        canMoveNext: z.boolean(),
        next: z.number(),
      }),
    }
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
        return status("Not Found", { error: "No comic entry." });
      }

      cacheControl.set(
        "Cache-Control",
        new CacheControl()
          .set("public", true)
          .set("max-age", 24 * 60 * 60)
          .set("s-maxage", 2 * 24 * 60 * 60)
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
    }
  )
  .get(
    "/:series/images/:chapter",
    async ({ params, status }) => {
      const { series, chapter } = params;
      const REDIS_KEY = `comic-assets:${series}:${chapter}`;

      let images: { name: string; url: string }[] = [];

      if (await redisClient.exists(REDIS_KEY)) {
        // biome-ignore lint/style/noNonNullAssertion: validated for key existence.
        const redisCached = (await redisClient.get(REDIS_KEY))!;

        images = await z.array(ComicImage).parseAsync(JSON.parse(redisCached));
      } else {
        const resp = await s3Client.send(
          new ListObjectsV2Command({
            Prefix: `${series}/${chapter}`,
            Bucket: process.env.COMIC_ASSETS_AWS_BUCKET,
          })
        );

        const objects = resp.Contents;

        if (!objects?.filter((x) => x.Size && x.Size > 0)) {
          throw new Error("No images on record!");
        }

        images = objects
          .filter((x) => x.Size && x.Size > 0)
          .map((obj) => {
            return {
              // biome-ignore lint/style/noNonNullAssertion: There is.
              name: obj.Key!,
              url: `${process.env.COMIC_ASSETS_URL_PREFIX}/${obj.Key}`,
            };
          });
      }

      if (images.length === 0) {
        return status("Not Found", { error: "No comic chapter image entry." });
      }

      await redisClient.set(REDIS_KEY, JSON.stringify(images), "EX", 7 * 24 * 60 * 60);

      return {
        message: images,
      };
    },
    {
      params: z.object({
        series: z.string(),
        chapter: z.string(),
      }),
    }
  );
