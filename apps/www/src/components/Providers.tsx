import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // return <ReactQueryProvider>{children}</ReactQueryProvider>;
  return children;
}
