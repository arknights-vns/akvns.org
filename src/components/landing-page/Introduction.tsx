import Amiya_Dreamchasers from "@public/Amiya_Dreamchasers.png";
import Image from "next/image";
import Link from "next/link";

import ContentArea from "@/components/ContentArea";
import { Heading, Paragraph } from "@/components/ui/extension/typography";

export default function Introduction() {
  return (
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
            <Link
              className="font-bold text-primary hover:underline"
              href="https://www.facebook.com/terrastationvn"
            >
              ~9.300 lượt theo dõi fanpage
            </Link>{" "}
            và{" "}
            <Link
              className="font-bold text-primary hover:underline"
              href="https://www.facebook.com/groups/1546174542442137"
            >
              ~35.000 thành viên nhóm
            </Link>{" "}
            , khẳng định vị trí của Arknights VNS trên bản đồ cộng đồng Arknights Việt Nam và quốc tế.
          </Paragraph>
          <Paragraph className="text-justify">
            Thông qua website này, tụi mình hy vọng bạn sẽ có đầy đủ thông tin về tầm nhìn, các đối tác, và
            cũng như những hoạt động đã và đang diễn ra của Arknights VNS.
          </Paragraph>
          <Paragraph className="text-justify font-light italic">From Team Dreamchasers with love!</Paragraph>
        </div>
        <div className="place-items-center-safe">
          <Image alt="amiyi" className="h-auto" loading="eager" src={Amiya_Dreamchasers} width={280} />
          <Paragraph className="text-center font-light text-muted-foreground italic">
            Mascot Amiya của Arknights VNS Offline 2025 "Dreamchasers"
          </Paragraph>
        </div>
      </div>
    </ContentArea>
  );
}
