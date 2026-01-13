import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/navbar/NavigationBar";
import Providers from "@/components/Providers";

export default function ArknightsVietnamStationLayout(props: LayoutProps<"/">) {
  return (
    <>
      <NavigationBar />
      <main className="min-h-screen max-w-screen">
        <Providers>{props.children}</Providers>
      </main>
      <FatFooter />
    </>
  );
}
