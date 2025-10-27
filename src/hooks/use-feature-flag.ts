"use client";

import { useQuery } from "@tanstack/react-query";

type FeatureStatus = "disabled" | "enabled";

/**
 * A **client-side** hook to check feature flag.
 */
export function useFeatureFlag(feature: string): { status: FeatureStatus } {
    const { data, error, isFetching } = useQuery({
        queryFn: async (): Promise<FeatureStatus> => {
            const response = await fetch(`/api/features/${feature}`);
            switch (response.status) {
                case 200: {
                    return "enabled";
                }
            }

            return "disabled";
        },
        queryKey: [`feature-${feature}`],
    });

    if (!data || error || isFetching) {
        return {
            status: "disabled",
        };
    }

    return {
        status: data,
    };
}
