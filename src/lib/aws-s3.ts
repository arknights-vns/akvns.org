import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "https://s3.us-east-1.amazonaws.com",
    endpoint: process.env.AWS_ENDPOINT || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "ligma",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "ligma",
    },
});

export { s3Client };
