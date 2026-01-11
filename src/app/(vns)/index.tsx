import { SiDiscord } from "@icons-pack/react-simple-icons";
import crewList from "@resources/data/crew.json";
import partnerList from "@resources/data/partner.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowDown } from "lucide-react";
import Typewriter from "typewriter-effect";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import RevealText from "@/components/smoothui/reveal-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { BlockQuote, FavorText, FootNote, Heading, Paragraph } from "@/components/ui/extension/typography";

import amiya from "/amiya.png?url";
import groupPic from "/group.jpg?url";

export const Route = createFileRoute("/(vns)/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="place-items-center-safe flex w-full flex-col">
      <figure
        className="h-[85vh] w-full bg-[url(/hero.jpg)] bg-center bg-cover bg-muted bg-no-repeat bg-blend-overlay"
        id="hero"
      >
        <div className="place-items-center-safe flex size-full flex-col justify-between">
          <div />
          <div className="place-items-center-safe flex flex-col gap-8">
            <div className="text-xl">Xin chào mọi người, tụi mình là...</div>
            <RevealText
              className="text-center font-caveat text-8xl text-primary text-shadow-lg text-shadow-red-600/30"
              direction="up"
            >
              Arknights Vietnam Station
            </RevealText>
            <div className="text-center font-bold font-inter text-lg">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "For the <span style='color: oklch(74.6% 0.16 232.661)'>Doctors</span>, by the <span style='color: oklch(74.6% 0.16 232.661)'>Doctors</span>."
                    )
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(
                      "For the <span style='color: yellow'>Endministrators</span>, by the <span style='color: yellow'>Endministrators</span>."
                    )
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(
                      "For the <span style='color: lab(63.7053% 60.7449 31.3109)'>Dreamchasers</span>, by the <span style='color: lab(63.7053% 60.7449 31.3109)'>Dreamchasers</span>."
                    )
                    .pause()
                    .start();
                }}
                options={{
                  autoStart: true,
                  delay: 0.05 * 1000,
                  deleteSpeed: 100,
                }}
              />
            </div>
            <Badge className="self-center border-primary bg-neutral-700 p-4 font-inter text-[1rem]">
              (est. 2022)
            </Badge>
          </div>
          <div className="place-items-center-safe grid w-[98svw] grid-cols-3">
            <div className="relative -z-2 text-center text-primary">
              <span className="hidden md:inline">Wrong place to look for egg!</span>
            </div>
            <div className="place-items-center-safe my-4 flex gap-1 rounded-full border bg-secondary px-4 py-2">
              <ArrowDown size={24} />
              <span className="hidden md:block">Lướt xuống để xem thêm</span>
            </div>
            <div className="relative -z-2 text-center text-primary">
              <span className="hidden md:inline">L2Etd29ybGQteWV0LXRvLWtub3du</span>
            </div>
          </div>
        </div>
      </figure>

      <ContentArea className="w-[80vw] text-center" id="briefing">
        <Heading className="text-primary" kind="h1">
          Giới thiệu
        </Heading>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="text-lg">
            <Paragraph className="text-justify">
              Được thành lập vào năm <span className="font-bold text-primary">2022</span>, Arknights Vietnam
              Station (gọi tắt là <span className="font-bold text-primary">Arknights VNS</span>) là một nhóm
              hoạt động phi lợi nhuận được tạo ra với sứ mệnh gắn kết cộng đồng người chơi Arknights toàn Việt
              Nam.
            </Paragraph>
            <Paragraph className="text-justify">
              Tính đến tháng 12/2025, Arknights VNS đã có cho mình{" "}
              <a
                className="font-bold text-primary hover:underline"
                href="https://www.facebook.com/terrastationvn"
              >
                ~9.300 lượt theo dõi fanpage
              </a>{" "}
              và{" "}
              <a
                className="font-bold text-primary hover:underline"
                href="https://www.facebook.com/groups/1546174542442137"
              >
                ~35.000 thành viên nhóm
              </a>{" "}
              , khẳng định vị trí của Arknights VNS trên bản đồ cộng đồng Arknights Việt Nam và quốc tế.
            </Paragraph>
            <Paragraph className="text-justify">
              Thông qua website này, tụi mình hy vọng bạn sẽ có đầy đủ thông tin về tầm nhìn, các đối tác, và
              cũng như những hoạt động đã và đang diễn ra của Arknights VNS.
            </Paragraph>
            <Paragraph className="text-justify font-light italic">
              From Team Dreamchasers with love!
            </Paragraph>
          </div>
          <div className="place-items-center-safe">
            <Image alt="amiyi" height={460} src={amiya} width={280} />
            <Paragraph className="text-center font-light text-muted-foreground italic">
              Mascot Amiya của Arknights VNS Offline 2025 "Dreamchasers"
            </Paragraph>
          </div>
        </div>
      </ContentArea>

      <ContentArea className="space-y-8 text-center" id="sponsors">
        <Heading className="text-primary" kind="h1">
          Các đối tác của Arknights VNS
        </Heading>
        <Heading kind="h2">Fanpage</Heading>
        <Carousel
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="place-items-center-safe w-sm md:w-full">
            {partnerList
              .filter((data) => data.type === "fanpage")
              .map((data) => (
                <CarouselItem
                  className="place-items-center-safe flex basis-1/2 flex-col justify-between gap-2 md:basis-1/4 lg:basis-1/5"
                  key={data.title}
                >
                  <a href={data.url}>
                    <Image
                      alt={data.title}
                      className="size-37.5 rounded-full border-2"
                      height={150}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      src={data.image}
                      width={150}
                    />
                  </a>
                  <FootNote className="font-bold text-lg">{data.title}</FootNote>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
        <Heading kind="h2">Artist</Heading>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {partnerList
            .filter((data) => data.type === "artist")
            .map((entry) => {
              return (
                <div className="place-items-center-safe flex flex-col gap-2" key={entry.title}>
                  <a href={entry.url}>
                    <Image
                      alt={entry.title}
                      className="size-37.5 rounded-full border-2"
                      height={150}
                      loading="eager"
                      referrerPolicy="no-referrer"
                      src={entry.image}
                      width={150}
                    />
                  </a>
                  <FootNote className="font-bold text-lg">{entry.title}</FootNote>
                </div>
              );
            })}
        </div>
      </ContentArea>

      <ContentArea className="text-center" id="leaders">
        <Heading className="text-primary" kind="h1">
          Founder
        </Heading>
        <FavorText>Những người đã đặt nền móng phát triển Arknights VNS</FavorText>
        <div className="place-items-center-safe grid grid-cols-1 gap-8 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {crewList
            .filter((entry) => entry.categories.includes("founder"))
            .map((member) => (
              <MemberCard
                avatar={member.avatar || ""}
                key={member.name}
                links={member.links || {}}
                name={member.name}
                quote={member.quote || ""}
                role={member.roles.founder || ""}
              />
            ))}
        </div>
      </ContentArea>

      {/*<ContentArea id="testimony">*/}
      {/*    <Heading className="text-center text-primary" kind="h1">*/}
      {/*        Mọi người nghĩ gì về mình?*/}
      {/*    </Heading>*/}
      {/*    <FavorText className="text-center">*/}
      {/*        Overwhelming Negative Reviews:*/}
      {/*    </FavorText>*/}
      {/*    <article className="place-items-center-safe m-8 grid grid-cols-1 gap-12 md:grid-cols-2">*/}
      {/*        {testimonyData.map((c) => (*/}
      {/*            <Card className="w-full shadow-md" key={c.id}>*/}
      {/*                <CardHeader className="flex flex-col">*/}
      {/*                    <div className="flex gap-4">*/}
      {/*                        <Avatar className="size-12 border shadow-sm">*/}
      {/*                            /!* FIXME: actual avatars soon. *!/*/}
      {/*                            /!*<AvatarImage src="/VNS_Icon.svg" alt={`${c.name}-avatar`} />*!/*/}
      {/*                            <AvatarFallback>VNS</AvatarFallback>*/}
      {/*                        </Avatar>*/}
      {/*                        <div className="flex flex-col self-center">*/}
      {/*                            <CardTitle className="font-bold text-primary text-xl">*/}
      {/*                                {c.name}*/}
      {/*                            </CardTitle>*/}
      {/*                            <CardDescription>*/}
      {/*                                {c.info}*/}
      {/*                            </CardDescription>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                </CardHeader>*/}
      {/*                <CardContent className="text-justify leading-relaxed">*/}
      {/*                    <span className="font-bold text-primary">*/}
      {/*                        "*/}
      {/*                    </span>*/}
      {/*                    {c.description}*/}
      {/*                    <span className="font-bold text-primary">*/}
      {/*                        "*/}
      {/*                    </span>*/}
      {/*                </CardContent>*/}
      {/*            </Card>*/}
      {/*        ))}*/}
      {/*    </article>*/}
      {/*</ContentArea>*/}

      {/*<ContentArea id="faq" className="w-[80vw]">*/}
      {/*    <Heading kind="h1" className="text-primary">*/}
      {/*        Câu hỏi thường gặp*/}
      {/*    </Heading>*/}
      {/*    <Accordion multiple={true} defaultValue={[]}>*/}
      {/*        {faqsData.map((faq, id) => (*/}
      {/*            <AccordionItem value={`item-${id}`} key={faq.question}>*/}
      {/*                <AccordionTrigger>*/}
      {/*                    <Heading kind="h4">{faq.question}</Heading>*/}
      {/*                </AccordionTrigger>*/}
      {/*                <AccordionContent>*/}
      {/*                    {faq.answer.map((ans) => (*/}
      {/*                        <Paragraph*/}
      {/*                            className="ml-6 text-lg"*/}
      {/*                            key={ans}*/}
      {/*                        >*/}
      {/*                            {ans}*/}
      {/*                        </Paragraph>*/}
      {/*                    ))}*/}
      {/*                </AccordionContent>*/}
      {/*            </AccordionItem>*/}
      {/*        ))}*/}
      {/*    </Accordion>*/}
      {/*</ContentArea>*/}

      <ContentArea className="place-items-center-safe text-center" id="footnote">
        <Heading className="text-primary" kind="h1">
          Lời kết
        </Heading>
        <FavorText className="text-center">
          Cảm ơn bạn, và cả cộng đồng game Arknights, vì đã đồng hành cùng chúng mình trong suốt 5 năm qua.
        </FavorText>
        <Paragraph className="font-bold">Hẹn gặp lại các bạn vào một ngày không xa! </Paragraph>
        <div className="relative">
          <Image
            alt="Group Picture"
            className="h-auto rounded-2xl shadow-xl"
            height={620}
            src={groupPic}
            width={720}
          />
          {/* https://stackoverflow.com/a/53597608 */}
          <div title="yes, this is Dreamchasers banner">
            <div className="absolute top-[40%] left-[8%] size-12 bg-transparent" />
          </div>
          <a href="https://www.youtube.com/watch?v=iSaxrvtwCfo">
            <div className="absolute top-[31%] left-[34%] size-8 bg-transparent" />
          </a>
          <div title="hint: the path will eventually lights in the dark">
            <div className="absolute top-[25%] left-[28%] size-8 bg-transparent" />
          </div>
          <Link to="/station-comm-1">
            <div className="absolute top-[57%] left-[42%] size-10 bg-transparent" />
          </Link>
          <div title="Kamito was here">
            <div className="absolute top-[36%] left-[82%] size-14 bg-transparent" />
          </div>
        </div>
        <BlockQuote className="text-left text-foreground">
          <Paragraph>"Every artist paints with a fiery soul</Paragraph>
          <Paragraph>Every poet weaves words into prayers</Paragraph>
          <Paragraph>Every dream has its own chasers.</Paragraph>
          <Paragraph>
            And we, the <span className="font-bold text-primary">Dreamchasers</span>, will be the ones to
            carve it from hope.”
          </Paragraph>
          <FootNote className="mt-5 text-right font-bold text-foreground!">
            Shou Huỳnh - Head Admin @ Arknights Vietnam Station
          </FootNote>
        </BlockQuote>
      </ContentArea>

      <ContentArea className="place-items-center-safe text-center" id="chat-with-us">
        <Heading className="text-primary" kind="h1">
          Wanna chat?
        </Heading>
        <FavorText className="text-center">
          Team VNS có cả Discord để các bạn giao lưu với nhau, cũng như xem Behind-the-scenes các kiểu :D
        </FavorText>
        <div className="place-items-center-safe flex flex-col gap-5 md:flex-row">
          <Button
            className="bg-[#5865F2] hover:bg-[#3D4CF0]"
            nativeButton={false}
            render={
              <a href="https://discord.gg/arknights-vns">
                <SiDiscord />
                Arknights VNS
              </a>
            }
          />
          <Button
            className="bg-[#5865F2] hover:bg-[#3D4CF0]"
            nativeButton={false}
            render={
              <a href="https://discord.gg/wgETr8d4FR">
                <SiDiscord />
                Phoenix Frontiers
              </a>
            }
          />
        </div>
        <Paragraph>
          Nếu bạn muốn liên hệ qua email thì hãy liên hệ qua email{" "}
          <a
            className="font-bold underline decoration-dashed underline-offset-2"
            href="mailto:contact@akvns.org"
          >
            contact@akvns.org
          </a>
          , tụi mình sẽ liên lạc lại sau 2-3 ngày làm việc nhé!
        </Paragraph>
      </ContentArea>
    </div>
  );
}
