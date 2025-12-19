import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { comicChapter, comicContributor, comicSeries } from "@/db/schema";

/**
 * Data for a comic contributor, extracted from `comic_contributor` table by `drizzle-zod`.
 */
export const ComicContributor = createSelectSchema(comicContributor);

/**
 * Data for a comic chapter, extracted from `comic_chapter` table by `drizzle-zod`.
 */
export const ComicChapter = createSelectSchema(comicChapter);

/**
 * Data for a comic series, extracted from `comic_series` table by `drizzle-zod`.
 */
export const ComicSeriesData = createSelectSchema(comicSeries);

/**
 * Complete comic data.
 */
export const CompleteComicData = ComicSeriesData.extend({
    chapters: z.array(ComicChapter),
    contributors: z.array(ComicContributor),
});
