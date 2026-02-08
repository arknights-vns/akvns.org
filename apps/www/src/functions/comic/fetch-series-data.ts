import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * Fetch comic series data.
 */
export async function fetchComicSeriesData(series: string) {
  "use cache";
  cacheTag("comic-data", series);
  cacheLife("days");

  // noinspection ES6RedundantAwait
  return await drizzleDb.query.comicSeries.findFirst({
    with: {
      chapters: true,
      contributors: true,
    },
    where: eq(comicSeries.comicSeriesId, series),
  });
}
