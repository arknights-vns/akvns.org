import type { ElysiaAPI } from "@/app/(api)/api/[[...splat]]/route";
import { treaty } from "@elysiajs/eden";

export const elysianRealm = treaty<ElysiaAPI>("http://localhost:3000").api;
