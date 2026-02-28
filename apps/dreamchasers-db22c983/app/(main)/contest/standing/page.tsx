import { google } from "googleapis";
import PageTitle from "@/components/PageTitle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ContestantInfo = {
    number?: number;
    name?: string;
    score?: number;
};

export default async function PodiumPage() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            client_email: process.env.GOOGLE_CLIENT_EMAIL
        },
        scopes: [
            "https://www.googleapis.com/auth/spreadsheets"
        ]
    });

    const sheets = google.sheets({
        auth,
        version: "v4"
    });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: process.env.GOOGLE_SHEET_RANGE
    });

    let data: ContestantInfo[] = [];

    response.data.values!.forEach((x) => {
        data.push({
            number: Number.parseInt(x[0]),
            name: x[1],
            score: Number.parseFloat(x[15])
            // rank: Number.parseInt(x[16])
        });
    });

    data = data.filter(x => x.name && x.name.trim() !== "");
    data = data.filter(x => !Number.isNaN(x.number));
    data = data.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    const currentFilledCount = data.length;
    data.length = 9;
    data = data.fill({}, currentFilledCount);

    return (
        <div className="flex h-screen flex-col">
            <div className="mx-16 flex flex-1/2 flex-col items-center justify-center">
                <PageTitle title="Bảng xếp hạng" favorText="Ye, chúng ta có 1 cái Podium cho Mini-Tournament :D" />
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-muted data-[state=selected]:bg-muted">
                            <TableHead className="w-[40px] border border-primary py-4 text-center text-4xl font-extrabold">
                                #
                            </TableHead>
                            <TableHead className="w-[200px] border border-primary py-4 text-center text-4xl font-extrabold">
                                Tên
                            </TableHead>
                            <TableHead
                                className="w-[100px] border border-primary py-4 text-center text-4xl font-extrabold"
                                id="tu-tu-tu-du-max-verstappen"
                            >
                                Mã vé
                            </TableHead>
                            <TableHead className="w-[150px] border border-primary py-4 text-center text-4xl font-extrabold">
                                Điểm
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, position) => {
                            let style = "";

                            if (row.name && row.number && row.score) {
                                switch (position) {
                                    case 0:
                                        style = "bg-amber-300/90 text-black";
                                        break;
                                    case 1:
                                        style = "bg-gray-300/80 text-black";
                                        break;
                                    case 2:
                                        style = "bg-amber-700/80 text-white";
                                        break;
                                }
                            }

                            return (
                                <TableRow
                                    // justification: we F5 every play.
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={position + 1}
                                    className={style}
                                >
                                    <TableCell className="border border-primary p-1 text-center text-3xl font-bold">
                                        {position + 1}
                                    </TableCell>
                                    <TableCell className="border border-primary p-1 text-center text-3xl">
                                        {row.name ?? "..."}
                                    </TableCell>
                                    <TableCell className="border border-primary p-1 text-center text-3xl">
                                        {row.number ?? "..."}
                                    </TableCell>
                                    <TableCell className="border border-primary p-1 text-center text-3xl font-bold">
                                        {row.score ?? "..."}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
