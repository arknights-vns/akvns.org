"use server";

import { gt } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * Get (hopefully) paginated comic list.
 */
export async function fetchComicListByPage(lastSeen: number) {
  "use cache";
  cacheTag("comic-list", lastSeen.toString());
  cacheLife("days");

  const ITEMS_PER_PAGE = 15;

  const results = await drizzleDb
    .select({
      id: comicSeries.id,
      comicSeriesId: comicSeries.comicSeriesId,
      title: comicSeries.title,
      author: comicSeries.author,
      thumbnail: comicSeries.thumbnail,
      category: comicSeries.category,
    })
    .from(comicSeries)
    .where(gt(comicSeries.id, lastSeen))
    .limit(ITEMS_PER_PAGE);

  return {
    message: results,
    canMoveNext: results.length === ITEMS_PER_PAGE,
    next: results.length === ITEMS_PER_PAGE ? results.at(-1)?.id : -1,
  };
}
