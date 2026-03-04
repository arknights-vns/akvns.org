import type { Metadata } from "next";
import { Suspense } from "react";
import { getProductionUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Arknights VNS | Dự án",
  description: "Toàn bộ dự án Arknights VNS đã thực hiện.",
  alternates: {
    canonical: `${getProductionUrl()}/projects`,
  },
};

export default function ProjectsPageLayout(props: LayoutProps<"/projects">) {
  return <Suspense>{props.children}</Suspense>;
}
