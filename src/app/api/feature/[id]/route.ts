import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FeatureFlag } from "@/schema/feature";

/**
 * Delete feature flag.
 *
 * @auth bearer
 * @pathParams FeatureIdRegex
 */
export async function DELETE(_: NextRequest, parameters: RouteContext<"/api/feature/[id]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
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
 * Get feature flag availability.
 *
 * @description 200 if available, 418 if not.
 * @pathParams FeatureIdRegex
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

/**
 * Change feature flag properties.
 *
 * @auth bearer
 * @description 200 if available, 418 if not.
 * @pathParams FeatureIdRegex
 */
export async function PATCH(request: NextRequest, parameters: RouteContext<"/api/feature/[id]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Not Permitted" }, { status: 403 });
    }

    const parameterList = await parameters.params;
    const body = await FeatureFlag.parseAsync(await request.json());

    const changes = await prisma.feature.updateMany({
        data: {
            description: body.description,
            enable: body.enable,
            group: body.group,
            id: body.id,
        },
        where: {
            id: parameterList.id,
        },
    });

    if (changes.count === 0)
        return NextResponse.json({
            message: "No such record",
        }, {
            status: 400,
        });

    return NextResponse.json({}, {
        status: 200,
    });
}
