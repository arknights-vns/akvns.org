import { paginateListBuckets } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { s3Client } from "@/lib/aws-s3";

/**
 * Get list of collections.
 * @auth bearer
 * @response ComicCollectionListing
 * @openapi
 */
export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json(
            { error: "Not Permitted" },
            { status: 403 },
        );
    }

    const buckets: string[] = [];

    try {
        const paginator = paginateListBuckets({ client: s3Client }, {});

        for await (const page of paginator) {
            if (!page.Buckets) continue;

            buckets.push(...page.Buckets.map(b => b.Name ?? ""));
        }

        return NextResponse.json(
            { message: buckets },
            { status: 200 },
        );
    }
    catch {
        return NextResponse.json(
            { message: "Unable to enumerate buckets." },
            { status: 500 },
        );
    }
}
