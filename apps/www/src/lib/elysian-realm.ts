import { treaty } from "@elysiajs/eden";
import type { ElysiaAPI } from "@/app/(api)/api/[[...splat]]/route";

export const elysianRealm = treaty<ElysiaAPI>(
  typeof window === "undefined" ? `http://localhost:${process.env.PORT ?? 3000}` : window.location.origin
).api;
