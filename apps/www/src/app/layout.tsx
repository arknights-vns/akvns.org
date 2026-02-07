import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Quicksand as VNS_Font, JetBrains_Mono as VNS_Font_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Providers from "@/components/Providers";
import { clientEnv } from "@/env-var/client";
import "@arknights-vns/shadcn-ui/globals.css";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";

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
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable} font-sans antialiased`,
          process.env.NODE_ENV === "development" && "border-2 border-primary"
        )}
      >
        <NuqsAdapter>
          <Providers>{props.children}</Providers>
          <GoogleAnalytics gaId="G-Y625KEE6HT" />
          <GoogleTagManager gtmId="GTM-PT7MFG5F" />
        </NuqsAdapter>
      </body>
    </html>
  );
}

export default RootLayout;
