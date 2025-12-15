import fs from "node:fs/promises";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Get images of this comic collection chapter.
 */
export async function GET(
    _: NextRequest,
    parameters: RouteContext<"/api/comic/[series]/[chapter]/images">,
) {
    const parameterList = await parameters.params;
    const { series, chapter } = parameterList;

    const files = await fs.readdir(`public/comic/${series}/${chapter}`);

    const imagesOnly = files.filter((entry) => {
        return entry.endsWith(".jpeg") || entry.endsWith(".jpg") || entry.endsWith(".png");
    });

    if (imagesOnly.length === 0) {
        return NextResponse.json(
            {
                error: "No entries",
            },
            {
                status: 404,
            },
        );
    }

    const sortedEntries = imagesOnly.sort((a, b) => a.localeCompare(b));

    return NextResponse.json(
        {
            message: sortedEntries.map((entry) => {
                return {
                    name: entry,
                    url: `/comic/${series}/${chapter}/${entry}`,
                };
            }),
        },
        {
            headers: {
                "Cache-Control": "public, max-age=60, s-maxage=300",
            },
            status: 200,
        },
    );
}
