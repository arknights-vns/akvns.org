import type { ReactNode } from "react";
import { ConfigCatWebProvider } from "@openfeature/config-cat-web-provider";
import { OpenFeature, OpenFeatureProvider } from "@openfeature/react-sdk";

const configCatProvider = ConfigCatWebProvider.create(import.meta.env.VITE_CONFIG_CAT_API_KEY);

if (!OpenFeature.getProvider()) {
  // Instantiate and set our provider (be sure this only happens once)!
  // Note: there's no need to await its initialization, the React SDK handles re-rendering and suspense for you!
  OpenFeature.setProvider(configCatProvider);
}

export default function Providers({ children }: { children: ReactNode }) {
  return <OpenFeatureProvider>{children}</OpenFeatureProvider>;
}
