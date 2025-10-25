"use client";

import { useQuery } from "@tanstack/react-query";

type FeatureStatus = "disabled" | "enabled" | "not_available";

/**
 * A **client-side** hook to check feature flag.
 *
 * To prevent flashing, you might need to check only for `status === "enabled"`.
 */
export function useFeatureFlag(feature: string): { status: FeatureStatus } {
    const { data, error, isFetching } = useQuery({
        queryFn: async (): Promise<FeatureStatus> => {
            const response = await fetch(`/api/feature/${feature}`);
            switch (response.status) {
                case 200: {
                    return "enabled";
                }
                case 400: {
                    return "disabled";
                }
                case 418: {
                    return "not_available";
                }
            }

            return "not_available";
        },
        queryKey: [`feature-flag-${feature}`],
    });

    if (error || isFetching) {
        return {
            status: "not_available",
        };
    }

    return {
        status: data ?? "not_available",
    };
}
