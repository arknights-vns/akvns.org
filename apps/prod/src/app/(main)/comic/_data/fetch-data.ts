import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * The worst way to get the information.
 *
 * Stupid Elysia, works very shit when prefetching stuffs.
 */
export async function fetchComicSeriesData(series: string) {
  "use cache";
  cacheTag("comic", series);
  cacheLife("hours");

  const entry = await drizzleDb.query.comicSeries.findFirst({
    with: {
      chapters: true,
    },
    where: eq(comicSeries.comicSeriesId, series),
  });

  if (!entry) {
    throw new Error("No entry!");
  }

  return entry;
}
