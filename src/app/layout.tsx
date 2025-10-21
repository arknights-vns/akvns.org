import type { Viewport } from "next";
import type React from "react";

import { Quicksand as VNS_Font, JetBrains_Mono as VNS_Font_Mono } from "next/font/google";

import { TerraTheme } from "@/components/TerraTheme";

import "./globals.css";

const font = VNS_Font({
    subsets: ["latin", "vietnamese"],
    variable: "--font-vns",
});

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
        <html lang={"en"} suppressHydrationWarning>
            <body className={`${font.variable} ${fontMono.variable} font-sans antialiased`}>
                <TerraTheme>{properties.children}</TerraTheme>
            </body>
        </html>
    );
}
