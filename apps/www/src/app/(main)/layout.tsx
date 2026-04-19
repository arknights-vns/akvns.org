import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/navbar/NavigationBar";
import SeekTheTruthBeyondTheWall from "@/components/SeekTheTruthBeyondTheWall";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function ArknightsVietnamStationLayout(props: LayoutProps<"/">) {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen max-w-screen">{props.children}</main>
      <FatFooter />
      <ScrollToTop />
      <SeekTheTruthBeyondTheWall/>
    </>
  );
}
