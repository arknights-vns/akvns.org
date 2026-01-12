import crewList from "@resources/data/crew.json";
import partnerList from "@resources/data/partner.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowDown } from "lucide-react";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import RevealText from "@/components/smoothui/reveal-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Timeline } from "@/components/ui/extension/timeline";
import { BlockQuote, FavorText, FootNote, Heading, Paragraph } from "@/components/ui/extension/typography";
import { cn } from "@/lib/utils";

import amiya from "/amiya.png?url";
import groupPic from "/group.jpg?url";

export const Route = createFileRoute("/(vns)/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="place-items-center-safe flex w-full flex-col overflow-x-hidden">
      <figure
        className="h-[85vh] w-full bg-[url(/hero.jpg)] bg-center bg-cover bg-muted bg-no-repeat bg-blend-overlay"
        id="hero"
      >
        <div className="place-items-center-safe flex size-full flex-col justify-between">
          <div />
          <div className="place-items-center-safe flex flex-col gap-4 text-center">
            <div className="text-xl">Xin chào mọi người, tụi mình là...</div>
            <RevealText
              className="text-center font-caveat text-6xl text-primary text-shadow-lg text-shadow-red-600/30 md:text-8xl"
              direction="up"
            >
              Arknights Vietnam Station
            </RevealText>
            <figcaption className="font-bold text-xl">
              Dù bạn có đang là <span className="text-cyan-400">Doctor</span> hay{" "}
              <span className="text-yellow-400">Endministrator</span>, chào mừng bạn đến với Arknights VNS!
            </figcaption>
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

      <ContentArea className="w-[80vw] text-center" id="intro">
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

      <ContentArea className="container space-y-8 text-center" id="partners">
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
                  <a className={cn(data.url === "#" && "pointer-events-none")} href={data.url}>
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
                  <a className={cn(entry.url === "#" && "pointer-events-none")} href={entry.url}>
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

      <ContentArea className="text-center" id="founders">
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

      <ContentArea id="timeline">
        <Heading className="text-primary" kind="h1">
          Timeline
        </Heading>
        <FavorText>Lịch sử hình thành và phát triển của Arknights VNS.</FavorText>
        <div className="size-full">
          <Timeline
            data={[
              {
                title: "2022",
                content: (
                  <div>
                    <Paragraph>
                      Từ một cuộc 'khởi nghĩa' với owner Lê Nguyễn Huy Hùng của Arknights VN Fanclub,
                      Arknights VNS được thành lập dưới sự dẫn dắt của sáu Founder đời đầu:{" "}
                      <span className="font-bold text-primary">Shou Huỳnh</span>,{" "}
                      <span className="font-bold text-primary">Sơn Trần</span>,{" "}
                      <span className="font-bold text-primary">Bùi Đạt</span>,{" "}
                      <span className="font-bold text-primary">Nguyễn Trang</span>,{" "}
                      <span className="font-bold text-primary">Kazaha Kamito</span> và{" "}
                      <span className="font-bold text-primary">Nguyễn Đức Dương</span>.
                    </Paragraph>
                    <Paragraph>
                      Thế nhưng, giai đoạn 'hậu chiến' của Arknights VNS không hề dễ dàng, bởi nhóm còn quá
                      non trẻ mà đã phải đối mặt với vô vàn khó khăn, trong đó có sự quấy nhiễu từ những thành
                      phần 'chiến thần' tràn sang từ Fanclub cũ.
                    </Paragraph>
                  </div>
                ),
              },
              {
                title: "2023",
                content: (
                  <div className="space-y-4">
                    <Paragraph>
                      Dưới sự dẫn dắt của Shou Huỳnh, Arknights VNS từng bước tiến lên bằng chiến lược phát
                      triển dung hòa những thế mạnh cốt lõi của cả hai nhóm tiền nhiệm bằng cách áp dụng triệt
                      để tôn chỉ <span className="font-bold text-primary">'tự do trong khuôn khổ'</span> của
                      mình. Shou đã kết hợp sự cởi mở, đa dạng nội dung vốn có của Fanclub với tính kỷ luật,
                      chặt chẽ đặc trưng của AKVN. Mọi hoạt động tại đây đều được vận hành dựa trên bộ nội quy
                      nghiêm ngặt để phù hợp với thực tiễn rằng: cộng đồng nên có một sân chơi tự do, nhưng
                      vẫn phải luôn có những điểm dừng nhất định.
                    </Paragraph>
                    <Paragraph>
                      Cũng trong thời gian này, Arknights VNS cũng đã có một{" "}
                      <a
                        className="font-bold text-primary underline"
                        href="https://www.facebook.com/groups/arknights.vietnam.station/posts/1876122536114001"
                      >
                        màn hợp tác đặc biệt
                      </a>{" "}
                      với{" "}
                      <a className="font-bold text-primary underline" href="https://www.facebook.com/Zeklewa">
                        Zeklewa
                      </a>{" "}
                      - một trong những họa sĩ người Việt Nam từng vinh dự{" "}
                      <a
                        className="font-bold text-primary underline"
                        href="https://www.facebook.com/terrastationvn/posts/pfbid04uXVteJXgCvXwEUtf3dh21ccY7oGoB2xEYZMrGDaWfx4gJi7pfUfM6qYZHNfWUi2l"
                      >
                        được Yostar đặt tranh (commission) cho Arknights
                      </a>{" "}
                      vào năm 2023.
                    </Paragraph>
                    <Image
                      alt="Zeklewa collab"
                      className="size-auto bg-white"
                      height={360}
                      layout="fullWidth"
                      src="zeklewa-collab.jpg"
                    />
                  </div>
                ),
              },
              {
                title: "2024",
                content: (
                  <div className="space-y-4">
                    <Paragraph>
                      Nhận thấy cộng đồng không có một buổi gặp mặt lớn nào đã lâu, Shou Huỳnh cùng các
                      Moderator và một vài partner trong Arknights VNS đã tổ chức một buổi offline lớn, dựa
                      theo mô hình mini-festival vào ngày 14/01/2024 tại Du Miên Garden Cafe (Gò Vấp, TP.HCM)
                      dưới cái tên <span className="font-bold text-primary">'The Show Must Go On!'</span>. Với
                      sự góp mặt của hơn 140 người tham dự, đây chính là bước đệm thành công lớn của Shou nói
                      riêng và Arknights VNS nói chung.
                    </Paragraph>
                    <Image
                      alt="VNS Offline 2024: The Show Must Go On"
                      className="size-auto bg-white"
                      height={360}
                      layout="fullWidth"
                      src="vns-offline-2024.jpg"
                    />
                    <Paragraph>
                      Và cũng trong khoảng thời gian này, Arknights VNS còn hỗ trợ cho thành viên trong nhóm
                      là{" "}
                      <a
                        className="font-bold text-primary underline"
                        href="https://www.facebook.com/tran.kyphong.54"
                      >
                        Satoh Nguyễn
                      </a>{" "}
                      có thể tổ chức thành công các mùa Arknights Cosplay Gathering.
                    </Paragraph>
                  </div>
                ),
              },
              {
                title: "2025",
                content: (
                  <div className="space-y-4">
                    <Paragraph>
                      Nối tiếp thành công của The Show Must Go On, vào 10/08/2025, Arknights VNS đã tổ chức sự
                      kiện <span className="font-bold text-primary">"Arknights VNS 2025: Dreamchasers"</span>,
                      với sự góp mặt của <span className="font-bold text-primary">hơn 150 người tham dự</span>
                      , quy trình tổ chức chuyên nghiệp và khắc phục gần như triệt để những hạn chế của mùa
                      đầu tiên, Dreamchasers được cộng đồng công nhận là sự kiện Offline thành công và ấn
                      tượng nhất trong lịch sử tính đến thời điểm hiện tại.
                    </Paragraph>
                    <Image
                      alt="VNS Offline 2025: Dreamchasers"
                      className="size-auto bg-white"
                      height={360}
                      layout="fullWidth"
                      src="vns-offline-2025.jpg"
                    />
                    <Paragraph>
                      Và cũng đánh dấu lần đầu tiên Arknights VNS phối hợp với{" "}
                      <a
                        className="font-bold text-orange-500 underline"
                        href="https://www.facebook.com/VNCommunityLeague"
                      >
                        Vietnam Community League
                      </a>{" "}
                      để tổ chức sự kiện cộng đồng.{" "}
                      <span className="text-muted-foreground/50">
                        Ừ thì có cả website cho Offline nữa nhưng chúng ta sẽ không nói về nó.
                      </span>
                    </Paragraph>
                  </div>
                ),
              },
              {
                title: "????",
                content: (
                  <div className="space-y-4">
                    <Paragraph className="font-light italic">Để chúng tôi nấu.</Paragraph>
                  </div>
                ),
              },
            ]}
          />
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

      <ContentArea className="w-[95vw] md:w-[80vw] lg:w-[75vw]" id="q-n-a">
        <Heading className="text-primary" kind="h1">
          {"Q & A"}
        </Heading>
        <Accordion multiple={true}>
          <AccordionItem>
            <AccordionTrigger>
              <Heading kind="h4">Website này không gắn quảng cáo thật à?</Heading>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground md:text-lg">
              <ul className="list-inside list-disc leading-relaxed">
                <li>Đúng, thật sự là không có quảng cáo nhé. Và cũng không hề check Adblocker gì luôn.</li>
                <li>
                  Vấn đề gắn quảng cáo là một vấn đề đã âm ỉ rất rất lâu trong suốt quá trình phát triển cái
                  website, từ việc Tú (Shou Huỳnh, Product Owner) muốn có một phần thu nhập để trang trải các
                  chi phí liên quan, tiêu biểu là host cái website này.
                </li>
                <li>
                  Và khi bắt tay vào làm cái web, thì mình lại muốn đặt trải nghiệm người dùng (UX) lên hàng
                  đầu. Quảng cáo đi ngược lại với điều đó, và mọi người biết kết quả rồi nhỉ :D
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>
              <Heading kind="h4">Nhưng nếu vậy thì nguồn thu của team đến từ đâu?</Heading>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground md:text-lg">
              <div>Tính đến hiện tại, tụi mình có 04 nguồn thu nhập chính</div>
              <ul className="list-inside list-disc leading-relaxed">
                <li>
                  <span className="font-bold">Cái nút "Donate" ở góc phải phía trên</span> - phần tiền này sẽ
                  vào Quỹ chung cho các sự kiện như Offline, Mini-Fest, kiểu thế.
                </li>
                <li>
                  Ở phần comment mỗi bài đăng Truyện trên Fanpage,{" "}
                  <a href="https://www.facebook.com/terrastationvn/posts/pfbid02J1ySbi8RawCkF34cotWNsoQkmj7PbDyE6MLxyKXyPELpq36PNXvDk56TZ1zozb4wl?comment_id=1232462605272258">
                    ví dụ như cái này đi
                  </a>
                  , thì sẽ vào Quỹ cho team dịch.
                </li>
                <li>Tiền mua vé Offline, quà các kiểu (áo, keychain, ...) từ người tham dự :D</li>
                <li>Đi làm {'<(")'}.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>
              <Heading kind="h4">Arknights VNS có đang tuyển thành viên không?</Heading>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground md:text-lg">
              <div>
                Tùy vào nội bộ của Arknights VNS mà tụi mình sẽ chia ra tuyển thành viên theo đợt, bạn có thể
                theo dõi{" "}
                <a className="font-bold text-[#1877f2]" href="https://www.facebook.com/terrastationvn">
                  Fanpage 'Trạm dừng chân chốn Terra'
                </a>{" "}
                để nắm bắt thông tin sớm nhất.
              </div>
              <div>
                Hoặc là, nếu tụi mình thấy bạn là một nhân tố tiềm năng của team, tụi mình sẽ liên lạc với bạn
                để trao đổi về việc <span className="font-bold">"tuyển thẳng"</span> luôn, cho nên đừng ngần
                ngại phô diễn tài năng, cheers!
              </div>
              <div>Hẹn gặp bạn trong Arknights VNS!</div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>
              <Heading kind="h4">Mình cần làm gì nếu muốn hợp tác với Arknights VNS?</Heading>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground md:text-lg">
              <div>Tùy vào nhu cầu của các bạn thì sẽ có vài option sau:</div>
              <ul className="list-inside list-disc leading-relaxed">
                <li>
                  Bạn có thể liên hệ qua{" "}
                  <a className="font-bold text-[#1877f2]" href="https://www.facebook.com/terrastationvn">
                    Fanpage 'Trạm dừng chân chốn Terra'
                  </a>{" "}
                  hoặc{" "}
                  <a className="font-bold text-[#1877f2]" href="https://www.facebook.com/shou.huynhf">
                    Facebook của Head Admin.
                  </a>
                </li>
                <li>
                  Bạn có thể liên hệ qua email{" "}
                  <a className="font-bold text-primary" href="mailto:arknightsvns@gmail.com">
                    arknightsvns@gmail.com
                  </a>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ContentArea>

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
    </div>
  );
}
