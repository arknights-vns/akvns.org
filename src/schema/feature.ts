import { z } from "zod";

/**
 * A feature flag.
 */
export const FeatureFlag = z.object({
    description: z.string(),
    enable: z.boolean(),
    group: z.string(),
    id: z.string().regex(/[A-Z]+(?:_[A-Z0-9]+)+/),
});

export const FeatureFlagArray = z.array(FeatureFlag);

/**
 * Feature flag listing from the API.
 */
export const FeatureFlagListAPIResponse = z.object({
    message: FeatureFlagArray,
});
