"use client";

import { Button } from "@arknights-vns/shadcn-ui/components/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@arknights-vns/shadcn-ui/components/select";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";

interface BottomDockProps {
  comicId: string;
  chapterList: {
    id: string;
    name: string;
  }[];
  chapterIndex: number;
}

export default function BottomDock(props: BottomDockProps) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  const { comicId, chapterIndex, chapterList } = props;

  const hasPrev = chapterIndex - 1 >= 0;
  const hasNext = chapterIndex + 1 < chapterList.length;

  // biome-ignore lint/style/noNonNullAssertion: hopefully bound-checked
  const currentChapter = chapterList[chapterIndex]!;

  const items = chapterList.map((x) => {
    return {
      label: x.name,
      value: x.id,
    };
  });

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.01) {
        setVisible(false);
      } else if (direction < 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{
          y: visible ? 0 : 100,
          opacity: visible ? 1 : 0,
        }}
        className={cn(
          "place-items-center-safe fixed inset-x-0 bottom-2 z-10 mx-auto flex max-w-fit gap-x-4 rounded-2xl border-2 bg-background p-3"
        )}
        initial={{
          opacity: 1,
          y: 100,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="flex gap-2">
          <Button
            className="border border-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:bg-muted data-[disabled=true]:opacity-50"
            disabled={!hasPrev}
            nativeButton={false}
            render={
              <Link data-disabled={!hasPrev} href={`/comic/${comicId}/${chapterList[chapterIndex - 1]?.id}`}>
                <ArrowLeft /> <span className="hidden md:inline">Chương trước</span>
              </Link>
            }
          />

          <Select defaultValue={currentChapter.id} items={items}>
            <SelectTrigger className="w-54">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chọn chương</SelectLabel>
                {chapterList.map((entry) => {
                  return (
                    <SelectItem
                      className="hover:cursor-pointer"
                      key={entry.id}
                      render={<Link href={`/comic/${comicId}/${entry.id}`}>{entry.name}</Link>}
                      value={entry.id}
                    />
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            className="border border-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:bg-muted data-[disabled=true]:opacity-50"
            nativeButton={false}
            render={
              <Link data-disabled={!hasNext} href={`/comic/${comicId}/${chapterList[chapterIndex + 1]?.id}`}>
                <span className="hidden md:inline">Chương sau</span> <ArrowRight />
              </Link>
            }
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
