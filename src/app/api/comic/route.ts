import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import type { ComicCategory } from "@/generated/prisma/enums";
import { requireAuth } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { ComicSeriesMetadata } from "@/schema/comic";

/**
 * Get available comic series.
 */
export async function GET() {
    const results = await prisma.comicSeries.findMany({
        select: {
            category: true,
            comicSeriesId: true,
            likeCount: true,
            thumbnail: true,
            title: true,
            updatedAt: true,
            viewCount: true,
        },
    });

    return NextResponse.json(
        { message: results },
        {
            headers: {
                "Cache-Control": "public, max-age=3600, s-maxage=7200",
            },
            status: 200,
        },
    );
}

/**
 * Create metadata for a comic series.
 */
export async function POST(request: NextRequest) {
    if (!(await requireAuth(await headers(), true))) {
        return NextResponse.json({ error: "Not Permitted." }, { status: 403 });
    }

    const parseResult = await ComicSeriesMetadata.safeParseAsync(await request.json());

    if (parseResult.error) {
        return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
    }

    const data = parseResult.data;

    await prisma.comicSeries.create({
        data: {
            author: data.author,
            category: data.category as ComicCategory,
            comicSeriesId: data.comicSeriesId,
            synopsis: data.synopsis,
            thumbnail: data.thumbnail,
            title: data.title,
            translators: [],
        },
    });

    return NextResponse.json({ message: "Create success." }, { status: 200 });
}
