import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ComicSeriesMetadata } from "@/schema/comic";

/**
 * Get minimal metadata for a comic collection.
 *
 * @pathParams ComicCollectionRegex
 * @openapi
 */
export async function GET(
    _request: NextRequest,
    parameters: RouteContext<"/api/comic/[collection]/metadata">,
) {
    const parameterList = await parameters.params;
    const { collection } = parameterList;

    // @ts-expect-error Prisma Client types may be stale until `npx prisma generate` runs
    const row = await prisma.comicSeries.findUnique({
        where: { slug: collection },
    });

    if (!row) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(
        {
            message: {
                author: row.author,
                chapters: row.chapters ?? [],
                date: row.date,
                translators: row.translators ?? [],
            },
        },
        {
            headers: {
                "Cache-Control": "public, max-age=60, s-maxage=300",
            },
            status: 200,
        },
    );
}

/**
 * Update minimal metadata for a comic collection.
 *
 * @auth bearer
 * @pathParams ComicCollectionRegex
 * @body ComicSeriesMetadata
 * @openapi
 */
export async function PUT(
    request: NextRequest,
    parameters: RouteContext<"/api/comic/[collection]/metadata">,
) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
    }

    const parameterList = await parameters.params;
    const { collection } = parameterList;

    let data;
    try {
        data = await ComicSeriesMetadata.parseAsync(await request.json());
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    try {
        // @ts-expect-error Prisma Client types may be stale until `npx prisma generate` runs
        const saved = await prisma.comicSeries.upsert({
            create: {
                author: data.author,
                chapters: data.chapters,
                date: data.date,
                slug: collection,
                translators: data.translators,
            },
            update: {
                author: data.author,
                chapters: data.chapters,
                date: data.date,
                translators: data.translators,
            },
            where: { slug: collection },
        });

        return NextResponse.json(
            {
                message: {
                    author: saved.author,
                    chapters: saved.chapters ?? [],
                    date: saved.date,
                    translators: saved.translators ?? [],
                },
            },
            { status: 200 },
        );
    }
    catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
