import type { Metadata } from "next";
import { Suspense } from "react";
import { clientEnv } from "@/env/client";

export const metadata: Metadata = {
  title: "Arknights VNS | Offline 2025 - Dreamchasers",
  description: "Arknights VNS Offline 2025 - Dreamchasers",
  alternates: {
    canonical: `${clientEnv.NEXT_PUBLIC_PRODUCTION_URL}/projects/dreamchasers`,
  },
};

export default function ProjectsPageLayout(props: LayoutProps<"/projects/dreamchasers">) {
  return <Suspense>{props.children}</Suspense>;
}
