import { createOpenFeatureAdapter } from "@flags-sdk/openfeature";
import { ConfigCatProvider } from "@openfeature/config-cat-provider";
import { OpenFeature } from "@openfeature/server-sdk";

import { serverEnv } from "@/env/server";

export const openFeatureAdapter = createOpenFeatureAdapter(async () => {
  const provider = ConfigCatProvider.create(serverEnv.CONFIGCAT_API_KEY);
  await OpenFeature.setProviderAndWait(provider);
  return OpenFeature.getClient();
});
