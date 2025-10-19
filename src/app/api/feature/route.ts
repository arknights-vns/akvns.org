import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { VNS_APIError } from "@/schema/api";
import { FeatureFlagArray, FeatureFlagListAPIResponse } from "@/schema/feature";

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
 * Submit "feature flag" changes.
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

    const body = await FeatureFlagArray.parseAsync(await request.json());

    try {
        await prisma.$transaction(body.map(item => prisma.feature.update({
            data: {
                ...item,
            },
            where: {
                id: item.id,
            },
        })));
    }
    catch (error) {
        return NextResponse.json({ message: error }, { status: 502 });
    }

    return NextResponse.json({}, { status: 200 });
}
