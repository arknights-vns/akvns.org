declare global {
    namespace NodeJS {
        // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/consistent-type-definitions
        interface ProcessEnv {
            /**
             * Production URL, remember to do the null-check.
             */
            PRODUCTION_URL: string?;
        }
    }
}

// eslint-disable-next-line unicorn/require-module-specifiers
export {};
