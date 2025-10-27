import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

import { s3Client } from "@/lib/aws-s3";

/**
 * Get specific image from a collection.
 *
 * @pathParams ComicCollectionRegex
 * @response ComicAssetList
 * @openapi
 */
export async function GET(_: NextRequest, parameters: RouteContext<"/api/comic/[collection]/image/[source]">) {
    const parameterList = await parameters.params;

    const { Body, ContentType } = await s3Client.send(new GetObjectCommand({
        Bucket: parameterList.collection,
        Key: parameterList.source,
    }));

    const stream = Body as unknown as ReadableStream;

    return new NextResponse(stream, {
        headers: {
            "Cache-Control": "public, max-age=3600, immutable",
            "Content-Type": ContentType || "application/octet-stream",
        },
    });
}
