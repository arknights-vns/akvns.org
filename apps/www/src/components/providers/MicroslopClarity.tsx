import Script from "next/script";
import { serverEnv } from "@/env-var/server";

export default function MicroslopClarity() {
  return (
    <Script
      // @ts-expect-error Next.js being grumpy at times.
      // biome-ignore lint/security/noDangerouslySetInnerHtml: I know what I am doing
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${serverEnv.MICROSOFT_CLARITY_PROJECT_ID}");`,
      }}
      id="microslop-clarity"
      strategy="afterInteractive"
    />
  );
}
