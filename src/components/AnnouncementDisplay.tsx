"use client";

import alert from "@public/website-alert.json";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { Announcement } from "@/schema/announcement";

export default function AnnouncementDisplay() {
    const data = Announcement.safeParse(alert);

    if (data.error) return;

    const websiteAlert = data.data;

    if (data && websiteAlert.content.trim() !== "")
        return (
            <div className="sticky top-18 z-1 w-full bg-primary py-2 text-center text-white">
                <div className="prose">{parse(DOMPurify.sanitize(websiteAlert.content))}</div>
            </div>
        );
}
