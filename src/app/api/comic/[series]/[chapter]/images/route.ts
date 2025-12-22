import { ListObjectsV2Command } from "@aws-sdk/client-s3";
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

    const resp = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: process.env.COMIC_ASSETS_AWS_BUCKET,
            Prefix: `${series}/${chapter}`,
        }),
    );

    const objects = resp.Contents;

    if (!objects || !objects.filter((x) => x.Size && x.Size > 0)) {
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
                .filter((x) => x.Size && x.Size > 0)
                .map((obj) => {
                    return {
                        name: obj.Key,
                        url: `${process.env.COMIC_ASSETS_URL_PREFIX}/${obj.Key}`,
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
