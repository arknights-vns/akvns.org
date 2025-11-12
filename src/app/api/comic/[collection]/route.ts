import {
    CreateBucketCommand,
    DeleteBucketCommand,
    DeleteObjectsCommand,
    paginateListObjectsV2,
} from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { s3Client } from "@/lib/aws-s3";
import prisma from "@/lib/prisma";
import { ComicSeriesMetadata } from "@/schema/comic";

/**
 * Delete collection and its metadata.
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
        return NextResponse.json(
            { error: "Not Permitted" },
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
        return NextResponse.json(
            { error: `Unable to wipe ${parameterList.collection}` },
            { status: 500 },
        );
    }

    try {
        // Delete S3 bucket
        await s3Client.send(new DeleteBucketCommand({ Bucket: parameterList.collection }));

        // Delete metadata from DB
        await prisma.comicSeries.delete({
            where: { slug: parameterList.collection },
        });

        return NextResponse.json(
            { message: "OK" },
            { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 },
            );
        }
        return NextResponse.json(
            { error: "We're cooked" },
            { status: 500 },
        );
    }
}

/**
 * Update comic metadata.
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @body ComicSeriesMetadata
 * @openapi
 */
export async function PATCH(request: NextRequest, parameters: RouteContext<"/api/comic/[collection]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json(
            { error: "Not Permitted" },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    // Validate metadata
    let metadata;
    try {
        metadata = await ComicSeriesMetadata.parseAsync(await request.json());
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    try {
        const saved = await prisma.comicSeries.update({
            data: {
                author: metadata.author,
                chapters: metadata.chapters,
                date: metadata.date,
                translators: metadata.translators,
            },
            where: { slug: parameterList.collection },
        });

        return NextResponse.json(
            {
                message: {
                    author: saved.author,
                    chapters: saved.chapters ?? [],
                    date: saved.date,
                    slug: saved.slug,
                    translators: saved.translators ?? [],
                },
            },
            { status: 200 },
        );
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 },
            );
        }
        return NextResponse.json(
            { error: "Update failed" },
            { status: 500 },
        );
    }
}

/**
 * Create a new comic collection with metadata.
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @body ComicSeriesMetadata
 * @openapi
 */
export async function PUT(request: NextRequest, parameters: RouteContext<"/api/comic/[collection]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json(
            { error: "Not Permitted" },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;

    // Validate metadata
    const metadata = await ComicSeriesMetadata.parseAsync(await request.json());

    // Create S3 bucket
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

    // Create metadata in DB
    try {
        const saved = await prisma.comicSeries.create({
            data: {
                author: metadata.author,
                chapters: metadata.chapters,
                date: metadata.date,
                slug: parameterList.collection,
                translators: metadata.translators,
            },
        });

        return NextResponse.json(
            {
                message: {
                    author: saved.author,
                    chapters: saved.chapters ?? [],
                    date: saved.date,
                    slug: saved.slug,
                    translators: saved.translators ?? [],
                },
            },
            { status: 201 },
        );
    }
    catch (error) {
        // Rollback: delete bucket if metadata creation fails
        try {
            await s3Client.send(new DeleteBucketCommand({ Bucket: parameterList.collection }));
        }
        catch {
            // Ignore rollback errors
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { error: `Metadata creation failed: ${error.message}` },
                { status: 500 },
            );
        }
        return NextResponse.json(
            { error: "Comic creation failed" },
            { status: 500 },
        );
    }
}
