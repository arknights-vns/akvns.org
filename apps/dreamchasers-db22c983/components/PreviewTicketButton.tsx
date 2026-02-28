import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export default function PreviewTicketButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-xl text-xl font-bold" size="lg">
                    Mua vé
                </Button>
            </DialogTrigger>
            <DialogContent className="space-y-3">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">
                        Xin lỗi bạn nha, tụi mình bán hết rồi...
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <div className="space-y-2">
                        <p>
                            Bạn nhớ theo dõi thông tin mới nhất tại page
                            {" "}
                            <Link
                                className="font-extrabold underline"
                                href="https://www.facebook.com/terrastationvn"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Trạm dừng chân chốn Terra
                            </Link>
                            {" "}
                            nhé.
                            Tụi mình rất mong được gặp bạn tại Offline!
                        </p>
                        <p className="text-center italic">
                            Nếu bạn vẫn muốn xem lại các hạng vé, hãy click vô
                            {" "}
                            <DialogClose asChild>
                                <Link
                                    className="font-bold italic underline"
                                    href="/tickets"
                                >
                                    đây
                                </Link>
                            </DialogClose>
                            !
                        </p>
                        <p className="text-center italic">(bấm ra bên ngoài hoặc dấu 'x' để đóng)</p>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
