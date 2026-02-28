import type { Terra } from "@/lib/supabase/terra";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Get the SSR'd supabase.
 * Unless you know what you are doing, use the one from client.ts instead.
 *
 * @returns The Server-Side supabase client.
 */
export async function createServerSupabase() {
    const cookieStore = await cookies();

    return createServerClient<Terra>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                }
            }
        }
    );
}
