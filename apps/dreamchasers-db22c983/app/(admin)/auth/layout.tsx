"use client";

import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { createSupabase } from "@/lib/supabase/client";

export default function Layout(
    {
        children
    }: Readonly<{
        children: ReactNode;
    }>
) {
    useEffect(() => {
        (async () => {
            if (await createSupabase().auth.getUser()) {
                redirect("/dashboard");
            }
        })();
    }, []);

    return (
        <div>
            <div className="absolute top-4 right-4">
                <ThemeSwitcher />
            </div>
            <div className="flex h-screen w-screen items-center justify-center bg-background">
                {children}
            </div>
        </div>
    );
}
