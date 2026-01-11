import { createMiddleware } from "@tanstack/react-start";
import { getResponseHeaders, setResponseHeaders } from "@tanstack/react-start/server";

export const hardenSecurityMiddleware = createMiddleware().server(({ next }) => {
  const headers = getResponseHeaders();
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https://*.akvns.org;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    worker-src 'self' blob:;
    connect-src 'self' https://*.configcat.com;
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

  // https://nextjs.org/docs/app/guides/content-security-policy#without-nonces
  headers.set("Content-Security-Policy", cspHeader.replace(/\n/g, ""));

  // I love consulting MDN every 5 seconds.
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()");

  setResponseHeaders(headers);

  return next();
});
