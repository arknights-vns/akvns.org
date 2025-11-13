import { z } from "zod";

export const GalleryCollectionNameRegex = /([a-z0-9-]+)/;

/**
 * Represent an asset.
 */
export const GalleryAsset = z.object({
    name: z.string(),
    url: z.string(),
});

/**
 * A gallery collection.
 */
export const Gallery = z.object({
    name: z.string({
        error: "Name must not be empty",
    }).regex(GalleryCollectionNameRegex, {
        error: "Name must be alphanumeric, lowercase, separated by a -",
    }),
});

/**
 * Represent a list of assets.
 */
export const GalleryAssets = z.array(GalleryAsset);

/**
 * An array of collection.
 */
export const GalleryListing = z.object({
    message: z.array(z.string().regex(GalleryCollectionNameRegex)),
});
