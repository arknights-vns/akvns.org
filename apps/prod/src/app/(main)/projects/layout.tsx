import { clientEnv } from "@arknights-vns/env-var/client";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Arknights VNS | Dự án",
  description: "Toàn bộ dự án Arknights VNS đã thực hiện.",
  alternates: {
    canonical: `${clientEnv.NEXT_PUBLIC_PRODUCTION_URL}/projects`,
  },
};

export default function ProjectsPageLayout(props: LayoutProps<"/projects">) {
  return <Suspense>{props.children}</Suspense>;
}
