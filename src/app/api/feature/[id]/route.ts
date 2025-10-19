import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
  * DELETE THE FEATURE FLAG.
  */
export async function DELETE(_: NextRequest, parameters: RouteContext<"/api/feature/[id]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Shoo" }, { status: 403 });
    }

    const parameterList = await parameters.params;

    await prisma.feature.deleteMany({
        where: {
            id: parameterList.id,
        },
    });

    return NextResponse.json({}, {
        status: 200,
    });
}

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

    return NextResponse.json({}, {
        headers: {
            "Cache-Control": "public, max-age=1800, s-maxage=3600",
        },
        status: result.enable ? 200 : 418,
    });
}
