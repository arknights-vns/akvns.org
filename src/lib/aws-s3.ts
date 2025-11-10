import { S3Client } from "@aws-sdk/client-s3";

import { env } from "@/lib/env";

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
    },
    endpoint: env.AWS_S3_ENDPOINT,
    forcePathStyle: env.AWS_S3_FORCE_PATH_STYLE,
    region: env.AWS_S3_REGION,
});
