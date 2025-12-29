import { S3Client } from "bun";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || process.env.S3_AWS_REGION || "us-east-1",
    endpoint:
        process.env.AWS_ENDPOINT ||
        process.env.S3_AWS_ENDPOINT ||
        "https://s3.us-east-1.amazonaws.com",
    accessKeyId:
        process.env.AWS_ACCESS_KEY_ID ||
        process.env.S3_AWS_ACCESS_KEY_ID ||
        "ligma",
    secretAccessKey:
        process.env.AWS_SECRET_ACCESS_KEY ||
        process.env.S3_AWS_SECRET_ACCESS_KEY ||
        "ligma",
});

export { s3Client };
