import {
    DeleteBucketCommand,
    DeleteObjectsCommand,
    paginateListObjectsV2,
} from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { s3Client } from "@/lib/aws-s3";

/**
 * Delete collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @openapi
 */
export async function DELETE(_: NextRequest, parameters: RouteContext<"/api/comic/[collection]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
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
        // ignored.
    }

    try {
        // now we delete for real.
        await s3Client.send(new DeleteBucketCommand({ Bucket: parameterList.collection }));

        return NextResponse.json({ message: "OK" }, {
            status: 200,
        });
    }
    catch {
        return NextResponse.json({ message: "We're cooked" }, {
            status: 500,
        });
    }
}
