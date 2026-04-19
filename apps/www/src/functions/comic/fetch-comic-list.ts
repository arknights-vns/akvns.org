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

  const entries = await prisma.$queryRawTyped(selectAllComic(search, page, pageSize));

  return {
    message: entries,
    canMoveNext: entries.length === pageSize,
    // oxlint-disable-next-line unicorn/no-null
    next: entries.length === pageSize ? page + 1 : null,
  };
}
