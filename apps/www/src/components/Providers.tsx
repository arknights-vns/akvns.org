import type { ReactNode } from "react";

import MicroslopClarity from "@/components/providers/MicroslopClarity";

export default function Providers({ children }: { children: ReactNode }) {
  // return <ReactQueryProvider>{children}</ReactQueryProvider>;
  return (
    <>
      {children}
      <MicroslopClarity />
    </>
  );
}
