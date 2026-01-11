import projectsList from "@resources/data/projects.json";
import { createFileRoute } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ExternalLink, Heart, Star, Users } from "lucide-react";
import { useState } from "react";

import ContentArea from "@/components/ContentArea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FavorText, Heading } from "@/components/ui/extension/typography";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(vns)/projects")({
  component: RouteComponent,
});

type CategoryType = "event" | "fan-project" | "cross";

function RouteComponent() {
  const [filter, setFilter] = useState<CategoryType[]>([]);

  const selected: CategoryType[] = filter.length > 0 ? filter : ["event", "fan-project", "cross"];

  return (
    <ContentArea className="flex flex-col gap-4 text-center" id="projects">
      <Heading className="text-primary" kind="h1">
        Những dự án của Arknights VNS
      </Heading>
      <FavorText>Các dự án do Arknights VNS hoặc cộng đồng tổ chức</FavorText>
      <div className="sticky top-18 z-2 flex w-full justify-evenly bg-background p-2">
        <div />
        <div className="place-items-center-safe flex gap-2">
          <div className="hidden font-bold md:inline">Bộ lọc:</div>
          <ToggleGroup
            className="place-items-center-safe"
            multiple={true}
            onValueChange={setFilter}
            size="lg"
            spacing={2}
            value={filter}
            variant="outline"
          >
            <ToggleGroupItem
              aria-label="Arknights VNS"
              className="data-pressed:border-primary data-pressed:bg-primary/30 data-pressed:*:[svg]:fill-yellow-500 data-pressed:*:[svg]:stroke-yellow-500"
              value="event"
            >
              <Star />
              Arknights VNS
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Community"
              className="data-pressed:border-primary data-pressed:bg-primary/30 data-pressed:*:[svg]:fill-red-500 data-pressed:*:[svg]:stroke-red-500"
              value="fan-project"
            >
              <Heart />
              Cộng đồng
            </ToggleGroupItem>
            <ToggleGroupItem
              aria-label="Collaboration"
              className="data-pressed:border-primary data-pressed:bg-primary/30 data-pressed:*:[svg]:fill-white data-pressed:*:[svg]:stroke-white"
              value="cross"
            >
              <Users />
              Collab
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div />
      </div>

      <div className="mx-4 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {selected.map((category) =>
          projectsList[category].map((entry) => (
            <Card className="max-h-140 pt-0" key={entry.name}>
              <CardHeader className="relative p-0">
                <Image
                  alt={entry.name}
                  className="h-75 bg-white object-cover"
                  height={280}
                  layout="constrained"
                  src={entry.banner ?? "null"}
                  width={1080}
                />
                {entry.post !== null && (
                  <Button
                    className={cn(
                      "absolute top-3 right-3 bg-muted",
                      category === "event" && "border-primary hover:bg-primary",
                      category === "fan-project" && "border-amber-400 hover:bg-amber-400",
                      category === "cross" && "border-cyan-300 hover:bg-cyan-300"
                    )}
                    nativeButton={false}
                    render={
                      <a href={entry.post}>
                        <ExternalLink />
                      </a>
                    }
                    size="icon"
                    title="Visit post"
                  />
                )}
                <Badge
                  className={cn(
                    "absolute bottom-3 left-3 bg-muted p-3",
                    category === "event" && "border-primary",
                    category === "fan-project" && "border-amber-400",
                    category === "cross" && "border-cyan-300"
                  )}
                >
                  {category === "event" && (
                    <>
                      <Star className="fill-yellow-500 stroke-yellow-500" /> Arknights VNS
                    </>
                  )}
                  {category === "fan-project" && (
                    <>
                      <Heart className="fill-red-500 stroke-red-500" /> Community
                    </>
                  )}
                  {category === "cross" && (
                    <>
                      <Users className="fill-white" /> Collaboration
                    </>
                  )}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-left font-bold text-lg">{entry.name}</div>
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
