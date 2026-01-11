import { useStringFlagValue } from "@openfeature/react-sdk";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiteAnnouncement } from "@/schema/announcement";

export default function AnnouncementDisplay() {
  const data = useStringFlagValue("site-notice", "null");

  const websiteAlert = SiteAnnouncement.parse(JSON.parse(data));

  if (websiteAlert === null) {
    return <aside />;
  }

  return (
    <aside
      className={cn(
        "w-full py-2 text-center text-white",
        websiteAlert.body === null && "hidden",
        websiteAlert.type === "information" && "bg-primary"
      )}
    >
      {parse(websiteAlert.body || "")}
      <Button
        className={cn(
          "ml-2 rounded-full bg-black font-bold hover:bg-black hover:underline",
          websiteAlert.cta === null && "hidden"
        )}
        nativeButton={false}
        render={
          <a href={websiteAlert.cta?.href || "#"}>
            {websiteAlert.cta?.label || ""}
            <ArrowRight />
          </a>
        }
      />
    </aside>
  );
}
