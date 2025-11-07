import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
    BlobWriter,
    Uint8ArrayReader,
    ZipWriter,
} from "@zip.js/zip.js";
import express, { Request, Response } from "express";

import { s3Client } from "@/lib/aws-s3";
import { RequireAdmin } from "@/server/middleware/require-admin";

const comicArchiveRouter = express.Router();

/**
 * Download ZIP archive for this collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @contentType application/zip
 * @openapi
 */
comicArchiveRouter.get("/comic/:collection/archive", RequireAdmin, async (
    request: Request,
    response: Response,
) => {
    const zipBlobWriter = new BlobWriter("application/zip");
    const zipWriter = new ZipWriter(zipBlobWriter);

    let continuationToken: string | undefined;

    do {
        const listResp = await s3Client.send(
            new ListObjectsV2Command({
                Bucket: request.params.collection,
                ContinuationToken: continuationToken,
            }),
        );

        const objects = listResp.Contents ?? [];
        for (const object of objects) {
            if (!object.Key) continue;

            const { Body } = await s3Client.send(
                new GetObjectCommand({ Bucket: request.params.collection,
                    Key: object.Key }),
            );

            if (!Body) continue;

            const arrayBuffer = await Body.transformToByteArray();

            await zipWriter.add(object.Key, new Uint8ArrayReader(arrayBuffer));
        }

        continuationToken = listResp.NextContinuationToken;
    } while (continuationToken);

    await zipWriter.close();
    const zipBlob = await zipBlobWriter.getData();

    return response
        .status(200)
        .send(zipBlob.stream())
        .setHeader("Content-Length", zipBlob.size)
        .setHeader("Content-Type", "application/zip")
        .setHeader("Content-Disposition", `attachment; filename="${request.params.collection}.zip"`);
});

export { comicArchiveRouter };
