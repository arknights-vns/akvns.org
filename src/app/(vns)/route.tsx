import { createFileRoute, Outlet } from "@tanstack/react-router";

import AnnouncementDisplay from "@/components/AnnouncementDisplay";
import BackToTop from "@/components/BackToTop";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";

export const Route = createFileRoute("/(vns)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AnnouncementDisplay />
      <NavigationBar />
      <main className="min-h-screen max-w-screen">
        <Outlet />
      </main>
      <BackToTop />
      <FatFooter />
    </>
  );
}
