import * as Sentry from "@sentry/nextjs";

import { clientEnv } from "@/env-var/client";

Sentry.init({
  dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.3,
  enableLogs: true,
  sendDefaultPii: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      showEmail: false,
      // emailLabel: "Email liên lạc",
      // emailPlaceholder: "tus.dep.trai@akvns.org",

      triggerLabel: "Feedback",
      formTitle: "Góp ý cho website",
      nameLabel: "Tên liên lạc",
      namePlaceholder: "Shou Huỳnh",
      messageLabel: "Nội dung",
      messagePlaceholder: "(Càng cụ thể càng tốt)",
      submitButtonLabel: "Gửi",
      cancelButtonLabel: "Mình đổi ý rồi",
      isRequiredLabel: "(bắt buộc)",
      addScreenshotButtonLabel: "Thêm ảnh minh họa",
      removeScreenshotButtonLabel: "Chắc không cần minh họa đâu",
      highlightText: "Tập trung",
      hideToolText: "Ẩn đi",
      removeHighlightText: "Xóa",
      successMessageText: "Cảm ơn bạn đã feedback!",

      showBranding: false,
      colorScheme: "dark",
      themeDark: {
        background: "#1c1917",
        accentBackground: "#ff2056",
      },
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
