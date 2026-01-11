import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { comicChapter, comicSeries } from "@/db/schema/vns-schema";
import { s3Client } from "@/lib/aws-s3";
import { drizzleDb } from "@/lib/drizzle";
import { redisClient } from "@/lib/redis";
import { ComicImage } from "@/schema/comic";

const ITEMS_PER_PAGE = 15;

/**
 * Get comic series list, by page.
 *
 * @param page The page number, starting from 1.
 */
export const getComicSeriesListByPage = createServerFn()
  .inputValidator(z.object({ page: z.number().positive() }))
  .handler(async ({ data }) => {
    const { page } = data;

    const results = await drizzleDb
      .select()
      .from(comicSeries)
      .offset((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    if (results.length === 0) {
      throw new Error("No comic titles on this page.");
    }

    return {
      message: results,
      canMoveNext: results.length === ITEMS_PER_PAGE,
      next: results.length === ITEMS_PER_PAGE ? page + 1 : null,
    };
  });

/**
 * Get comic series info.
 */
export const getComicSeriesInfo = createServerFn()
  .inputValidator(z.object({ series: z.string().nonempty() }))
  .handler(async ({ data }) => {
    const { series } = data;

    const entry = await drizzleDb.query.comicSeries.findFirst({
      with: {
        chapters: true,
        contributors: true,
      },
      where: eq(comicSeries.comicSeriesId, series),
    });

    if (!entry) {
      throw new Error("Unable to fetch comic series information.");
    }

    return {
      message: entry,
    };
  });

/**
 * Get chapter info of comic series.
 */
export const getComicSeriesChapterInfo = createServerFn()
  .inputValidator(
    z.object({
      series: z.string().nonempty(),
      chapter: z.string().nonempty(),
    })
  )
  .handler(async ({ data }) => {
    const { series, chapter } = data;

    const records = await drizzleDb
      .select({
        name: comicChapter.chapterName,
      })
      .from(comicChapter)
      .where(and(eq(comicChapter.comicSeriesId, series), eq(comicChapter.comicChapterId, chapter)))
      .limit(1);

    if (records.length === 0) {
      throw new Error("No chapter available.");
    }

    return {
      message: records[0],
    };
  });

/**
 * Get images of comic series, by chapter.
 */
export const getComicSeriesChapterImages = createServerFn()
  .inputValidator(
    z.object({
      series: z.string().nonempty(),
      chapter: z.string().nonempty(),
    })
  )
  .handler(async ({ data }) => {
    const { series, chapter } = data;
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

    await redisClient.set(REDIS_KEY, JSON.stringify(images), "EX", 7 * 24 * 60 * 60);

    return {
      message: images,
    };
  });

/**
 * Get available chapters.
 */
export const getComicChapterList = createServerFn()
  .inputValidator(z.object({ series: z.string().nonempty() }))
  .handler(async ({ data }) => {
    // const response = await getTreaty().comic({ series: data.series }).info.chapters.get();

    // if (response.error) {
    //     throw new Error("Failed to fetch comic chapter list");
    // }

    // return response.data;

    const { series } = data;

    const entries = await drizzleDb
      .select({
        name: comicChapter.chapterName,
        id: comicChapter.comicChapterId,
      })
      .from(comicChapter)
      .where(and(eq(comicChapter.comicSeriesId, series)))
      .orderBy(comicChapter.id);
    //           ^ this shit is auto-incremented, unless Postgres has something I don't know.
    //   Your truly, Đụt

    if (entries.length === 0) {
      throw new Error("No chapters.");
    }

    return {
      message: entries,
    };
  });
