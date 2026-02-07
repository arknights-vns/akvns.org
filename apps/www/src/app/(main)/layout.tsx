import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/navbar/NavigationBar";

export default function ArknightsVietnamStationLayout(props: LayoutProps<"/">) {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen max-w-screen">{props.children}</main>
      <FatFooter />
    </>
  );
}
