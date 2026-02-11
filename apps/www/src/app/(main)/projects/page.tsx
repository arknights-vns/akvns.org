"use client";

import { Badge } from "@arknights-vns/shadcn-ui/components/badge";
import { Button } from "@arknights-vns/shadcn-ui/components/button";
import { Card, CardContent, CardHeader } from "@arknights-vns/shadcn-ui/components/card";
import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { ToggleGroup, ToggleGroupItem } from "@arknights-vns/shadcn-ui/components/toggle-group";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import projectsList from "@public/data/projects.json";
import { ExternalLink, Heart, Star, Users } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import ContentArea from "@/components/ContentArea";

type CategoryType = "akvns" | "community" | "crossover";

export default function ProjectPage() {
  const [selection, setSelection] = useQueryState("selection", parseAsArrayOf(parseAsString).withDefault([]));

  const selected: CategoryType[] =
    selection.length > 0 ? (selection as CategoryType[]) : ["akvns", "community", "crossover"];

  return (
    <ContentArea className="place-items-center-safe flex flex-col gap-4 text-center" id="projects">
      <Heading className="text-primary" kind="h1">
        Những dự án của Arknights VNS
      </Heading>
      <FavorText>Các dự án do Arknights VNS hoặc cộng đồng tổ chức</FavorText>
      <div className="sticky top-0 z-2 flex w-[90vw] justify-evenly bg-background p-2 md:w-[98vw]">
        <div />
        <div className="place-items-center-safe flex gap-2">
          <div className="hidden font-bold md:inline">Bộ lọc:</div>
          <ToggleGroup
            className="place-items-center-safe flex-wrap"
            multiple={true}
            onValueChange={(groupValue) => setSelection(groupValue)}
            size="lg"
            spacing={2}
            value={selection}
            variant="outline"
          >
            <ToggleGroupItem
              aria-label="Arknights VNS"
              className="grow data-pressed:border-primary data-pressed:bg-primary/30 data-pressed:*:[svg]:fill-yellow-500 data-pressed:*:[svg]:stroke-yellow-500"
              value="akvns"
            >
              <Star />
              Arknights VNS
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Community"
              className="grow data-pressed:border-primary data-pressed:bg-primary/30 data-pressed:*:[svg]:fill-red-500 data-pressed:*:[svg]:stroke-red-500"
              value="community"
            >
              <Heart />
              Cộng đồng
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Cross-Over"
              className="grow data-pressed:border-primary data-pressed:bg-primary/30 data-pressed:*:[svg]:fill-white data-pressed:*:[svg]:stroke-white"
              value="crossover"
            >
              <Users />
              Collab
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div />
      </div>

      <div className="grid w-[90vw] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {selected.map((category) =>
          projectsList[category].map((entry) => (
            <Card className="max-h-140 w-full pt-0" key={entry.name}>
              <CardHeader className="relative p-0">
                <Image
                  alt={entry.name}
                  className="h-75 bg-white object-cover"
                  height={280}
                  loading="eager"
                  src={entry.banner}
                  width={1080}
                />
                {entry.post !== null && (
                  <Button
                    className={cn(
                      "absolute top-3 right-3 bg-muted",
                      category === "akvns" && "border-primary hover:bg-primary",
                      category === "community" && "border-amber-400 hover:bg-amber-400",
                      category === "crossover" && "border-cyan-300 hover:bg-cyan-300"
                    )}
                    nativeButton={false}
                    render={
                      <Link href={entry.post as Route}>
                        <ExternalLink />
                      </Link>
                    }
                    size="icon"
                    title="Visit post"
                  />
                )}
                <Badge
                  className={cn(
                    "absolute bottom-3 left-3 bg-muted p-3",
                    category === "akvns" && "border-primary",
                    category === "community" && "border-amber-400",
                    category === "crossover" && "border-cyan-300"
                  )}
                >
                  {category === "akvns" && (
                    <>
                      <Star className="fill-yellow-500 stroke-yellow-500" /> Arknights VNS
                    </>
                  )}
                  {category === "community" && (
                    <>
                      <Heart className="fill-red-500 stroke-red-500" /> Community
                    </>
                  )}
                  {category === "crossover" && (
                    <>
                      <Users className="fill-white" /> Collaboration
                    </>
                  )}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-left font-bold text-lg">
                  <Link href={entry.post as Route}>{entry.name}</Link>
                </div>
                <div className="text-left text-gray-500">{entry.date}</div>
                <div className="text-justify text-muted-foreground leading-relaxed">{entry.content}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </ContentArea>
  );
}
