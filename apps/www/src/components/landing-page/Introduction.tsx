import { Heading, Paragraph } from "@arknights-vns/shadcn-ui/components/extension/typography";
import Amiya_Dreamchasers from "@public/Amiya_Dreamchasers.png";
import Image from "next/image";
import Link from "next/link";
import ContentArea from "@/components/ContentArea";

export default function Introduction() {
  return (
    <ContentArea className="w-[80vw] text-center" id="intro">
      <Heading className="text-primary" kind="h1">
        Giới thiệu
      </Heading>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="text-lg">
          <Paragraph className="text-justify">
            Được thành lập vào năm <span className="font-bold text-primary">26/01/2022</span>, Arknights
            Vietnam Station (gọi tắt là <span className="font-bold text-primary">Arknights VNS</span>) hoạt
            động với tư cách là một tổ chức cộng đồng phi lợi nhuận, mang sứ mệnh kết nối và phát triển cộng
            đồng người chơi Arknights tại Việt Nam.
          </Paragraph>
          <Paragraph className="text-justify">
            Trải qua hơn 4 năm phát triển, tính đến tháng 12/2025, Arknights VNS đã có cho mình{" "}
            <Link
              className="font-bold text-primary hover:underline"
              href="https://www.facebook.com/terrastationvn"
            >
              ~9.500 lượt theo dõi fanpage
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
            Thông qua website này, Arknights VNS hy vọng các bạn có thể khám phá những dự án tâm huyết và
            những giá trị mà chúng mình đang nỗ lực xây dựng mỗi ngày, nhằm cung cấp cái nhìn toàn diện nhất
            về tầm nhìn, mạng lưới đối tác, cũng như những thành tựu và chuỗi hoạt động sôi nổi mà chúng mình
            đã và đang thực hiện.
          </Paragraph>
          <Paragraph className="text-justify font-light italic">From Team Dreamchasers with love!</Paragraph>
        </div>
        <figure className="place-items-center-safe">
          <Image alt="amiyi" className="h-auto" loading="eager" src={Amiya_Dreamchasers} width={280} />
          <figcaption className="text-center font-light text-muted-foreground italic">
            Mascot Amiya của Arknights VNS Offline 2025 "Dreamchasers"
          </figcaption>
        </figure>
      </div>
    </ContentArea>
  );
}
