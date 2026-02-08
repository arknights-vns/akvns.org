import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";
import { serverEnv } from "@/env-var/server";
import { s3Client } from "@/lib/aws-s3";
import { redisClient } from "@/lib/redis";
import { ComicImage } from "@/zod/comic";

/**
 * Get the images list.
 */
export async function fetchComicSeriesImagesByChapter(series: string, chapter: string) {
  "use cache";
  cacheTag("comic-images", series, chapter);
  cacheLife("max");

  const REDIS_KEY = `comic-assets:${series}:${chapter}`;

  let images: { name: string; url: string }[] = [];

  if (await redisClient.exists(REDIS_KEY)) {
    // biome-ignore lint/style/noNonNullAssertion: validated for key existence.
    const redisCached = (await redisClient.get(REDIS_KEY))!;
    images = await z.array(ComicImage).parseAsync(JSON.parse(redisCached));
  } else {
    const resp = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: serverEnv.COMIC_ASSETS_AWS_BUCKET,
        Prefix: `${series}/${chapter}`,
      })
    );

    const objects = resp.Contents;

    if (!objects?.filter((x) => x.Size && x.Size > 0)) {
      throw new Error("No images on record!");
    }

    images = objects
      .filter((x) => x.Size && x.Size > 0)
      .map((obj) => {
        return {
          // biome-ignore lint/style/noNonNullAssertion: There is.
          name: obj.Key!,
          url: `${serverEnv.COMIC_ASSETS_URL_PREFIX}/${obj.Key}`,
        };
      });
  }

  await redisClient.set(REDIS_KEY, JSON.stringify(images), "EX", 7 * 24 * 60 * 60);

  return images;
}
