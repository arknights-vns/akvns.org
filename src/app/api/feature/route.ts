import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VNS_APIError } from "@/schema/api";
import { FeatureFlag, FeatureFlagListAPIResponse } from "@/schema/feature";

/**
 * Get all available "feature flag".
 *
 * Requires admin role.
 */
export async function GET(): Promise<NextResponse<z.infer<typeof FeatureFlagListAPIResponse> | z.infer<typeof VNS_APIError>>> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Shoo" }, { status: 403 });
    }

    const result = await prisma.feature.findMany();

    return NextResponse.json({ message: result }, { status: 200 });
}

/**
 * Create new "feature flag".
 *
 * Requires admin role.
 */
export async function POST(request: NextRequest): Promise<NextResponse<unknown | z.infer<typeof VNS_APIError>>> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Shoo" }, { status: 403 });
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

        return NextResponse.json({}, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
