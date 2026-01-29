import { Button } from "@arknights-vns/ui/components/button";
import { cn } from "@arknights-vns/ui/lib/utils";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { siteNotice } from "@/lib/feature-flag";

export default async function SiteWideAnnouncement() {
  const data = await siteNotice();

  return (
    data && (
      <aside
        className={cn(
          "w-full py-2 text-center text-white",
          data.body === null && "hidden",
          data.type === "information" && "bg-primary"
        )}
      >
        {parse(data.body || "")}
        <Button
          className={cn(
            "ml-2 rounded-full bg-black font-bold hover:bg-black hover:underline",
            data.cta === null && "hidden"
          )}
        >
          <Link href={(data.cta?.href as Route) || "#"}>
            {data.cta?.label || ""}
            <ArrowRight />
          </Link>
        </Button>
      </aside>
    )
  );
}
