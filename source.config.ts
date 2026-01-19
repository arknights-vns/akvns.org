import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "resources/mdx/docs",
});

export default defineConfig({
  workspaces: {
    "vns-blog": {
      dir: ".",
      config: await import("./source-blog.config"),
    },
  },
});
