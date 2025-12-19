import { NextResponse } from "next/server";

import { drizzleDb } from "@/lib/drizzle";

/**
 * Get available comic series.
 */
export async function GET() {
    const results = await drizzleDb.query.comicSeries.findMany({
        columns: {
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
