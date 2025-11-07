import {
    CreateBucketCommand,
    DeleteBucketCommand,
    DeleteObjectsCommand,
    paginateListBuckets,
    paginateListObjectsV2,
} from "@aws-sdk/client-s3";
import express, { Request, Response } from "express";

import { s3Client } from "@/lib/aws-s3";
import { RequireAdmin } from "@/server/middleware/require-admin";

const comicCollectionRouter = express.Router();

/**
 * Get list of collections.
 * @auth bearer
 * @response ComicCollectionListing
 * @openapi
 */
comicCollectionRouter.get("/comic/:collection", RequireAdmin, async (
    _request: Request,
    response: Response,
) => {
    const paginator = paginateListBuckets({ client: s3Client }, {});
    const buckets: string[] = [];

    for await (const page of paginator) {
        if (!page.Buckets) continue;

        buckets.push(...page.Buckets.map(b => b.Name ?? ""));
    }

    return response
        .status(200)
        .send({
            message: buckets,
        });
});

/**
 * Delete collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @openapi
 */
comicCollectionRouter.delete("/comic/:collection", RequireAdmin, async (
    request: Request,
    response: Response,
) => {
    const { collection } = request.params;

    try {
        // AWS requires bucket must be empty.
        const paginator = paginateListObjectsV2({ client: s3Client }, { Bucket: collection });

        const objectKeys = [];

        for await (const { Contents } of paginator) {
            if (!Contents) continue;
            objectKeys.push(...Contents.map(object => ({ Key: object.Key })));
        }

        const deleteCommand = new DeleteObjectsCommand({
            Bucket: collection,
            Delete: { Objects: objectKeys },
        });

        await s3Client.send(deleteCommand);

        await s3Client.send(new DeleteBucketCommand({ Bucket: collection }));

        return response.status(200).json({ message: "OK" });
    }
    catch {
        return response.status(500).json({ message: "We're cooked" });
    }
});

/**
 * Create a collection.
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @openapi
 */
comicCollectionRouter.put("/comic/:collection", RequireAdmin, async (
    request: Request,
    response: Response,
) => {
    const { collection } = request.params; // Get the collection from the URL parameter

    try {
        await s3Client.send(new CreateBucketCommand({ Bucket: collection }));
    }
    catch {
        return response.status(500).json({ error: "We are cooked." });
    }

    return response.status(201).json({ message: `Bucket "${collection}" created.` });
});

export { comicCollectionRouter };
