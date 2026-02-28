/**
 * Get the production URL, **without trailing slash**.
 */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";
