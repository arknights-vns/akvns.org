"use client";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import posthog from "posthog-js";

import { Announcement } from "@/schema/announcement";

export default function AnnouncementDisplay() {
    const featureName = "website-notice";

    const shouldEnable = posthog.getFeatureFlag(featureName);
    const payload = posthog.getFeatureFlagPayload(featureName);
    const data = Announcement.safeParse(payload);

    if (!shouldEnable) return;

    if (data.error) return;

    const websiteAlert = data.data;

    if (data && websiteAlert.content.trim() !== "")
        return (
            <aside className="sticky top-18 z-1 w-full bg-primary py-2 text-center text-white">
                {parse(DOMPurify.sanitize(websiteAlert.content))}
            </aside>
        );
}
