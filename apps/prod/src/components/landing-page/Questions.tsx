import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@arknights-vns/ui/components/accordion";
import { Heading, Paragraph } from "@arknights-vns/ui/components/extension/typography";
import VNS_Donate_Example from "@public/VNS_Donate_Example.jpg";
import Image from "next/image";
import Link from "next/link";
import ContentArea from "@/components/ContentArea";

export default function QuestionsForUs() {
  return (
    <ContentArea className="w-[95vw] md:w-[80vw] lg:w-[75vw]" id="q-n-a">
      <Heading className="text-primary" kind="h1">
        {"Q & A"}
      </Heading>
      <Accordion multiple={true}>
        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">Arknights Vietnam Station là gì?</Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <Paragraph>
              Arknights Vietnam Station [Arknights VNS] là cộng đồng dành cho người chơi tựa game Arknights và
              các sản phẩm liên quan (IP) thuộc công ty Hypergryph. Mọi hoạt động của nhóm đều dựa trên tinh
              thần phi lợi nhuận và vì sự phát triển bền vững của cộng đồng Arknights tại Việt Nam.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">Mối quan hệ giữa chúng tôi với Hypergryph & Yostar là gì?</Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <Paragraph>
              Chúng tôi là một cộng đồng người chơi hoạt động độc lập. Chúng tôi không có bất kỳ mối quan hệ
              pháp lý ràng buộc hay trực thuộc nào đối với Hypergryph (Nhà phát triển) và Yostar (Nhà phát
              hành)
              <Link className="no-underline!" href="https://www.youtube.com/watch?v=ECZVU4x6Xq0&t=97s">
                .
              </Link>
            </Paragraph>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">Website có gắn quảng cáo không?</Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <Paragraph>
              Không. Website này hoàn toàn không gắn quảng cáo và cũng không cài đặt bất kỳ mã theo dõi chặn
              quảng cáo (block AdBlocker) nào.
            </Paragraph>
            <Paragraph>
              Thực lòng mà nói, đây là một sự đấu tranh tư tưởng rất dài của đội ngũ phát triển, đặc biệt là
              Shou Huỳnh (Product Owner). Dù việc có thêm thu nhập để chi trả phí duy trì Server/Hosting là
              rất hấp dẫn, nhưng sau cùng, chúng tôi quyết định đặt Trải nghiệm người dùng (UX) lên hàng đầu.
              Quảng cáo thường đi ngược lại với sự mượt mà đó, và chúng tôi chọn sự thoải mái của các bạn thay
              vì doanh thu.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">Không có quảng cáo, vậy nguồn thu đến từ đâu để duy trì?</Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <ul className="list-inside list-disc leading-relaxed">
              <li>
                <span className="font-bold text-primary">Cái nút "Donate" ở góc phải phía trên</span> - Toàn
                bộ số tiền này sẽ được chuyển thẳng vào Quỹ chung để tổ chức các sự kiện lớn như
                Mini-Festival.
              </li>
              <li>
                <span className="font-bold text-primary">Donate qua Fanpage</span> - Các khoản ủng hộ tại phần
                bình luận (comment) của các bài đăng truyện tranh sẽ được chuyển vào Quỹ Team Dịch, sẽ dùng
                cho các việc như mua raw để dịch.
                <figure className="my-4 flex flex-col items-center justify-center">
                  <Image
                    alt="VNS_Donate_Example"
                    className="object-center"
                    src={VNS_Donate_Example}
                    width={480}
                  />
                  <figcaption className="text-muted-foreground">Nó sẽ giống giống thế này.</figcaption>
                </figure>
              </li>
              <li>
                <span className="font-bold">"Lấy lương nuôi đam mê"</span> - Nguồn tài trợ lớn nhất chính là
                từ... tiền túi và công việc chính (day job) của các thành viên trong Ban quản trị. {'<(")'}.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">Arknights VNS có đang tuyển thành viên không?</Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <Paragraph>Có 02 cách để bạn gia nhập đội ngũ của chúng tôi:</Paragraph>
            <ul className="list-inside list-disc">
              <li>
                <span className="font-bold text-primary">Tuyển theo đợt</span>: Chúng tôi sẽ mở đơn tuyển dụng
                công khai tùy theo nhu cầu nhân sự. Hãy theo dõi Fanpage{" "}
                <Link className="font-bold text-[#1877f2]" href="https://www.facebook.com/terrastationvn">
                  'Trạm dừng chân chốn Terra'
                </Link>{" "}
                để không bỏ lỡ bất kỳ thông báo nào nhé.
              </li>
              <li>
                <span className="font-bold text-primary">Headhunting</span>: Nếu chúng tôi nhận thấy bạn là
                một nhân tố tài năng và phù hợp qua các hoạt động sôi nổi của bạn trong nhóm, Staff sẽ chủ
                động liên hệ để mời bạn gia nhập!
              </li>
            </ul>
            <div>Hẹn gặp bạn trong Arknights VNS!</div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">
              Nhóm có quy định như thế nào về việc thảo luận nội dung chưa ra mắt (Spoiler) từ máy chủ CN?
            </Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <Paragraph>
              Do đặc thù chênh lệch thời gian giữa máy chủ CN và Global/EN, chúng tôi áp dụng quy định chặt
              chẽ về việc kiểm soát nội dung "Leak & Spoiler". Điều này nhằm đảm bảo sự tôn trọng tối đa đối
              với trải nghiệm khám phá cốt truyện của người chơi Global.
            </Paragraph>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionTrigger>
            <Heading kind="h4">Arknights VNS có mở rộng cơ hội hợp tác phát triển không?</Heading>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-justify text-muted-foreground md:text-lg">
            <Paragraph>
              Có, chúng tôi luôn tìm kiếm các cơ hội hợp tác phù hợp với giá trị và mục tiêu của cộng đồng.
              Nếu bạn có bất kỳ dự án thú vị hoặc ý tưởng sự kiện nào có thể mang lại lợi ích cho cộng đồng
              người hâm mộ Arknights tại Việt Nam, đừng ngần ngại liên hệ với chúng tôi qua
            </Paragraph>
            <ul className="list-inside list-disc leading-relaxed">
              <li>
                Fanpage{" "}
                <Link className="font-bold text-[#1877f2]" href="https://www.facebook.com/terrastationvn">
                  'Trạm dừng chân chốn Terra'
                </Link>
              </li>
              <li>
                <Link className="font-bold text-[#1877f2]" href="https://www.facebook.com/shou.huynhf">
                  Facebook cá nhân
                </Link>{" "}
                của Head Admin.
              </li>
              <li>
                Email{" "}
                <Link className="font-bold text-primary" href="mailto:arknightsvns@gmail.com">
                  arknightsvns@gmail.com
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ContentArea>
  );
}
