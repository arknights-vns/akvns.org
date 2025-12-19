import { and, gte, lt } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { blog } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

/**
 * Get the available blog slugs.
 */
export async function GET(request: NextRequest) {
    const itemsPerPage = 10;

    const pageVal = Number.parseInt(request.nextUrl.searchParams.get("page") ?? "0", 10);

    const records = await drizzleDb.query.blog.findMany({
        where: and(gte(blog.id, pageVal * itemsPerPage), lt(blog.id, (pageVal + 1) * itemsPerPage)),
    });

    return NextResponse.json(
        {
            message: records,
            canMoveNext: records.length === itemsPerPage,
            next: pageVal + 1,
        },
        {
            headers: {
                "Cache-Control": "public, max-age=3600, s-maxage=7200",
            },
            status: 200,
        },
    );
}
