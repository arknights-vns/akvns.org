import Image from "next/image";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import Mcafe from "@/public/MCafe_Entry.jpg";

export default function LocationPage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle
                favorText="Một số thông tin hỗ trợ bạn trong quá trình di chuyển đến địa điểm offline."
                title="Địa điểm"
            />
            <Button asChild className="mb-2 w-fit self-center" size="lg">
                <Link href="https://youtu.be/lyPB05h6Axw">Hướng dẫn di chuyển từ Metro</Link>
            </Button>
            <div className="mx-4 flex flex-col gap-8 lg:flex-row">
                <div className="flex flex-col justify-center space-y-4 lg:w-1/2">
                    <div className="text-center text-2xl font-extrabold text-primary">
                        Cửa chính sẽ giống thế này
                    </div>
                    <div className="flex flex-1 items-start justify-center">
                        <Image
                            alt="MCAFE"
                            className="mx-8 h-64 w-full object-cover lg:h-80"
                            height={600}
                            src={Mcafe}
                            width={800}
                            priority
                        />
                    </div>
                    <div className="min-h-[48px] text-center text-primary">
                        Đ/c: 40 Nguyễn Văn Hưởng, Thảo Điền, Thủ Đức, Thành phố Hồ Chí Minh.
                        <br />
                        (Đi bằng Metro, xuống ga Thảo Điền, đi bộ khoảng 10 phút là tới)
                    </div>
                </div>
                <div className="flex flex-col justify-center space-y-4 lg:w-1/2">
                    <div className="text-center text-2xl font-extrabold text-primary">
                        Google Map
                    </div>
                    <div className="flex flex-1 items-start justify-center">
                        <iframe
                            allowFullScreen
                            className="mx-8 h-64 w-full object-cover lg:h-80"
                            loading="eager"
                            referrerPolicy="no-referrer-when-downgrade"
                            sandbox="allow-scripts allow-popups allow-top-navigation allow-forms"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.5424037182813!2d106.72501623850003!3d10.804816497336429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273e10990f3b%3A0xc0521b630c53b06!2zTWNhZsOp!5e0!3m2!1sen!2s!4v1751777410957!5m2!1sen!2s"
                            style={{ border: 0 }}
                        >
                        </iframe>
                    </div>
                    <Link
                        className="min-h-[48px] text-center text-primary underline"
                        href="https://www.google.com/maps/place/Mcaf%C3%A9/@10.8048165,106.7250162,18z/data=!3m1!4b1!4m6!3m5!1s0x3175273e10990f3b:0xc0521b630c53b06!8m2!3d10.8048165!4d106.7263037!16s%2Fg%2F11t4xyhpl0?hl=en&entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                    >
                        (Link dẫn đến Google Maps)
                    </Link>
                </div>
            </div>
        </div>
    );
}
