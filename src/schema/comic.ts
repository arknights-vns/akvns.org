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
 * Represent an asset.
 */
export const ComicAsset = z.object({
    name: z.string(),
    url: z.string(),
});

/**
 * Represent a list of assets.
 */
export const ComicAssetList = z.array(ComicAsset);

/**
 * An array of collection.
 */
export const ComicCollectionListing = z.object({
    message: z.array(z.string().regex(ComicCollectionRegex)),
});
