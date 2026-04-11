import type { ReactNode } from "react";

import MicroslopClarity from "@/components/providers/MicroslopClarity";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <MicroslopClarity />
    </>
  );
}
