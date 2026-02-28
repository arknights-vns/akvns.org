import type { Terra } from "@/lib/supabase/terra";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Terra>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Get the Supabase instance.
 *
 * @returns The supabase.
 */
export function createSupabase() {
    return supabase;
};
