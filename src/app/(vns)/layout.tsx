import type { Metadata } from "next";
import type { ReactNode } from "react";
import BackToTop from "@/components/BackToTop";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";

const prod_url = process.env.PRODUCTION_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(prod_url),
    title: "Arknights Vietnam Station",
    description: "For the Doctors, by the Doctors.",
    authors: [
        {
            name: "Trạm dừng chân chốn Terra",
            url: "https://facebook.com/terrastationvn",
        },
        {
            name: "Dreamchasers - IT Team",
            url: "https://github.com/arknights-vns",
        },
    ],
    openGraph: {
        url: prod_url,
        title: "Arknights Vietnam Station",
        siteName: "Arknights Vietnam Station",
        description: "For the Doctors, by the Doctors.",
        countryName: "Vietnam",
        locale: "vi-VN",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <>
            <NavigationBar />
            <div className={"min-h-screen max-w-screen scroll-smooth"}>{children}</div>
            <BackToTop />
            <FatFooter />
        </>
    );
}
