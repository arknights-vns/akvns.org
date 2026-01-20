import { RootProvider } from "fumadocs-ui/provider/next";
import "katex/dist/katex.css";

export default function FumadocsLayout(props: LayoutProps<"/">) {
  return (
    <RootProvider
      search={{
        options: {
          api: "/api/fuma-search",
          delayMs: 2000,
        },
      }}
    >
      {props.children}
    </RootProvider>
  );
}
