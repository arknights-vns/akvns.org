import { z } from "zod";

export const ComicCollectionRegex = /([a-z0-9-]+)/;

/**
 * A comic collection.
 */
export const ComicCollection = z.object({
    name: z.string({
        error: "Name must not be empty",
    }).regex(ComicCollectionRegex, {
        error: "Name must be alphanumeric, lowercase, separated by a -",
    }),
});

/**
 * An array of collection.
 */
export const ComicCollectionListing = z.object({
    message: z.array(z.string().regex(ComicCollectionRegex)),
});
