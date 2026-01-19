import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const docs = defineDocs({
  dir: "resources/mdx/blog",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
