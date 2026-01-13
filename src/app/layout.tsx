import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Quicksand as VNS_Font, JetBrains_Mono as VNS_Font_Mono } from "next/font/google";

import { clientEnv } from "@/env/client";

const fontSans = VNS_Font({
  subsets: ["latin", "vietnamese"],
  variable: "--font-vns",
});

const fontMono = VNS_Font_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-vns-mono",
});

const PAGE_TITLE = "Arknights Vietnam Station";
const PAGE_DESC = "For the Dreamchasers, by the Dreamchasers.";

const PAGE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : clientEnv.NEXT_PUBLIC_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(PAGE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESC,
  openGraph: {
    url: new URL(PAGE_URL),
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
  keywords: "arknights,arknights vietnam station,terrastationvn,arknights endfield,endministrator",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  initialScale: 1,
  themeColor: "#fe0606",
};

function RootLayout(props: LayoutProps<"/">) {
  return (
    <html className="dark" data-scroll-behavior="smooth" lang="vi">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        {/* <Providers>{properties.children}</Providers> */}
        {props.children}
      </body>
    </html>
  );
}

export default RootLayout;
