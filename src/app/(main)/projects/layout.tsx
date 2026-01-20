import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arknights VNS | Dự án",
  description: "Toàn bộ dự án Arknights VNS đã thực hiện.",
};

export default function ProjectsPageLayout(props: LayoutProps<"/projects">) {
  return <>{props.children}</>;
}
