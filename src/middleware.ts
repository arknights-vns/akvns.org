import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        const targetUrl = new URL("/auth", request.url);

        const destination = request.nextUrl.pathname;
        targetUrl.searchParams.set("next", destination);

        return NextResponse.redirect(targetUrl);
    }

    if (session.user.role !== "admin") {
        const nullUrl = new URL("/404", request.url);
        nullUrl.searchParams.set("err", "notAdmin");

        return NextResponse.redirect(nullUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/manage:path*"],
    runtime: "nodejs",
};
