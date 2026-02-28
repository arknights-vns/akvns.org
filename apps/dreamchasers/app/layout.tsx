import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { Quicksand as VNS_Font } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { BASE_URL } from "@/app/web-config";
import { TerraTheme } from "@/components/TerraTheme";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: "Thank you from VNS 💖",
    description: "For the Doctors, by the Doctors.",
    authors: [
        {
            name: "Trạm dừng chân chốn Terra",
            url: "https://facebook.com/terrastationvn"
        },
        {
            name: "VNS Dev Squad",
            url: "https://github.com/arknights-vns"
        }
    ],
    openGraph: {
        url: BASE_URL,
        title: "Dreamchasers @ 2025",
        siteName: "Arknights VNS - Dreamchasers",
        description: "For the Doctors, by the Doctors.",
        countryName: "Vietnam",
        locale: "vi-VN"
    }
};

const mainFont = VNS_Font({
    variable: "--font-vns",
    subsets: ["latin", "vietnamese"]
});

export const viewport: Viewport = {
    colorScheme: "light dark",
    initialScale: 1.0
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="vn" suppressHydrationWarning>
            <body
                className={clsx(
                    "antialiased",
                    mainFont.className
                )}
            >
                <TerraTheme>
                    <NuqsAdapter>{children}</NuqsAdapter>
                    <Toaster position="top-right" richColors />
                </TerraTheme>
            </body>
        </html>
    );
}
