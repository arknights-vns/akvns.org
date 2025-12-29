import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.S3_AWS_REGION || "us-east-1",
    endpoint:
        process.env.S3_AWS_ENDPOINT || "https://s3.us-east-1.amazonaws.com",
    credentials: {
        accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID || "ligma",
        secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY || "ligma",
    },
});

export { s3Client };
