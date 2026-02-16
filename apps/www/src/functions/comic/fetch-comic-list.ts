import { sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * Get (hopefully) paginated comic list.
 */
export async function fetchComicListByPage(search: string, page: number, pageSize = 15) {
  "use cache";
  cacheTag("comic-list", search, page.toString(), pageSize.toString());
  cacheLife("days");

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
    .where(
      search !== ""
        ? sql`(
      setweight(to_tsvector('simple', ${comicSeries.title}), 'A') ||
      setweight(to_tsvector('simple', ${comicSeries.author}), 'B') ||
      setweight(to_tsvector('simple', ${comicSeries.synopsis}), 'C') ||
      setweight(to_tsvector('simple', ${comicSeries.comicSeriesId}), 'D')
      @@ plainto_tsquery('simple', ${search})
    )`
        : sql`1 = 1`
    )
    .offset((page - 1) * pageSize)
    .limit(pageSize);

  return {
    message: results,
    canMoveNext: results.length === pageSize,
    next: results.length === pageSize ? page + 1 : null,
  };
}
