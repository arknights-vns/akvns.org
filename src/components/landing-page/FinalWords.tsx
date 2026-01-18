import Image from "next/image";
import Link from "next/link";

import groupPic from "@/app/opengraph-image.jpg";
import ContentArea from "@/components/ContentArea";
import { BlockQuote, FavorText, FootNote, Heading, Paragraph } from "@/components/ui/extension/typography";

export default function FinalWords() {
  return (
    <ContentArea className="place-items-center-safe text-center" id="footnote">
      <Heading className="text-primary" kind="h1">
        Lời kết
      </Heading>
      <FavorText className="text-center">
        Cảm ơn các bạn, và cả cộng đồng game Arknights Việt Nam nói chung, vì đã đồng hành cùng tụi mình trong
        suốt 4 năm qua.
      </FavorText>
      <Paragraph className="font-bold">We love you, moah moah! </Paragraph>
      <div className="relative">
        <Image
          alt="Group Picture"
          className="h-auto rounded-2xl shadow-xl"
          src={groupPic}
          title="For everyone, thank you for join the 2025 Offline!"
          width={720}
        />
        <div
          className="absolute top-[40%] left-[8%] size-12 bg-transparent"
          title="yes, this is Dreamchasers banner"
        />
        <Link
          className="absolute top-[31%] left-[34%] size-8 bg-transparent"
          href="https://www.youtube.com/watch?v=iSaxrvtwCfo"
          title="what the..."
        >
          <div className="sr-only">Misty Memories.</div>
        </Link>
        <div
          className="absolute top-[36%] left-[82%] size-14 bg-transparent"
          title="Kamito and Aririn was here"
        />
      </div>
      <BlockQuote className="text-left text-foreground">
        <Paragraph>"Every artist paints with a fiery soul</Paragraph>
        <Paragraph>Every poet weaves words into prayers</Paragraph>
        <Paragraph>Every dream has its own chasers.</Paragraph>
        <Paragraph>
          And we, the <span className="font-bold text-primary">Dreamchasers</span>, will be the ones to carve
          it from hope.”
        </Paragraph>
        <FootNote className="mt-5 text-right font-bold text-foreground!">
          Shou Huỳnh - Head Admin @ Arknights Vietnam Station
        </FootNote>
      </BlockQuote>
    </ContentArea>
  );
}
