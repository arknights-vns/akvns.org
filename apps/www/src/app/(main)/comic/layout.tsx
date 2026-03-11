import { Suspense } from "react";

import LoadingLappy from "@/components/LoadingLappy";

export default function ComicPageLayout(props: LayoutProps<"/comic">) {
  // yes, we ran in full circle.
  return <Suspense fallback={<LoadingLappy />}>{props.children}</Suspense>;
}
