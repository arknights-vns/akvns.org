import { type NextRequest, NextResponse } from "next/server";

import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * Get available comic series.
 */
export async function GET(request: NextRequest) {
    const itemsPerPage = 10;

    const pageVal = Number.parseInt(
        request.nextUrl.searchParams.get("page") ?? "0",
        10,
    );

    const results = await drizzleDb
        .select()
        .from(comicSeries)
        .offset(pageVal * itemsPerPage)
        .limit(itemsPerPage);

    return NextResponse.json(
        { message: results },
        {
            headers: {
                "Cache-Control": "public, max-age=7200, s-maxage=86400",
            },
            status: 200,
        },
    );
}
