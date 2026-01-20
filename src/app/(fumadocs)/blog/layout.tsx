import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { baseOptions } from "@/lib/fuma-layout-blog";
import { source } from "@/lib/fuma-source-blog";

export default function Layout({ children }: LayoutProps<"/blog">) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
