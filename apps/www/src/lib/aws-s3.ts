import { S3Client } from "bun";
import { serverEnv } from "@/env-var/server";

const s3Client = new S3Client({
  region: serverEnv.S3_AWS_REGION,
  endpoint: serverEnv.S3_AWS_ENDPOINT,
  accessKeyId: serverEnv.S3_AWS_ACCESS_KEY_ID,
  secretAccessKey: serverEnv.S3_AWS_SECRET_ACCESS_KEY,
});

export { s3Client };
