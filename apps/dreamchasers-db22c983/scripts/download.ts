import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;
const DOWNLOAD_DIR = "./downloads";

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

async function listBuckets(): Promise<string[]> {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
        throw new Error(`❌ Failed to list buckets: ${error.message}`);
    }
    return data.map(bucket => bucket.name);
}

async function listAllFiles(bucket: string, path = ""): Promise<string[]> {
    const { data, error } = await supabase.storage.from(bucket).list(path, {
        limit: 1000,
        offset: 0,
        sortBy: { column: "name", order: "asc" }
    });

    if (error) {
        throw new Error(`❌ List error in bucket "${bucket}": ${error.message}`);
    }

    const files: string[] = [];

    for (const item of data!) {
        const fullPath = path ? `${path}/${item.name}` : item.name;
        if (item.metadata && item.metadata.size !== undefined) {
            // It's a file
            files.push(fullPath);
        } else {
            // It's a folder
            const nested = await listAllFiles(bucket, fullPath);
            files.push(...nested);
        }
    }

    return files;
}

async function downloadFile(bucket: string, path: string) {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) {
        throw new Error(`❌ Download error in "${bucket}/${path}": ${error.message}`);
    }

    const localPath = join(DOWNLOAD_DIR, bucket, path);
    const dir = dirname(localPath);

    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    const buffer = await data!.arrayBuffer();
    // eslint-disable-next-line node/prefer-global/buffer
    writeFileSync(localPath, Buffer.from(buffer));

    console.info(`✅ Downloaded: ${bucket}/${path}`);
}

async function run() {
    const buckets = await listBuckets();

    console.info(`📦 Found ${buckets.length} bucket(s):`, buckets.join(", "));

    for (const bucket of buckets) {
        console.info(`\n🔍 Scanning bucket: ${bucket}`);

        let files: string[];
        try {
            files = await listAllFiles(bucket);
        } catch (err) {
            console.error(`❌ Failed to list files in bucket "${bucket}":`, err);
            continue;
        }

        console.info(`📁 Found ${files.length} file(s) in "${bucket}"`);

        for (const file of files) {
            try {
                await downloadFile(bucket, file);
            } catch (err) {
                console.error(err);
            }
        }
    }

    console.info("\n🎉 All buckets processed.");
}

run().catch((err) => {
    console.error("❌ Unexpected error:", err);
});
