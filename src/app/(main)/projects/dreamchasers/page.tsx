"use client";

import ContentArea from "@/components/ContentArea";
import { FavorText, Heading, Paragraph } from "@/components/ui/extension/typography";

export default function offline25() {
  return (
    <ContentArea className="place-items-center-safe flex flex-col gap-4 text-center" id="dreamchasers">
      <Heading className="text-primary" kind="h1">
        Arknights VNS Offline '25 - "Dreamchasers"
      </Heading>
      <FavorText>2025-08-10 - MCafé</FavorText>
      {/* Should we use F*l*avor text here or just a pargraph with a bunch of class names*/}
      <Paragraph>Một bước tiến lớn trong hành trình "Theo đuổi giấc mơ"</Paragraph>

      <Heading kind="h2">Đôi lời từ BTC</Heading>
      <Paragraph className="w-9/12">
        Mình nghĩ, ngoài việc phải lo những việc hậu Offline ra, chính mình là người lụy Offline nhất, dù nó
        đã kết thúc được 2 tuần rồi, nhưng mỗi ngày mình vẫn luôn dành chút thời gian ra xem đi xem lại Stream
        VOD, crowd reaction, video retrospection... Mỗi lần xem lại, mình như đi ngược thời gian, hơn 1 năm
        chuẩn bị cho Offline, và hơn 3 năm gắn bó với Arknights Vietnam Station. Mỗi lần xem là một lần mình
        đi tìm câu trả lời cho “Tôi đã làm gì suốt 3 năm qua?”
      </Paragraph>
      {/* Insert tus image here */}
      <Paragraph>
        <i>Shou Huynh la ai vay anh em</i>
      </Paragraph>
      <Paragraph className="w-9/12">
        [....] 3 năm làm “Admin” nghe tưởng như ngầu đó, nhưng thực ra chỉ là một cái danh ảo. Không tiền,
        không fame, và giả sử có fame thì để làm gì? Rồi nhiều đêm liền mình đã tự hỏi: liệu có nên buông
        xuôi? Liệu di sản của các founder mình phải nên giữ bằng mọi giá? Cuối cùng, mình đã chọn ở lại, tuy
        có những người luôn sẵn sàng giúp đỡ mình, mình vẫn cảm thấy thật đơn độc, đơn độc vì không phải chỉ
        để giữ lại và tiếp tục phát triển một di sản mà mình không muốn nó dần mất đi, mà còn vì muốn là đầu
        tàu giữ cho ngọn lửa không bao giờ tắt, để các Doctor về sau vẫn có thể tiếp bước và thắp lên những
        ngọn đuốc mới, để ngọn lửa của niềm đam mê sẽ không bao giờ lụi tàn.
      </Paragraph>
      {/* Insert tus, quang, VH image here */}
      <Paragraph>
        <i>nhét hình Tus, Quang và VH ở đây &lt;(")</i>
      </Paragraph>
      <Paragraph className="w-9/12">Ye, tâm sự có thế thôi, hẹn gặp mọi người vào lần tới.</Paragraph>
      <Paragraph>
        <i>(offline banner) goes here</i>
      </Paragraph>

      <Heading kind="h2">Gallery</Heading>
      <Paragraph className="w-9/12">
        <i>the dreaded gallery</i>
      </Paragraph>
    </ContentArea>
  );
}
