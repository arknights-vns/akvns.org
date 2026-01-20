import { docs as VnsWorkspace } from "collections/vns-blog/server";
import { loader, multiple } from "fumadocs-core/source";

export const source = loader(
  multiple({
    "vns-blog": VnsWorkspace.toFumadocsSource(),
  }),
  {
    baseUrl: "/blog",
  }
);
