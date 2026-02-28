import Image from "next/image";
import ImageGallery from "@/components/ImageGallery";
import PageTitle from "@/components/PageTitle";
import supabaseLoader from "@/lib/supabase/image";

export default function TheShowMustGoOn() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle title="The show must go on!" />
            <div className="mx-auto flex w-[90vw] flex-col items-center justify-center space-y-4 text-justify md:w-[85vw] lg:w-[80vw]">
                <div className="font-normal">
                    Tuy không dám khẳng định đây là buổi Offline lớn đầu tiên của cộng đồng Arknights
                    tại Việt Nam, nhưng dựa trên những phản hồi từ người tham dự, chúng mình có thể tự
                    tin rằng đây là sự kiện Offline đầu tiên ở miền Nam được tổ chức với quy mô lớn, đầu
                    tư công phu và nhận được sự hưởng ứng nhiệt tình từ các Doctor lớn đến như vậy.
                </div>
                <div className="font-normal">
                    Với tổng số vé bán ra lên đến 150 và chi phí vận hành lên đến chục triệu đồng, mặc
                    dù không tránh khỏi những trục trặc kỹ thuật, trì hoãn, và khiếm khuyết, nhưng sự
                    kiện đã diễn ra thành công ngoài mong đợi. Để đạt được điều này, team ban tổ chức đã
                    không ngại hi sinh, thậm chí &quot;ăn mì gói qua ngày&quot; trong vài tháng sau đó -
                    tất cả vì đam mê và sự gắn kết của cộng đồng.
                </div>
                <div className="font-normal">
                    Cộng đồng Arknights Việt đã gần chạm mốc 5 năm tuổi, nhưng các buổi Offline nổi bật
                    vẫn còn khá hiếm hoi. Vì vậy, chúng mình hy vọng rằng thông qua buổi Offline và
                    chiếc album nhỏ này, sẽ có thêm nhiều Doctor tràn đầy đam mê và nhiệt huyết với Minh
                    Nhật Phương Chu sẵn sàng đứng ra tổ chức nhiều buổi gặp gỡ ý nghĩa hơn nữa. Chắc
                    chắn, chúng sẽ là những cơ hội để cộng đồng ngày càng gắn kết, bền chặt và phát
                    triển mạnh mẽ hơn trong tương lai.
                </div>
                <Image
                    alt="VNS_The_Show_Must_Go_On"
                    className="object-contain"
                    height={1000}
                    src="/events/2024/the-show-must-go-on/banner.jpg"
                    width={3000}
                    loader={supabaseLoader}
                />
                <div className="items-center text-center font-bold italic">
                    Until next time, Doctors!
                    <br />
                    14/01/2024 - Du Mien Garden Cafe
                </div>
                <div className="text-center text-3xl font-extrabold">Gallery</div>
                <div className="my-8">
                    <ImageGallery
                        albumPath="2024/the-show-must-go-on"
                    />
                </div>
            </div>
        </div>
    );
}
