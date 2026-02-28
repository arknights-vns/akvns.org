import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export default async function LandingPage() {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/auth/login");
    }

    return <div className="flex h-full w-full items-center justify-center">Look to your left.</div>;
}
