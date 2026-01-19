import { loader, multiple } from "fumadocs-core/source";

import { docs as VnsWorkspace } from "fumadocs-mdx:collections/vns-blog/server";

export const source = loader(
  multiple({
    "vns-blog": VnsWorkspace.toFumadocsSource(),
  }),
  {
    baseUrl: "/blog",
  }
);
