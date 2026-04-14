import { GoogleAnalytics } from "@next/third-parties/google";

import MicroslopClarity from "@/components/providers/MicroslopClarity";
import { serverEnv } from "@/env-var/server";

export default function Analytics() {
  return process.env.NODE_ENV === "development" ? (
    <></>
  ) : (
    <>
      <MicroslopClarity />
      <GoogleAnalytics gaId={serverEnv.GOOGLE_ANALYTICS_ID} />
    </>
  );
}
