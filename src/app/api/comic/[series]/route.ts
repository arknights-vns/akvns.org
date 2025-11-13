import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ComicCategory } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { ComicSeriesMetadata } from "@/schema/comic";

/**
 * Delete the comic series along with the chapters.
 */
export async function DELETE(
    _request: NextRequest,
    parameters: RouteContext<"/api/comic/[series]">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted." },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;
    const { series } = parameterList;

    const { count } = await prisma.comicSeries.deleteMany({
        where: {
            comicSeriesId: series,
        },
    });

    if (count == 0) {
        return NextResponse.json(
            { error: "Nothing gets deleted?" },
            { status: 500 },
        );
    }

    return NextResponse.json(
        { message: "Deletion success." },
        { status: 200 },
    );
}

/**
 * Get metadata for a comic series.
 */
export async function GET(
    _request: NextRequest,
    parameters: RouteContext<"/api/comic/[series]">,
) {
    const parameterList = await parameters.params;
    const { series } = parameterList;

    const row = await prisma.comicSeries.findUnique({
        include: {
            comicChapters: true,
        },
        where: {
            comicSeriesId: series,
        },
    });

    if (!row) {
        return NextResponse.json(
            { error: "Not Found." },
            { status: 404 },
        );
    }

    return NextResponse.json(
        { message: row },
        {
            headers: {
                "Cache-Control": "public, max-age=60, s-maxage=300",
            },
            status: 200,
        },
    );
}

/**
 * Update metadata for a comic series.
 */
export async function PUT(
    request: NextRequest,
    parameters: RouteContext<"/api/comic/[series]">,
) {
    if (!await requireAuth(await headers(), true)) {
        return NextResponse.json(
            { error: "Not Permitted." },
            { status: 403 },
        );
    }

    const parameterList = await parameters.params;
    const { series } = parameterList;

    const parseResult = await ComicSeriesMetadata.safeParseAsync(await request.json());

    if (parseResult.error) {
        return NextResponse.json(
            { error: parseResult.error.message },
            { status: 400 },
        );
    }

    const data = parseResult.data;

    await prisma.comicSeries.update({
        data: {
            author: data.author,
            category: data.category as ComicCategory,
            comicChapters: {
                connectOrCreate: data.comicChapters.map((ch) => {
                    return {
                        create: {
                            chapterName: ch.chapterName,
                            comicChapterId: ch.comicChapterId,
                        },
                        where: {
                            comicChapterId: ch.comicChapterId,
                        },
                    };
                }),
            },
            synopsis: data.synopsis,
            thumbnail: data.thumbnail,
            title: data.title,
            translators: data.translators,
        },
        include: {
            comicChapters: true,
        },
        where: {
            comicSeriesId: series,
        },
    });

    return NextResponse.json(
        { message: "Update success." },
        { status: 200 },
    );
}
