import { type NextRequest, NextResponse } from "next/server";

import { s3Client } from "@/lib/aws-s3";

/**
 * Get images of this comic collection chapter.
 */
export async function GET(
    _: NextRequest,
    parameters: RouteContext<"/api/comic/[series]/[chapter]/images">,
) {
    const { series, chapter } = await parameters.params;

    const resp = await s3Client.list(
        {
            prefix: `${series}/${chapter}`,
        },
        {
            bucket: process.env.COMIC_ASSETS_AWS_BUCKET,
        },
    );

    const objects = resp.contents;

    if (!objects || !objects.filter((x) => x.size && x.size > 0)) {
        return NextResponse.json(
            {
                error: "Nothing here.",
            },
            {
                status: 404,
            },
        );
    }

    return NextResponse.json(
        {
            message: objects
                .filter((x) => x.size && x.size > 0)
                .map((obj) => {
                    return {
                        name: obj.key,
                        url: `${process.env.COMIC_ASSETS_URL_PREFIX}/${obj.key}`,
                    };
                }),
        },
        {
            headers: {
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
            status: 200,
        },
    );
}
