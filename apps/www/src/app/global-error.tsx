"use client";

import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import We_Are_Sorry from "@public/we-are-sorry.jpg";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function GlobalError({
  error,
  // eslint-disable-next-line no-unused-vars
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="vi">
      <body>
        <div className="flex h-[90lvh] flex-col place-items-center-safe justify-evenly">
          <div />
          <div className="flex max-w-[90vw] flex-col place-items-center-safe gap-4">
            <Image alt="error image" className="max-w-[90vw]" src={We_Are_Sorry} width={520} />
            <Heading className="text-center text-primary" kind="h2">
              Well... đã có lỗi xảy ra, và tụi mình rất tiếc về điều đó.
            </Heading>
            <FavorText className="text-center">
              Lỗi này đã được ghi nhận, tụi mình sẽ <span className="italic">cố gắng</span> khắc phục trong
              thời gian sớm nhất!
            </FavorText>
          </div>
        </div>
      </body>
    </html>
  );
}
