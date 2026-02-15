import type { ReactNode } from "react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
