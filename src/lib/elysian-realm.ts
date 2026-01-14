import type { ElysiaAPI } from "@/app/(api)/api/[[...splat]]/route";
import { treaty } from "@elysiajs/eden";

export const elysianRealm = treaty<ElysiaAPI>(
  typeof window === "undefined" ? `https://localhost:${process.env.PORT ?? 3000}` : window.location.origin
).api;
