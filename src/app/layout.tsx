import type { Metadata, Viewport } from "next";
import FavIconLight from "@public/favicon.ico";
import FavIconDark from "@public/favicon-dark.ico";
import { Quicksand as VNS_Font, JetBrains_Mono as VNS_Font_Mono } from "next/font/google";

import Providers from "@/components/Providers";
import { env } from "@/lib/env";

import "./globals.css";

const font = VNS_Font({
    subsets: ["latin", "vietnamese"],
    variable: "--font-vns",
});

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
    },
    title: "Arknights Vietnam Station",
};

const fontMono = VNS_Font_Mono({
    subsets: ["latin", "vietnamese"],
    variable: "--font-vns-mono",
});

export const viewport: Viewport = {
    colorScheme: "light dark",
    initialScale: 1,
    themeColor: "#fe0606",
};

export default function RootLayout(properties: LayoutProps<"/">) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body className={`${font.variable} ${fontMono.variable} font-sans antialiased`}>
                <Providers>{properties.children}</Providers>
            </body>
        </html>
    );
}
