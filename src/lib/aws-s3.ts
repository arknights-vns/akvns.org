import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
    endpoint: process.env.AWS_S3_ENDPOINT,
    forcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE,
    region: process.env.AWS_S3_REGION,
});
