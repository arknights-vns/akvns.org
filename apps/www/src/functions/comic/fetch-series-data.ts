import { prisma } from "@arknights-vns/database/client";
import * as Sentry from "@sentry/nextjs";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Fetch comic series data.
 */
export async function fetchComicSeriesData(series: string) {
  "use cache";
  cacheTag("comic-data", series);
  cacheLife("days");

  const result = Sentry.startSpan(
    {
      name: "Query Comic Data",
      op: "comic.series.query",
      attributes: {
        "comic.series.name": series,
      },
    },
    async () =>
      await prisma.comicSeries.findFirst({
        include: {
          chapters: true,
          contributors: true,
        },
        where: {
          series_id: series,
        },
      }),
  );

  return result;
}
