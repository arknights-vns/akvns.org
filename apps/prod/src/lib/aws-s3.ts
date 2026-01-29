import { serverEnv } from "@arknights-vns/env-var/server";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: serverEnv.S3_AWS_REGION,
  endpoint: serverEnv.S3_AWS_ENDPOINT,
  credentials: {
    accessKeyId: serverEnv.S3_AWS_ACCESS_KEY_ID,
    secretAccessKey: serverEnv.S3_AWS_SECRET_ACCESS_KEY,
  },
});

export { s3Client };
