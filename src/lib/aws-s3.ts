import { S3Client } from "@aws-sdk/client-s3";

import { env } from "@/lib/env";

const s3Client = new S3Client({
    region: env.AWS_REGION,
    endpoint: env.AWS_ENDPOINT,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
});

export { s3Client };
