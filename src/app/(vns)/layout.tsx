import FavIconLight from "@public/favicon.ico";

import FavIconDark from "@public/favicon-dark.ico";
import type { Metadata } from "next";

import BackToTop from "@/components/BackToTop";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";
import { env } from "@/lib/env";

const production_url = env.NEXT_PUBLIC_PRODUCTION_URL;

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
    icons: {
        icon: [
            {
                href: FavIconLight.src,
                media: "(prefers-color-scheme: light)",
                url: FavIconLight.src,
            },
            {
                href: FavIconDark.src,
                media: "(prefers-color-scheme: dark)",
                url: FavIconDark.src,
            },
        ],
    },
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

export default function RootLayout(properties: LayoutProps<"/">) {
    return (
        <>
            <NavigationBar />
            <main className="min-h-screen max-w-screen scroll-smooth">{properties.children}</main>
            <BackToTop />
            <FatFooter />
        </>
    );
}
