import { prisma } from "@arknights-vns/database/client";
import { selectAllComic } from "@arknights-vns/database/generated/sql/selectAllComic";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Get (hopefully) paginated comic list.
 */
export async function fetchComicListByPage(search: string, page = 1, pageSize = 15) {
  "use cache";
  cacheTag("comic-list", search, page.toString(), pageSize.toString());
  cacheLife("days");

  const results = await prisma.$queryRawTyped(selectAllComic(search, page, pageSize));

  return {
    message: results,
    canMoveNext: results.length === pageSize,
    next: results.length === pageSize ? page + 1 : null,
  };
}
