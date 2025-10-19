"use client";

import useSWR from "swr";

type FeatureStatus = "disabled" | "enabled" | "not_available";

const fetcher = (feature: string) => fetch(`/api/feature/${feature}`).then(response => response);

/**
 * A **client-side** hook to check feature flag.
 *
 * To prevent flashing, you might need to check only for `status === "enabled"`.
 */
export function useFeatureFlag(feature: string): { status: FeatureStatus } {
    const { data, isLoading } = useSWR(feature, fetcher);

    let status: FeatureStatus = "not_available";

    if (!isLoading && data && data.status)
        switch (data.status) {
            case 200: {
                status = "enabled";
                break;
            }
            case 400: {
                status = "disabled";
                break;
            }
            case 418: {
                status = "not_available";
                break;
            }
        }

    return {
        status,
    };
}
