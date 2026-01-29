import { serverEnv } from "@arknights-vns/env-var/server";
import { createOpenFeatureAdapter } from "@flags-sdk/openfeature";
import { ConfigCatProvider } from "@openfeature/config-cat-provider";
import { OpenFeature } from "@openfeature/server-sdk";

export const openFeatureAdapter = createOpenFeatureAdapter(async () => {
  const provider = ConfigCatProvider.create(serverEnv.CONFIGCAT_API_KEY);
  await OpenFeature.setProviderAndWait(provider);
  return OpenFeature.getClient();
});
