import { Suspense } from "react";

import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/navbar/NavigationBar";
import SiteWideAnnouncement from "@/components/SiteWideAnnouncement";

export default function ArknightsVietnamStationLayout(props: LayoutProps<"/">) {
  return (
    <>
      <Suspense>
        <SiteWideAnnouncement />
      </Suspense>
      <NavigationBar />
      <main className="min-h-screen max-w-screen">{props.children}</main>
      <FatFooter />
    </>
  );
}
