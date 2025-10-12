import type { Metadata } from "next";
import type { ReactNode } from "react";

import BackToTop from "@/components/BackToTop";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";

const production_url = process.env.PRODUCTION_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
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
    description: "For the Doctors, by the Doctors.",
    metadataBase: new URL(production_url),
    openGraph: {
        countryName: "Vietnam",
        description: "For the Doctors, by the Doctors.",
        locale: "vi-VN",
        siteName: "Arknights Vietnam Station",
        title: "Arknights Vietnam Station",
        url: production_url,
    },
    title: "Arknights Vietnam Station",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
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
