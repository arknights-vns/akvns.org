declare global {
    namespace NodeJS {
        // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/consistent-type-definitions
        interface ProcessEnv {
            /**
             * AWS S3 accessKeyId.
             */
            AWS_S3_ACCESS_KEY_ID: string;
            /**
             * AWS S3 API endpoint.
             */
            AWS_S3_ENDPOINT: string;
            /**
             * AWS S3 forcePathStyle.
             */
            AWS_S3_FORCE_PATH_STYLE: boolean;
            /**
             * AWS S3 region.
             * We don't default to us-east-1.
             */
            AWS_S3_REGION: string;
            /**
             * AWS S3 secretAccessKey.
             */
            AWS_S3_SECRET_ACCESS_KEY: string;
            /**
             * Production URL, remember to do the null-check.
             */
            PRODUCTION_URL: null | string;
            /**
             * As long as this is defined, you skip auth.
             * No. matter. the. content.
             */
            SKIP_AUTH: unknown;
        }
    }
}

// eslint-disable-next-line unicorn/require-module-specifiers
export {};
