import { type NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

/**
 * Get metadata for a comic series.
 */
export async function GET(_request: NextRequest, parameters: RouteContext<"/api/comic/[series]">) {
    const parameterList = await parameters.params;
    const { series } = parameterList;

    const row = await prisma.comicSeries.findUnique({
        include: {
            chapters: true,
            contributors: true,
        },
        where: {
            comicSeriesId: series,
        },
    });

    if (!row) {
        return NextResponse.json({ error: "Not Found." }, { status: 404 });
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
