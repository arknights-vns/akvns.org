import { prisma } from "@arknights-vns/database/client";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Fetch comic series data.
 */
export async function fetchComicSeriesData(series: string) {
  "use cache";
  cacheTag("comic-data", series);
  cacheLife("days");

  // noinspection ES6RedundantAwait
  return await prisma.comicSeries.findFirst({
    include: {
      chapters: true,
      contributors: true,
    },
    where: {
      series_id: series,
    },
  });
}
