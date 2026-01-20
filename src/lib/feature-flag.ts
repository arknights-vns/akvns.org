import type { EvaluationContext } from "@openfeature/server-sdk";
import type { z } from "zod";
import type { SiteAnnouncement } from "@/schema/announcement";
import { flag } from "flags/next";

import { openFeatureAdapter } from "@/lib/open-feature";

export const siteNotice = flag<z.infer<typeof SiteAnnouncement>, EvaluationContext>({
  key: "site-notice",
  defaultValue: null,
  adapter: openFeatureAdapter.objectValue(),
});

export const websiteFlags = [siteNotice] as const;
