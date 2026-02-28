import { NextResponse } from "next/server";
import { createSupabase } from "@/lib/supabase/client";

/**
 * Get the operator list.
 */
export async function GET() {
    const client = createSupabase();

    const { data: operators, error } = await client
        .from("operators_v2")
        .select("name,charid,rarity,profession");

    if (!error) {
        return NextResponse.json({ message: operators }, {
            status: 200,
            headers: {
                "Cache-Control": "public, max-age=31536000, immutable"
            }
        });
    }

    return NextResponse.json({ error }, { status: 500 });
}
