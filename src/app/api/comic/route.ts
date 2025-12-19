import { type NextRequest, NextResponse } from "next/server";

import { drizzleDb } from "@/lib/drizzle";

/**
 * Get available comic series.
 */
export async function GET(request: NextRequest) {
    const itemsPerPage = 10;

    const pageVal = Number.parseInt(request.nextUrl.searchParams.get("page") ?? "0", 10);

    const results = await drizzleDb.query.comicSeries.findMany({
        offset: pageVal * itemsPerPage,
        limit: itemsPerPage,
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
