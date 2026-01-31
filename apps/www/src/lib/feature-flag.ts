import type { EvaluationContext } from "@openfeature/server-sdk";
import { flag } from "flags/next";
import type { z } from "zod";
import { openFeatureAdapter } from "@/lib/open-feature";
import type { SiteAnnouncement } from "@/zod/announcement";

export const siteNotice = flag<z.infer<typeof SiteAnnouncement>, EvaluationContext>({
  key: "site-notice",
  defaultValue: null,
  adapter: openFeatureAdapter.objectValue(),
});

export const websiteFlags = [siteNotice] as const;
