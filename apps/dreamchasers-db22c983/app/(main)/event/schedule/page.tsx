import PageTitle from "@/components/PageTitle";
import {
    Timeline,
    TimelineDate,
    TimelineHeader,
    TimelineIndicator,
    TimelineItem,
    TimelineSeparator,
    TimelineTitle
} from "@/components/ui/timeline";

const items = [
    {
        date: "09:00",
        title: "Check-in"
    },
    {
        date: "10:00",
        title: "Đoán nhạc"
    },
    {
        date: "10:30",
        title: "Arknights Wordle"
    },
    {
        date: "11:15",
        title: "Kahoot!"
    },
    {
        date: "12:30",
        title: "Nghỉ trưa"
    },
    {
        date: "12:50",
        title: "Gacha"
    },
    {
        date: "13:50",
        title: "Mini-Tournament"
    },
    {
        date: "15:25",
        title: "Give-Away"
    },
    {
        date: "16:00",
        title: "Bế mạc"
    }
];

export default function SchedulePage() {
    const now = new Date();

    const completed = items.filter((item) => {
        return now >= new Date(`2025-08-10T${item.date}:00+07:00`);
    });

    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle favorText="Các hoạt động sẽ diễn ra trong offline" title="Hoạt động" />

            <div className="mx-14 flex flex-col items-center justify-center">
                <div className="text-center italic">(*) Kế hoạch & thời gian có thể sẽ thay đổi tùy vào tình hình thực tế.</div>
                <div className="text-center italic">(**) Cái này cập nhật theo thời gian thực.</div>

                <Timeline
                    className="mx-auto mt-32 hidden md:flex"
                    orientation="horizontal"
                    value={completed.length + 1}
                >
                    {items.map((item, index) => (
                        <TimelineItem
                            key={item.title}
                            className="group-data-[orientation=horizontal]/timeline:mt-0"
                            step={index + 1}
                        >
                            <TimelineHeader>
                                <TimelineSeparator className="group-data-[orientation=horizontal]/timeline:top-12" />
                                <TimelineIndicator className="group-data-[orientation=horizontal]/timeline:top-12" />
                                <TimelineDate className="mb-8 text-2xl">{item.date}</TimelineDate>
                                <TimelineTitle>{item.title}</TimelineTitle>
                            </TimelineHeader>
                        </TimelineItem>
                    ))}
                </Timeline>

                <Timeline
                    className="m-8 flex max-h-[30svh] md:hidden"
                    value={completed.length + 1}
                >
                    {items.map((item, index) => (
                        <TimelineItem
                            key={item.title}
                            className="w-[calc(50%-1.5rem)] odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:ms-0 even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:-right-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-indicator]]:translate-x-1/2 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:-right-6 even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:left-auto even:group-data-[orientation=vertical]/timeline:[&_[data-slot=timeline-separator]]:translate-x-1/2"
                            step={index + 1}
                        >
                            <TimelineHeader>
                                <TimelineSeparator />
                                <TimelineDate>{item.date}</TimelineDate>
                                <TimelineTitle>{item.title}</TimelineTitle>
                                <TimelineIndicator />
                            </TimelineHeader>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>
        </div>
    );
}
