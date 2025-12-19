"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            <Toaster position="top-right" richColors={true} />
        </>
    );
}
