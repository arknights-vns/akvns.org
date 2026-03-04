import type { Metadata } from "next";
import { Suspense } from "react";
import { createMetadata, getProductionUrl } from "@/lib/utils";

export const metadata: Metadata = {
  ...createMetadata("Dự án", "Toàn bộ dự án Arknights VNS đã thực hiện."),
  alternates: {
    canonical: `${getProductionUrl()}/projects`,
  },
};

export default function ProjectsPageLayout(props: LayoutProps<"/projects">) {
  return <Suspense>{props.children}</Suspense>;
}
