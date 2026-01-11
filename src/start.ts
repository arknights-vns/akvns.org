import { createStart } from "@tanstack/react-start";

import { hardenSecurityMiddleware } from "@/middlewares/hardening";
import { tusMiddleware } from "@/middlewares/tus-sv-da-the";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [tusMiddleware, hardenSecurityMiddleware],
  };
});
