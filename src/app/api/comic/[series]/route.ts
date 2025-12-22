import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * Get metadata for a comic series.
 */
export async function GET(_request: NextRequest, parameters: RouteContext<"/api/comic/[series]">) {
    const { series } = await parameters.params;

    const entry = await drizzleDb.query.comicSeries.findFirst({
        with: {
            chapters: true,
            contributors: true,
        },
        where: eq(comicSeries.comicSeriesId, series),
    });

    if (!entry) {
        return NextResponse.json({ error: "Not Found." }, { status: 404 });
    }

    return NextResponse.json(
        { message: entry },
        {
            headers: {
                "Cache-Control": "public, max-age=7200, s-maxage=86400",
            },
            status: 200,
        },
    );
}
