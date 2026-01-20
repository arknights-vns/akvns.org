import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/fuma-source-blog";

export const { GET } = createFromSource(source, {});
