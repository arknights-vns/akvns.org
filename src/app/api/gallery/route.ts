import { paginateListBuckets } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { requireAuth } from "@/lib/auth-guard";
import { s3Client } from "@/lib/aws-s3";

/**
 * Get list of collections.
 */
export async function GET() {
    if (!await requireAuth(await headers(), true)) {
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
