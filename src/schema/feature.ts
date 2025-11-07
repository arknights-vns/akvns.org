import { z } from "zod";

/**
 * Regex for Feature ID.
 */
export const FeatureIdRegex = /[A-Z]+(?:_[A-Z0-9]+)*/;

/**
 * A feature flag.
 */
export const FeatureFlag = z.object({
    description: z.string().nonempty({ error: "Description must not be empty." }),
    enable: z.boolean(),
    group: z.string().nonempty({ error: "Group must not be empty." }),
    id: z.string().nonempty({ error: "Name must not be empty." }).regex(FeatureIdRegex, { error: "Must be upper-case alphanumeric, separated by _" }),
});

/**
 * An array of features.
 */
export const FeatureFlagArray = z.array(FeatureFlag);
