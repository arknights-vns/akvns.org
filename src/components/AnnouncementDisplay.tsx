"use client";

import type { Route } from "next";
import { useSuspenseQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import elysianRealm from "@/lib/elysian-realm";
import { cn } from "@/lib/utils";

export default function AnnouncementDisplay() {
    const { data } = useSuspenseQuery({
        queryFn: async () => await elysianRealm.notice.get(),
        queryKey: ["notice"],
    });

    if (data.error) return <aside></aside>;

    const websiteAlert = data.data.message;

    return (
        <aside
            className={cn(
                "w-full py-2 text-center text-white",
                websiteAlert.body === null && "hidden",
                websiteAlert.type === "information" && "bg-primary",
            )}
        >
            {parse(DOMPurify.sanitize(websiteAlert.body || ""))}
            <Button
                className={cn(
                    "ml-2 rounded-full bg-black font-bold hover:bg-black hover:underline",
                    websiteAlert.cta === null && "hidden",
                )}
                render={
                    <Link href={(websiteAlert.cta?.href as Route) || "#"} />
                }
                nativeButton={false}
            >
                {websiteAlert.cta?.label || ""}
                <ArrowRight />
            </Button>
        </aside>
    );
}
