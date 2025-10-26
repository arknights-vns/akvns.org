"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { TerraTheme } from "@/components/TerraTheme";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <TerraTheme>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
            <Toaster position={"top-right"} richColors />
        </TerraTheme>
    );
}
