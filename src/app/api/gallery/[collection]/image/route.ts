import { DeleteObjectsCommand, ListObjectsV2Command, paginateListObjectsV2, PutObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guard";
import { s3Client } from "@/lib/aws-s3";

/**
 * Delete all images of collection.
 */
export async function DELETE(
    _: NextRequest,
    parameters: RouteContext<"/api/gallery/[collection]/image">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted" },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    try {
        const paginator = paginateListObjectsV2(
            { client: s3Client },
            {
                Bucket: parameterList.collection,
            },
        );

        const objectKeys = [];

        for await (const { Contents } of paginator) {
            if (!Contents) continue;
            objectKeys.push(...Contents.map(object => ({ Key: object.Key })));
        }

        const deleteCommand = new DeleteObjectsCommand({
            Bucket: parameterList.collection,
            Delete: { Objects: objectKeys },
        });

        await s3Client.send(deleteCommand);
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, {
                status: 500,
            });
        }
    }

    return NextResponse.json({ message: "Success" }, {
        status: 200,
    });
}

/**
 * Get images list of collection.
 */
export async function GET(
    _: NextRequest,
    parameters: RouteContext<"/api/gallery/[collection]/image">,
) {
    const parameterList = await parameters.params;

    try {
        const data = await s3Client.send(
            new ListObjectsV2Command({ Bucket: parameterList.collection }),
        );

        const baseUrl = `/api/gallery/${parameterList.collection}/image`;

        const images
            = data.Contents?.map(object => ({
                name: object.Key,
                url: `${baseUrl}/${object.Key}`,
            })) || [];

        return NextResponse.json(
            { message: images },
            {
                headers: {
                    "Cache-Control": "public, max-age=1800, s-maxage=3600",
                },
                status: 200,
            });
    }
    catch {
        return NextResponse.json(
            { error: "S3 server failure" },
            { status: 500 },
        );
    }
}

/**
 * Add images to the collection.
 */
export async function PUT(
    request: NextRequest,
    parameters: RouteContext<"/api/gallery/[collection]/image">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted" },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    const form = await request.formData();
    const files = form.getAll("files") as File[];

    if (!files || files.length === 0) {
        return NextResponse.json(
            { error: "No files." },
            { status: 400 },
        );
    }

    for (const file of files) {
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        try {
            await s3Client.send(
                new PutObjectCommand({
                    Body: fileBuffer,
                    Bucket: parameterList.collection,
                    ContentType: file.type,
                    Key: file.name,
                }),
            );
        }
        catch {
            return NextResponse.json(
                { error: `Upload ${file.name} failed.` },
                { status: 500 },
            );
        }
    }

    return NextResponse.json(
        { message: "OK" },
        { status: 200 },
    );
}
