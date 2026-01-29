import { Timeline } from "@arknights-vns/ui/components/extension/timeline";
import { FavorText, Heading, Paragraph } from "@arknights-vns/ui/components/extension/typography";
import The_Show_Must_Go_On from "@public/timeline/vns-offline-2024.jpg";
import Dreamchasers from "@public/timeline/vns-offline-2025.jpg";
import Zeklewa_Collab from "@public/timeline/zeklewa-collab.jpg";
import Image from "next/image";
import Link from "next/link";
import ContentArea from "@/components/ContentArea";

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
                <div className="space-y-4" key="2022">
                  <Paragraph>
                    Hành trình của Arknights VNS bắt đầu từ một bước ngoặt lớn - tách ra để tìm kiếm một hướng
                    đi mới khác biệt so với Arknights VN Fanclub. Con thuyền khi ấy được chèo lái bởi 6
                    Founder: <span className="font-bold text-primary">Shou Huỳnh</span>,{" "}
                    <span className="font-bold text-primary">Sơn Trần</span>,{" "}
                    <span className="font-bold text-primary">Bùi Đạt</span>,{" "}
                    <span className="font-bold text-primary">Nguyễn Trang</span>,{" "}
                    <span className="font-bold text-primary">Kazaha Kamito</span> và{" "}
                    <span className="font-bold text-primary">Nguyễn Đức Dương</span>.
                  </Paragraph>
                  <Paragraph>
                    Giai đoạn khởi đầu đã đặt ra những bài toán khó giải cho nhóm. Không chỉ đối mặt với sự
                    thiếu thốn về nguồn lực, Arknights VNS còn phải vượt qua những áp lực lớn từ bối cảnh cộng
                    đồng lúc bấy giờ để bảo vệ định hướng phát triển của mình. Vượt qua những giai đoạn biến
                    động đó, Arknights VNS đã từng bước khẳng định vị thế và sự ổn định như ngày hôm nay.
                  </Paragraph>
                </div>
              ),
            },
            {
              title: "2023",
              content: (
                <div className="space-y-4" key="2023">
                  <Paragraph>
                    Dưới sự dẫn dắt của Shou Huỳnh, Arknights VNS từng bước tiến lên bằng chiến lược phát
                    triển dung hòa những thế mạnh cốt lõi của cả hai nhóm tiền nhiệm bằng cách áp dụng triệt
                    để tôn chỉ <span className="font-bold text-primary">'tự do trong khuôn khổ'</span> của
                    mình. Lead Admin Shou đã kết hợp sự cởi mở, đa dạng nội dung vốn có của Fanclub với tính
                    kỷ luật, chặt chẽ đặc trưng của AKVN. Mọi hoạt động tại đây đều được vận hành dựa trên bộ
                    nội quy nghiêm ngặt để phù hợp với thực tiễn rằng:{" "}
                    <span className="font-bold text-primary">
                      cộng đồng nên có một sân chơi tự do, nhưng vẫn phải luôn có những điểm dừng nhất định.
                    </span>
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
                <div className="space-y-4" key="2024">
                  <Paragraph>
                    Sau thời gian dài vắng bóng các hoạt động offline, ngày 14/01/2024, Shou Huỳnh cùng đội
                    ngũ Moderator đã thổi bùng lại ngọn lửa đam mê bằng sự kiện{" "}
                    <span className="font-bold text-primary">'The Show Must Go On!'</span>. Với mô hình
                    Mini-festival và sự hưởng ứng của{" "}
                    <span className="font-bold text-primary">hơn 140 người tham dự</span>, đây chính là bước
                    đệm thành công lớn của Shou nói riêng và Arknights VNS nói chung, tạo tiền đề lịch sử cho
                    các sự kiện về sau của Arknights VNS.
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
                <div className="space-y-4" key="2026">
                  <div className="leading-relaxed">
                    Tháng 1/2026, Arknights bước sang tuổi thứ 7 (CN Server). Khi nhiệt huyết cộng đồng đứng
                    trước thử thách của thời gian, sự ra mắt của{" "}
                    <span className="font-bold text-yellow-400">Arknights: Endfield</span>, ấn định ra mắt{" "}
                    <span title="1 tuần sau khi cái này được viết">vào 22/01/2026</span> trên toàn cầu, được
                    ví như ngọn hải đăng hy vọng mới. Liệu Endfield sẽ là động lực kéo con tàu tiến về phía
                    trước hay không?. Đứng trước ngưỡng cửa lịch sử này, AK VNS đã sẵn sàng để đón nhận mọi
                    thách thức và tiếp tục sứ mệnh dẫn dắt cộng đồng trong chương mới.
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
