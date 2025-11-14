"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlagProvider } from "@unleash/nextjs/client";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { TerraTheme } from "@/components/TerraTheme";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <TerraTheme>
            <QueryClientProvider client={queryClient}>
                <FlagProvider
                    config={{
                        refreshInterval: 15,
                    }}
                >
                    {children}
                </FlagProvider>
            </QueryClientProvider>
            <Toaster position="top-right" richColors={true} />
        </TerraTheme>
    );
}
