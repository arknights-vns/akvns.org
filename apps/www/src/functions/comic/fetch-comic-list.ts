"use server";
// ^ for some reason redis & postgres keeps being leaked in client bundle.
//   so that is just "copium at home"

import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

export async function fetchComicListByPage(page: number) {
  const ITEMS_PER_PAGE = 15;

  const results = await drizzleDb
    .select({
      comicSeriesId: comicSeries.comicSeriesId,
      title: comicSeries.title,
      author: comicSeries.author,
      thumbnail: comicSeries.thumbnail,
      category: comicSeries.category,
    })
    .from(comicSeries)
    .offset((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  return {
    message: results,
    canMoveNext: results.length === ITEMS_PER_PAGE,
    next: results.length === ITEMS_PER_PAGE ? page + 1 : 0,
  };
}
