import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
    BlobWriter,
    Uint8ArrayReader,
    ZipWriter,
} from "@zip.js/zip.js";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guard";
import { s3Client } from "@/lib/aws-s3";

/**
 * Download ZIP archive for this collection.
 */
export async function GET(
    _: NextRequest,
    parameters: RouteContext<"/api/gallery/[collection]/archive">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted" },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    try {
        const zipBlobWriter = new BlobWriter("application/zip");
        const zipWriter = new ZipWriter(zipBlobWriter);

        let continuationToken: string | undefined;

        do {
            const listResp = await s3Client.send(
                new ListObjectsV2Command({
                    Bucket: parameterList.collection,
                    ContinuationToken: continuationToken,
                }),
            );

            const objects = listResp.Contents ?? [];
            for (const object of objects) {
                if (!object.Key) continue;

                const { Body } = await s3Client.send(
                    new GetObjectCommand({ Bucket: parameterList.collection,
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

        return new NextResponse(
            zipBlob.stream(),
            {
                headers: {
                    "Content-Disposition": `attachment; filename="${parameterList.collection}.zip"`,
                    "Content-Length": zipBlob.size.toString(),
                    "Content-Type": "application/zip",
                },
                status: 200,
            },
        );
    }
    catch {
        return NextResponse.json(
            { error: `Unable to create zip for ${parameterList.collection}` },
            { status: 500 },
        );
    }
}
