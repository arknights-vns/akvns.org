import { clientEnv } from "@/env-var/client";

const trailingSlashRegex = /\/+$/;

/**
 * Get the production URL.
 *
 * Hopefully it works, like I use this in both Server & Client components <(")
 */
export function getProductionUrl() {
  const PAGE_URL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

  return PAGE_URL.replace(trailingSlashRegex, "");
}
