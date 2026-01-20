import Link from "next/link";

import ContentArea from "@/components/ContentArea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heading } from "@/components/ui/extension/typography";

export default function QuestionsForUs() {
  return (
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
                <Link href="https://www.facebook.com/terrastationvn/posts/pfbid02J1ySbi8RawCkF34cotWNsoQkmj7PbDyE6MLxyKXyPELpq36PNXvDk56TZ1zozb4wl?comment_id=1232462605272258">
                  ví dụ như cái này đi
                </Link>
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
              <Link className="font-bold text-[#1877f2]" href="https://www.facebook.com/terrastationvn">
                Fanpage 'Trạm dừng chân chốn Terra'
              </Link>{" "}
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
                <Link className="font-bold text-[#1877f2]" href="https://www.facebook.com/terrastationvn">
                  Fanpage 'Trạm dừng chân chốn Terra'
                </Link>{" "}
                hoặc{" "}
                <Link className="font-bold text-[#1877f2]" href="https://www.facebook.com/shou.huynhf">
                  Facebook của Head Admin.
                </Link>
              </li>
              <li>
                Bạn có thể liên hệ qua email{" "}
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
