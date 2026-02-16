import { Suspense } from "react";

export default function ComicPageLayout(props: LayoutProps<"/comic">) {
  // yes, we ran in full circle.
  return <Suspense>{props.children}</Suspense>;
}
