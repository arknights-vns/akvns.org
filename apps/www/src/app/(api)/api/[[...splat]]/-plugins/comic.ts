import { Elysia } from "elysia";
import { CacheControl, cacheControl } from "elysiajs-cdn-cache";
import { z } from "zod";
import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";
import { ComicSeriesData } from "@/zod/comic";

const ITEMS_PER_PAGE = 15;

export const elysiaComic = new Elysia({ prefix: "/comic" }).use(cacheControl()).get(
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
);
