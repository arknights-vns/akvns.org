import { z } from "zod";

import { ComicCategory } from "@/generated/prisma/enums";
import { GalleryCollectionNameRegex } from "@/schema/gallery";

/**
 * Represent a comic contributor.
 */
export const ComicContributor = z.object({
    members: z.array(z.string()),
    role: z.string(),
});

/**
 * Represent a comic chapter.
 */
export const ComicChapter = z.object({
    chapterName: z.string(),
    comicSeriesId: z.string(),
    comicChapterId: z.string().regex(GalleryCollectionNameRegex),
});

/**
 * Minimal series metadata stored in DB.
 *
 * Use when querying a list of titles.
 */
export const ComicSeriesMetadata = z.object({
    category: z.enum(ComicCategory),
    comicSeriesId: z.string(),
    likeCount: z.int(),
    thumbnail: z.string(),
    title: z.string(),
    updatedAt: z.iso.datetime(),
    viewCount: z.int(),
});

/**
 * Complete title data.
 */
export const ComicSeriesData = ComicSeriesMetadata.extend({
    author: z.string().min(1, { message: "Author is required" }),
    chapters: z.array(ComicChapter).default([]),
    createdAt: z.iso.datetime(),
    contributors: z.array(ComicContributor).default([]),
    synopsis: z.string(),
});
