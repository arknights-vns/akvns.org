import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FeatureFlag } from "@/schema/feature";

/**
 * Get all feature flags.
 *
 * @auth bearer
 * @response FeatureFlagArray
 */
export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
    }

    const result = await prisma.feature.findMany();

    return NextResponse.json({ message: result }, { status: 200 });
}

/**
 * Create new feature flag.
 *
 * @auth bearer
 * @body FeatureFlag
 */
export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
    }

    try {
        const body = await FeatureFlag.parseAsync(await request.json());

        await prisma.feature.create({
            data: {
                description: body.description,
                enable: body.enable,
                group: body.group,
                id: body.id,
            },
        });

        return NextResponse.json({ message: "Created." }, { status: 201 });
    }
    catch {
        return NextResponse.json({ error: "Unable to create feature." }, { status: 400 });
    }
}
