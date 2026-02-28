import { Badge } from "@arknights-vns/shadcn-ui/components/badge";
import { Button } from "@arknights-vns/shadcn-ui/components/button";
import { ButtonGroup } from "@arknights-vns/shadcn-ui/components/button-group";
import { FavorText, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { Field, FieldGroup, FieldLabel } from "@arknights-vns/shadcn-ui/components/field";
import { Input } from "@arknights-vns/shadcn-ui/components/input";
import { ScrollArea } from "@arknights-vns/shadcn-ui/components/scroll-area";
import { Skeleton } from "@arknights-vns/shadcn-ui/components/skeleton";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import type { Metadata, Route } from "next";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";
import ContentArea from "@/components/ContentArea";
import { fetchComicListByPage } from "@/functions/comic/fetch-comic-list";

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(15),
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

export const metadata: Metadata = {
  title: "Arknights VNS | Truyện tại Trạm",
  description:
    "Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.",
};

export default async function ComicListing(props: PageProps<"/comic">) {
  const searchRaw = await props.searchParams;
  const { search, page, pageSize: _size } = loadSearchParams(searchRaw);

  const content = await fetchComicListByPage(search, page);

  return (
    <ContentArea className="flex flex-col gap-4 pt-0!">
      <div className="space-y-4 text-center">
        <Heading className="text-primary" kind="h1">
          Truyện tại Trạm
        </Heading>
        <FavorText>
          Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.
        </FavorText>
      </div>

      <Form action="/comic" replace={true}>
        <FieldGroup>
          <Field className="max-w-md self-center">
            <FieldLabel htmlFor="comic-search">
              Tìm kiếm{" "}
              <Badge className="ml-auto" variant="secondary">
                Thử nghiệm
              </Badge>
            </FieldLabel>
            <ButtonGroup>
              <Input id="comic-search" name="search" placeholder="Type to search..." />
              <Button type="submit" variant="outline">
                Search
              </Button>
            </ButtonGroup>
          </Field>
        </FieldGroup>
      </Form>

      {search !== "" && <div className="self-center font-bold">Kết quả tìm kiếm cho: {search}</div>}
      {content.message.length > 0 ? (
        <ScrollArea className="h-[95dvh] w-full">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {content.message.map((entry) => {
                return (
                  <div className="place-items-center-safe flex flex-col gap-2" key={entry.series_id}>
                    {entry.thumbnail === null ? (
                      <Skeleton className="h-72 w-48" />
                    ) : (
                      <Image
                        alt={entry.series_id}
                        className="h-68 w-48 bg-foreground object-cover"
                        height={272}
                        priority={true}
                        src={entry.thumbnail}
                        width={192}
                      />
                    )}
                    <Badge
                      className={cn(
                        "border bg-background p-3 font-bold",
                        entry.category === "Arknights_VNS" && "border-primary",
                        entry.category === "Partner" && "border-400",
                        entry.category === "Collaboration" && "border-black",
                        entry.category === "Community" && "border-gray-600"
                      )}
                    >
                      {
                        {
                          Arknights_VNS: "@terrastationvn",
                          Partner: "Partner",
                          Collaboration: "Collab",
                          Community: "Community",
                        }[entry.category]
                      }
                    </Badge>
                    <Link
                      className="text-center font-bold text-lg text-primary hover:underline"
                      href={`/comic/${entry.series_id}` as Route}
                    >
                      {entry.title}
                    </Link>
                    <div>
                      <span className="font-bold">Tác giả</span>: {entry.author}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center text-muted-foreground">*Có vẻ như là... không có gì hết?*</div>
      )}
    </ContentArea>
  );
}
