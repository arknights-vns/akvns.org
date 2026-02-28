import type { Terra } from "@/lib/supabase/terra";
import { createClient } from "@supabase/supabase-js";

const elevatedSupabase = createClient<Terra>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Get the **ELEVATED** Supabase instance.
 * Unless you know what you are doing, use the one from client.ts instead.
 * Use in /api only!
 *
 * @returns The elevated supabase.
 */
export function createElevatedSupabase() {
    return elevatedSupabase;
};
