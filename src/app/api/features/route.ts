import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Get all features flags.
 *
 * @auth bearer
 * @response FeatureFlagArray
 * @openapi
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
