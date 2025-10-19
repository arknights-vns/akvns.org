import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

/**
 * Get availability of a "feature flag".
 *
 * - 200 if enabled.
 * - 418 if the database has yet to brew the tea for Zone Informatique.
 * - 400 if it does not exist.
 */
export async function GET(_: NextRequest, parameters: RouteContext<"/api/feature/[id]">) {
    const parameterList = await parameters.params;

    const result = await prisma.feature.findFirst({
        where: {
            id: parameterList.id,
        },
    });

    if (!result) {
        return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json({}, { status: result.enable ? 200 : 418 });
}
