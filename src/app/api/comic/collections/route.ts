import {
    CreateBucketCommand,
    paginateListBuckets,
    PutBucketPolicyCommand,
} from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { s3Client } from "@/lib/aws-s3";
import { ComicCollection } from "@/schema/comic";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Shoo" }, { status: 403 });
    }

    const paginator = paginateListBuckets({ client: s3Client }, {});
    let buckets: string[] = [];

    for await (const page of paginator) {
        if (!page.Buckets) continue;

        buckets.push(...page.Buckets.map(b => b.Name ?? ""));
    }

    // akvns is internal cumdump
    buckets = buckets.filter(b => b !== "akvns");

    return NextResponse.json({ message: buckets }, { headers: {
        "Cache-Control": "public, max-age=1800, s-maxage=3600",
    },
    status: 200 });
}

export async function PUT(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Shoo" }, { status: 403 });
    }

    const body = await request.json();
    const json = await ComicCollection.parseAsync(body);

    try {
        await s3Client.send(new CreateBucketCommand({ Bucket: json.name }));

        const publicReadPolicy = {
            Statement: [
                {
                    Action: ["s3:GetObject"],
                    Effect: "Allow",
                    Principal: "*",
                    Resource: [`arn:aws:s3:::${json.name}/*`],
                },
            ],
            Version: "2012-10-17",
        };

        await s3Client.send(new PutBucketPolicyCommand({
            Bucket: json.name,
            Policy: JSON.stringify(publicReadPolicy),
        }));

        return NextResponse.json({ message: `Bucket "${json.name}" created.` }, { status: 200 });
    }
    catch {
        return NextResponse.json({ message: "We are cooked." }, { status: 500 });
    }
}
