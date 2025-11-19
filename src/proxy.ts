import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export async function proxy(request: NextRequest) {
    if (env.SKIP_AUTH) {
        const environment = process.env.NODE_ENV;

        if (environment === "production") {
            const nullUrl = new URL("/auth/you-are-not-supposed-to-see-this", request.url);
            return NextResponse.redirect(nullUrl);
        } else {
            // biome-ignore lint/suspicious/noConsole: on `next dev` only.
            console.warn("WARNING: SKIP_AUTH is ON!!!");
        }
    }

    if (!env.SKIP_AUTH) {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            const targetUrl = new URL("/auth/redirect", request.url);

            const destination = request.nextUrl.pathname;
            targetUrl.searchParams.set("next", destination);

            return NextResponse.redirect(targetUrl);
        }

        if (session.user.role !== "admin") {
            const nullUrl = new URL("/404", request.url);
            nullUrl.searchParams.set("err", "notAdmin");

            return NextResponse.redirect(nullUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/manage/:path*"],
};
