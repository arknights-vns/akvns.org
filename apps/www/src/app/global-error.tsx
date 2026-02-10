"use client";

import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import We_Are_Sorry from "@public/we-are-sorry.jpg";
import { captureException } from "@sentry/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function SiteError({
  error,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: required by Next.js?
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <div className="place-items-center-safe flex h-[90lvh] flex-col justify-evenly">
      <div />
      <div className="place-items-center-safe flex max-w-[90vw] flex-col gap-4">
        <Image alt="error image" className="max-w-[90vw]" src={We_Are_Sorry} width={520} />
        <Heading className="text-center text-primary" kind="h2">
          Well... đã có lỗi xảy ra, và tụi mình rât tiếc về điều đó.
        </Heading>
        <FavorText className="text-center">
          Lỗi này đã được ghi nhận, tụi mình sẽ <span className="italic">cố gắng</span> khắc phục trong thời
          gian sớm nhất!
        </FavorText>
      </div>
    </div>
  );
}
