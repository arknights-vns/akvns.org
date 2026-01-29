import { z } from "zod";
import { comicChapter, comicContributor, comicSeries } from "@/db/schema/vns-schema";
import { createCoercedSelectSchema } from "@/schema/zod-coerced";

/**
 * A general data for comic assets.
 *
 * Most of the time is used in conjunction with `z.array()`
 */
export const ComicImage = z.object({
  name: z.string(),
  url: z.url(),
});

/**
 * Data for a comic contributor, extracted from `comic_contributor` table by `drizzle-zod`.
 */
export const ComicContributor = createCoercedSelectSchema(comicContributor);

/**
 * Data for a comic chapter, extracted from `comic_chapter` table by `drizzle-zod`.
 */
export const ComicChapter = createCoercedSelectSchema(comicChapter);

/**
 * Data for a comic series, extracted from `comic_series` table by `drizzle-zod`.
 */
export const ComicSeriesData = createCoercedSelectSchema(comicSeries);

/**
 * Complete comic data.
 */
export const CompleteComicData = ComicSeriesData.extend({
  chapters: z.array(ComicChapter),
  contributors: z.array(ComicContributor),
});
