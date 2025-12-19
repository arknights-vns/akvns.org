import { S3Client } from "bun";

import { env } from "@/lib/env";

const s3Client = new S3Client({
    region: env.AWS_REGION,
    endpoint: env.AWS_ENDPOINT,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});

export { s3Client };
