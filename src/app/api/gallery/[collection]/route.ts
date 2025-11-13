import {
    CreateBucketCommand,
    DeleteBucketCommand,
    DeleteObjectsCommand,
    paginateListObjectsV2,
} from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guard";
import { s3Client } from "@/lib/aws-s3";

/**
 * Delete image collection.
 */
export async function DELETE(
    _: NextRequest,
    parameters: RouteContext<"/api/gallery/[collection]">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted." },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    try {
        // AWS requires bucket must be empty.
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
    catch {
        // bucket probably empty, don't care
        await s3Client.send(new DeleteBucketCommand({ Bucket: parameterList.collection }));
    }

    return NextResponse.json(
        { message: "OK" },
        { status: 200 },
    );
}

/**
 * Create a new gallery collection.
 */
export async function PUT(
    _: NextRequest,
    parameters: RouteContext<"/api/gallery/[collection]">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted." },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    try {
        await s3Client.send(new CreateBucketCommand({ Bucket: parameterList.collection }));
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Bucket creation failed: ${error.message}` },
                { status: 500 },
            );
        }
        return NextResponse.json(
            { error: `Bucket "${parameterList.collection}" not created.` },
            { status: 500 },
        );
    }

    return NextResponse.json(
        { message: `Bucket "${parameterList.collection}" created.` },
        { status: 201 },
    );
}
