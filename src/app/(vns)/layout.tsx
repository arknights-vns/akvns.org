import AnnouncementDisplay from "@/components/AnnouncementDisplay";
import BackToTop from "@/components/BackToTop";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";

export default function AKVNSLayout(properties: LayoutProps<"/">) {
    return (
        <>
            <NavigationBar />
            <AnnouncementDisplay />
            <main className="min-h-screen max-w-screen">
                {properties.children}
            </main>
            <BackToTop />
            <FatFooter />
        </>
    );
}
