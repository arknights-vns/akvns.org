import { FavorText, Heading, Paragraph } from "@arknights-vns/shadcn-ui/components/extension/typography";
import The_Show_Must_Go_On from "@public/timeline/vns-offline-2024.jpg";
import Dreamchasers from "@public/timeline/vns-offline-2025.jpg";
import Zeklewa_Collab from "@public/timeline/zeklewa-collab.jpg";
import Image from "next/image";
import Link from "next/link";

import ContentArea from "@/components/ContentArea";
import { Timeline } from "@/components/ui/timeline";

export default function DevelopmentTimeline() {
  return (
    <ContentArea className="max-w-[92vw]" id="timeline">
      <Heading className="text-primary" kind="h1">
        Hành Trình
      </Heading>
      <FavorText>Lịch sử hình thành và phát triển của chúng mình.</FavorText>
      <div className="relative container overflow-clip">
        <Timeline
          data={[
            {
              title: "2022",
              content: (
                <div className="space-y-4" key="2022">
                  <Paragraph>
                    Hành trình của Arknights VNS bắt đầu từ một bước ngoặt khi 6 Founder là{" "}
                    <span className="font-bold text-primary">Shou Huỳnh</span>,{" "}
                    <span className="font-bold text-primary">Sơn Trần</span>,{" "}
                    <span className="font-bold text-primary">Bùi Đạt</span>,{" "}
                    <span className="font-bold text-primary">Nguyễn Trang</span>,{" "}
                    <span className="font-bold text-primary">Kazaha Kamito</span> và{" "}
                    <span className="font-bold text-primary">Nguyễn Đức Dương</span> chủ động tách khỏi
                    Arknights VN Fanclub để tìm kiếm một hướng đi mới.
                  </Paragraph>
                  <Paragraph>
                    Giai đoạn khởi đầu đã đặt ra những bài toán nan giải cho cả nhóm, khi không chỉ đối mặt
                    với sự thiếu thốn về nguồn lực, Arknights VNS còn phải vượt qua những áp lực lớn từ bối
                    cảnh cộng đồng lúc bấy giờ để bảo vệ định hướng phát triển của riêng mình. Vượt qua những
                    giai đoạn biến động đó, Arknights VNS đã từng bước khẳng định vị thế và sự ổn định như
                    ngày hôm nay.
                  </Paragraph>
                </div>
              ),
            },
            {
              title: "2023",
              content: (
                <div className="space-y-4" key="2023">
                  <Paragraph>
                    Arknights VNS từng bước tiến lên bằng chiến lược phát triển dung hòa những thế mạnh cốt
                    lõi của cả hai nhóm tiền nhiệm bằng cách áp dụng triệt để tôn chỉ{" "}
                    <span className="font-bold text-primary">'tự do trong khuôn khổ'</span> của mình. Mọi hoạt
                    động tại đây đều được vận hành dựa trên bộ nội quy nghiêm ngặt để phù hợp với thực tiễn
                    rằng,{" "}
                    <span className="font-bold text-primary">
                      cộng đồng cần một sân chơi phóng khoáng, nhưng phải dựa trên những nguyên tắc văn minh
                      của riêng mình.
                    </span>{" "}
                  </Paragraph>
                  <Paragraph>
                    Đây cũng là năm ghi dấu ấn đầu tiên khi Arknights VNS{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/groups/arknights.vietnam.station/posts/1876122536114001"
                    >
                      vinh dự được hợp tác
                    </Link>{" "}
                    với{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/Zeklewa"
                    >
                      Họa sĩ Zeklewa,
                    </Link>{" "}
                    một họa sĩ Việt Nam{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/terrastationvn/posts/pfbid04uXVteJXgCvXwEUtf3dh21ccY7oGoB2xEYZMrGDaWfx4gJi7pfUfM6qYZHNfWUi2l"
                    >
                      từng hợp tác với Yostar cho nhiều bức tranh của Arknights EN.
                    </Link>{" "}
                    vào năm 2023.
                  </Paragraph>
                  <Image
                    alt="Zeklewa collab"
                    className="h-auto bg-white"
                    height={360}
                    src={Zeklewa_Collab}
                    width={1080}
                  />
                </div>
              ),
            },
            {
              title: "2024",
              content: (
                <div className="space-y-4" key="2024">
                  <Paragraph>
                    Sau thời gian dài vắng bóng các hoạt động Offline, ngày 14/01/2024, Shou Huỳnh cùng đội
                    ngũ Ban Tổ chức đã thổi bùng ngọn lửa đam mê của cộng đồng bằng sự kiện{" "}
                    <span className="font-bold text-primary">'The Show Must Go On!'</span> tại TP.HCM. Với mô
                    hình mini-festival, kết hợp với nhiều họa sĩ và seller có tiếng trong cộng đồng, cùng sự
                    hưởng ứng của <span className="font-bold text-primary">hơn 140 người tham dự</span>,
                    Offline năm 2024 chính là bước đệm lịch sử cho nhiều chuỗi sự kiện về sau của Arknights
                    VNS
                  </Paragraph>
                  <Image
                    alt="VNS Offline 2024: The Show Must Go On"
                    className="size-auto bg-white"
                    height={360}
                    src={The_Show_Must_Go_On}
                    width={1080}
                  />
                </div>
              ),
            },
            {
              title: "2025",
              content: (
                <div className="space-y-4" key="2025">
                  <Paragraph>
                    Nối tiếp thành công của The Show Must Go On, vào 10/08/2025, phối hợp với nhiều họa sĩ
                    trong cộng đồng,{" "}
                    <Link
                      className="font-bold text-orange-500 underline"
                      href="https://www.facebook.com/groups/1823937477949873"
                    >
                      Arknights's Goods - Buôn thận và cày ruộng cùng thú 4 tai,
                    </Link>{" "}
                    và{" "}
                    <Link
                      className="font-bold text-orange-500 underline"
                      href="https://www.facebook.com/VNCommunityLeague"
                    >
                      Vietnam Community League
                    </Link>
                    , Arknights VNS đã tổ chức sự kiện{" "}
                    <span className="font-bold text-primary">"Arknights VNS 2025: Dreamchasers"</span>. Với sự
                    góp mặt của <span className="font-bold text-primary">hơn 150 người tham dự</span>, cùng
                    quy trình tổ chức chuyên nghiệp và khắc phục gần như triệt để những hạn chế của mùa trước
                    , Dreamchasers đã được cộng đồng công nhận là sự kiện Offline thành công và ấn tượng nhất
                    trong lịch sử tính đến thời điểm hiện tại.
                  </Paragraph>
                  <Image
                    alt="VNS Offline 2025: Dreamchasers"
                    className="size-auto bg-white"
                    height={360}
                    src={Dreamchasers}
                    width={1080}
                  />
                </div>
              ),
            },
            {
              title: "2026",
              content: (
                <div className="space-y-4" key="2026">
                  <div className="leading-relaxed">
                    Tháng 1/2026, Arknights bước sang tuổi thứ 7 (Server CN). Khi nhiệt huyết cộng đồng đứng
                    trước thử thách của thời gian, sự ra mắt của{" "}
                    <span className="font-bold text-yellow-400">Arknights: Endfield</span> (22/01/2026) được
                    ví như ngọn hải đăng hy vọng mới. Liệu Endfield sẽ là động lực kéo con tàu tiến về phía
                    trước hay không? Đứng trước ngưỡng cửa lịch sử này, AK VNS đã sẵn sàng để đón nhận mọi
                    thách thức và tiếp tục sứ mệnh dẫn dắt cộng đồng trong chương mới của lịch sử.
                  </div>
                </div>
              ),
            },
            {
              title: "????",
              content: <div key="????">Ai biết được tương lai đâu, cái gì đến cứ đến thôi.</div>,
            },
          ]}
        />
      </div>
    </ContentArea>
  );
}
