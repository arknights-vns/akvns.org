import {
    DeleteObjectsCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    paginateListObjectsV2,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import express, { Request, Response } from "express";
import multer from "multer";

import { s3Client } from "@/lib/aws-s3";
import { RequireAdmin } from "@/server/middleware/require-admin";

const comicAssetRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Get images list of collection.
 *
 * @pathParams ComicCollectionRegex
 * @response ComicAssetList
 * @openapi
 */
comicAssetRouter.get("/comic/:collection/image", async (
    request: Request,
    response: Response,
) => {
    const data = await s3Client.send(
        new ListObjectsV2Command({ Bucket: request.params.collection }),
    );

    const baseUrl = `/api/comic/${request.params.collection}/image`;

    const images
        = data.Contents?.map(object => ({
            name: object.Key,
            url: `${baseUrl}/${object.Key}`,
        }));

    if (!images || images.length === 0) {
        return response
            .status(400)
            .send({ error: "Cannot retrieve image list." });
    }

    return response
        .status(200)
        .send({ message: images })
        .setHeader("Cache-Control", "public, max-age=1800, s-maxage=3600");
});

/**
 * Add images to the collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @body multipart/form-data
 * @openapi
 */
comicAssetRouter.put("/comic/:collection/image", RequireAdmin, upload.array("files"), async (
    request: Request,
    response: Response,
) => {
    // fuck type safety
    const files = request.files as unknown as Express.Multer.File[];

    if (!files || files.length === 0) {
        return response
            .status(400)
            .send({ error: "No files." });
    }

    for (const file of files) {
        const fileBuffer = Buffer.from(file.buffer);

        try {
            await s3Client.send(
                new PutObjectCommand({
                    Body: fileBuffer,
                    Bucket: request.params.collection,
                    ContentType: file.mimetype,
                    Key: file.originalname,
                }),
            );
        }
        catch {
            return response
                .status(500)
                .send({
                    error: "Unable to upload all files.",
                });
        }
    }

    return response
        .status(201)
        .send({
            error: "Uploaded all files.",
        });
});

/**
 * Delete all images of collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @openapi
 */
comicAssetRouter.delete("/comic/:collection/image", RequireAdmin, async (
    request: Request,
    response: Response,
) => {
    try {
        const paginator = paginateListObjectsV2(
            { client: s3Client },
            {
                Bucket: request.params.collection,
            },
        );

        const objectKeys = [];

        for await (const { Contents } of paginator) {
            if (!Contents) continue;
            objectKeys.push(...Contents.map(object => ({ Key: object.Key })));
        }

        const deleteCommand = new DeleteObjectsCommand({
            Bucket: request.params.collection,
            Delete: { Objects: objectKeys },
        });

        await s3Client.send(deleteCommand);
    }
    catch {
        return response.status(500).send({
            error: "Unable to delete images.",
        });
    }

    return response.status(200).send({
        message: "Success",
    });
});

/**
 * Get specific image from a collection.
 *
 * @pathParams ComicCollectionRegex
 * @response ComicAssetList
 * @openapi
 */
comicAssetRouter.get("/comic/:collection/image/:source", async (
    request: Request,
    response: Response,
) => {
    const { Body, ContentDisposition, ContentLength, ContentType } = await s3Client.send(new GetObjectCommand({
        Bucket: request.params.collection,
        Key: request.params.source,
    }));

    if (!Body || !ContentLength || !ContentType || !ContentDisposition) {
        return response
            .status(400)
            .send({ error: "Image might not exist." });
    }

    const stream = Body as unknown as ReadableStream;

    return response
        .status(200)
        .send(stream)
        .setHeader("Cache-Control", "public, max-age=3600, immutable")
        .setHeader("Content-Length", ContentLength)
        .setHeader("Content-Type", ContentType)
        .setHeader("Content-Disposition", ContentDisposition);
});

export { comicAssetRouter };
