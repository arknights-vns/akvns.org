"use client";

import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { Announcement } from "@/schema/announcement";

export default function AnnouncementDisplay() {
    const { data, isPending, error } = useQuery({
        queryFn: async () => {
            const resp = await fetch("/api/announcement");

            if (!resp.ok) {
                throw new Error("No announcement at the time!");
            }

            const body = await resp.json();

            return await Announcement.parseAsync(body.message);
        },
        queryKey: ["announcements"],
    });

    if (isPending || error) return;

    if (data && data.content.trim() !== "")
        return (
            <div className="py-2 z-1 sticky text-center top-18 bg-primary text-white w-full">
                <div className="prose">{parse(DOMPurify.sanitize(data.content))}</div>
            </div>
        );
}
