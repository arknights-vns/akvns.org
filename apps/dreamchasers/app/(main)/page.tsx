import OrganizerImage from "@/components/OrganizerImage";
import Jiangles_Banner from "@/public/organizers/jiangles_banner.png";
import ModSquad_Banner from "@/public/organizers/mod_squad_banner.png";
import VNS_Banner from "@/public/organizers/vns_banner.png";

export default function Home() {
    return (
        <div className="flex h-visible bg-vns">
            <div className="mb-8 flex w-screen flex-col items-center justify-center">
                <div className="mx-4 flex flex-col items-center justify-center">
                    {/* eslint-disable-next-line react-dom/no-missing-iframe-sandbox */}
                    <iframe
                        className="mb-4 h-[340px] max-h-[45vh] w-[680px] max-w-[90vw] border-2"
                        src="https://www.youtube.com/embed/OFfuIei_YTw?si=Zk9s9cEveUHGx2ul"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                    <span className="text-center text-xl font-bold">
                        "AKVNS Offline 2025: Dreamchasers" đã đi đến hồi kết,
                        {" "}
                        cảm ơn các bạn đã đến tham gia cùng chúng mình!
                        <br />
                    </span>
                    <span className="text-center text-lg font-light">Hẹn gặp các bạn tại Offline mùa sau!</span>
                </div>
                <div className="absolute bottom-4 flex flex-col items-center gap-y-2">
                    <span className="font-extrabold">Được mang đến cho bạn bởi</span>
                    <div className="flex items-center gap-x-2 text-primary">
                        <OrganizerImage alt="VNS" src={VNS_Banner} />
                        <div>•</div>
                        <OrganizerImage alt="Mod_Squad" src={ModSquad_Banner} />
                        <div>•</div>
                        <OrganizerImage alt="Jiangles" src={Jiangles_Banner} />
                    </div>
                </div>
            </div>
        </div>
    );
}
