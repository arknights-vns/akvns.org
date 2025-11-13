import { z } from "zod";

import { GalleryCollectionNameRegex } from "@/schema/gallery";

/**
 * Represent a comic translator section.
 */
export const ComicTranslator = z.object({
    members: z.array(z.string()),
    role: z.string(),
});

/**
 * Represent a comic chapter.
 */
export const ComicChapter = z.object({
    chapterName: z.string(),
    comicChapterId: z.string().regex(GalleryCollectionNameRegex),
});

/**
 * Minimal series metadata stored in DB.
 */
export const ComicSeriesMetadata = z.object({
    author: z.string().min(1, { message: "Author is required" }),
    category: z.string(),
    comicChapters: z.array(ComicChapter).default([]),
    comicSeriesId: z.string(),
    synopsis: z.string(),
    thumbnail: z.string(),
    title: z.string(),
    translators: z.array(ComicTranslator).default([]),
});
