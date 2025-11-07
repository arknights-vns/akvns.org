import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";

import { auth } from "@/lib/auth";

export async function RequireAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(request.headers),
        });

        if (!session) {
            return response.status(406).send({ error: "Not logged in." });
        }

        if (session.user.role === "admin") {
            next();
        }
        else {
            return response.status(403).send({ error: "Unauthorized." });
        }
    }
    catch {
        return response.status(500).send({ error: "Unable to authorize." });
    }
}
