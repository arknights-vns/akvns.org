import type { API } from "@/app/api/[[...slugs]]/route";
import { treaty } from "@elysiajs/eden";

const elysianRealm = treaty<API>(
    typeof window === "undefined"
        ? `http://localhost:${process.env.PORT ?? 3000}`
        : window.location.origin,
).api;

export default elysianRealm;
