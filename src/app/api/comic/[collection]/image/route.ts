import { DeleteObjectsCommand, ListObjectsV2Command, paginateListObjectsV2, PutObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { s3Client } from "@/lib/aws-s3";

/**
 * Delete all images of collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @openapi
 */
export async function DELETE(_: NextRequest, parameters: RouteContext<"/api/comic/[collection]/image">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
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
            return NextResponse.json({ message: error.message }, {
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
 *
 * @pathParams ComicCollectionRegex
 * @response ComicAssetList
 * @openapi
 */
export async function GET(_: NextRequest, parameters: RouteContext<"/api/comic/[collection]/image">) {
    const parameterList = await parameters.params;

    const data = await s3Client.send(
        new ListObjectsV2Command({ Bucket: parameterList.collection }),
    );

    const baseUrl = `${process.env.AWS_S3_ENDPOINT}/${parameterList.collection}`;

    const images
        = data.Contents?.map(object => ({
            name: object.Key,
            url: `${baseUrl}/${object.Key}`,
        })) || [];

    return NextResponse.json({ message: images }, {
        headers: {
            "Cache-Control": "public, max-age=1800, s-maxage=3600",
        },
        status: 200,
    });
}

/**
 * Add images to the collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @body multipart/form-data
 * @openapi
 */
export async function PUT(request: NextRequest, parameters: RouteContext<"/api/comic/[collection]/image">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
    }

    const parameterList = await parameters.params;

    const form = await request.formData();
    const files = form.getAll("files") as File[];

    if (!files || files.length === 0) {
        return NextResponse.json({ message: "No files." }, { status: 400 });
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
            return NextResponse.json({ error: "Upload failed" }, { status: 500 });
        }
    }

    return NextResponse.json(
        { message: "OK" }, { status: 200 },
    );
}
