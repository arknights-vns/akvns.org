"use client";

import The_Show_Must_Go_On from "@public/timeline/vns-offline-2024.jpg";
import Dreamchasers from "@public/timeline/vns-offline-2025.jpg";
import Zeklewa_Collab from "@public/timeline/zeklewa-collab.jpg";
import Image from "next/image";
import Link from "next/link";

import ContentArea from "@/components/ContentArea";
import { Timeline } from "@/components/ui/extension/timeline";
import { FavorText, Heading, Paragraph } from "@/components/ui/extension/typography";

export default function DevelopmentTimeline() {
  return (
    <ContentArea className="max-w-[92vw]" id="timeline">
      <Heading className="text-primary" kind="h1">
        Timeline
      </Heading>
      <FavorText>Lịch sử hình thành và phát triển của Arknights VNS.</FavorText>
      <div className="container relative overflow-clip">
        <Timeline
          data={[
            {
              title: "2022",
              content: (
                <div>
                  <Paragraph>
                    Từ một cuộc 'khởi nghĩa' với owner Lê Nguyễn Huy Hùng của Arknights VN Fanclub, Arknights
                    VNS được thành lập dưới sự dẫn dắt của sáu Founder đời đầu:{" "}
                    <span className="font-bold text-primary">Shou Huỳnh</span>,{" "}
                    <span className="font-bold text-primary">Sơn Trần</span>,{" "}
                    <span className="font-bold text-primary">Bùi Đạt</span>,{" "}
                    <span className="font-bold text-primary">Nguyễn Trang</span>,{" "}
                    <span className="font-bold text-primary">Kazaha Kamito</span> và{" "}
                    <span className="font-bold text-primary">Nguyễn Đức Dương</span>.
                  </Paragraph>
                  <Paragraph>
                    Thế nhưng, giai đoạn 'hậu chiến' của Arknights VNS không hề dễ dàng, bởi nhóm còn quá non
                    trẻ mà đã phải đối mặt với vô vàn khó khăn, trong đó có sự quấy nhiễu từ những thành phần
                    'chiến thần' tràn sang từ Fanclub cũ.
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
                    nghiêm ngặt để phù hợp với thực tiễn rằng: cộng đồng nên có một sân chơi tự do, nhưng vẫn
                    phải luôn có những điểm dừng nhất định.
                  </Paragraph>
                  <Paragraph>
                    Cũng trong thời gian này, Arknights VNS cũng đã có một{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/groups/arknights.vietnam.station/posts/1876122536114001"
                    >
                      màn hợp tác đặc biệt
                    </Link>{" "}
                    với{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/Zeklewa"
                    >
                      Zeklewa
                    </Link>{" "}
                    - một trong những họa sĩ người Việt Nam từng vinh dự{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/terrastationvn/posts/pfbid04uXVteJXgCvXwEUtf3dh21ccY7oGoB2xEYZMrGDaWfx4gJi7pfUfM6qYZHNfWUi2l"
                    >
                      được Yostar đặt tranh (commission) cho Arknights
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
                <div className="space-y-4">
                  <Paragraph>
                    Nhận thấy cộng đồng không có một buổi gặp mặt lớn nào đã lâu, Shou Huỳnh cùng các
                    Moderator và một vài partner trong Arknights VNS đã tổ chức một buổi offline lớn, dựa theo
                    mô hình mini-festival vào ngày 14/01/2024 tại Du Miên Garden Cafe (Gò Vấp, TP.HCM) dưới
                    cái tên <span className="font-bold text-primary">'The Show Must Go On!'</span>. Với sự góp
                    mặt của hơn 140 người tham dự, đây chính là bước đệm thành công lớn của Shou nói riêng và
                    Arknights VNS nói chung.
                  </Paragraph>
                  <Image
                    alt="VNS Offline 2024: The Show Must Go On"
                    className="size-auto bg-white"
                    height={360}
                    src={The_Show_Must_Go_On}
                    width={1080}
                  />
                  <Paragraph>
                    Và cũng trong khoảng thời gian này, Arknights VNS còn hỗ trợ cho thành viên trong nhóm là{" "}
                    <Link
                      className="font-bold text-primary underline"
                      href="https://www.facebook.com/tran.kyphong.54"
                    >
                      Satoh Nguyễn
                    </Link>{" "}
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
                    với sự góp mặt của <span className="font-bold text-primary">hơn 150 người tham dự</span>,
                    quy trình tổ chức chuyên nghiệp và khắc phục gần như triệt để những hạn chế của mùa đầu
                    tiên, Dreamchasers được cộng đồng công nhận là sự kiện Offline thành công và ấn tượng nhất
                    trong lịch sử tính đến thời điểm hiện tại.
                  </Paragraph>
                  <Image
                    alt="VNS Offline 2025: Dreamchasers"
                    className="size-auto bg-white"
                    height={360}
                    src={Dreamchasers}
                    width={1080}
                  />
                  <Paragraph>
                    Và cũng đánh dấu lần đầu tiên Arknights VNS phối hợp với{" "}
                    <Link
                      className="font-bold text-orange-500 underline"
                      href="https://www.facebook.com/VNCommunityLeague"
                    >
                      Vietnam Community League
                    </Link>{" "}
                    để tổ chức sự kiện cộng đồng.
                  </Paragraph>
                </div>
              ),
            },
            {
              title: "2026",
              content: (
                <div className="space-y-4">
                  <div className="leading-relaxed">
                    Đầu 2026 là một làn gió mới cho cộng đồng Arknights với sự ra mắt của{" "}
                    <span className="font-bold text-yellow-400">Arknights: Endfield</span>, được ấn định ra
                    mắt <span title="1 tuần sau khi cái này được viết">vào 22/01/2026</span> trên toàn cầu.
                    Trong bối cảnh tựa game Arknights đã bước sang tuổi thứ 7 (theo server CN) và ngọn lửa
                    nhiệt huyết trong cộng đồng ngày dần lụi tàn, Arknights: Endfield không chỉ đơn thuần là
                    một tựa game mới, mà còn là ngọn hải đăng hy vọng.
                  </div>
                  <div className="leading-relaxed">
                    Liệu cộng đồng sẽ bị phân mảnh giữa hai tựa game, hay Endfield sẽ là động lực kéo cả con
                    tàu tiến về phía trước? Tương lai sẽ được định hình ra sao, thời gian sẽ tự đưa ra câu trả
                    lời cho chuyến tàu của ngày mai.
                  </div>
                </div>
              ),
            },
            {
              title: "????",
              content: <div>Ai biết được tương lai đâu, cái gì đến cứ đến thôi.</div>,
            },
          ]}
        />
      </div>
    </ContentArea>
  );
}
