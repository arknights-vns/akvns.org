import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export async function requireAuth(headers: Headers, needAdmin = true) {
    if (env.SKIP_AUTH) return true;

    const session = await auth.api.getSession({
        headers: headers,
    });

    if (!session || (needAdmin && session.user.role !== "admin")) {
        return false;
    }

    return true;
}
