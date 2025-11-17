export default function AdminMain() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-2">
                <div className="text-3xl font-bold">Xin chào</div>
                <div className="text-muted-foreground">We finally have the CMS now.</div>
                <div className="flex flex-col gap-y-1">
                    <p>
                        Thì đây là cái CMS-at-home của Arknights VNS, dùng để control một vài thứ
                        trên website - truyện, các feature, nhân sự, v.v.
                    </p>
                    <p>
                        Mọi thứ cần thiết đều nằm ở site panel phía bên trái. Những cái nào mà đang
                        là <span className="font-bold text-red-400">(BETA)</span> thì dễ có
                        Consequences:tm:
                    </p>
                    <p>That's all, have fun.</p>
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <div className="text-3xl font-bold">Where analytics?</div>
                <div className="flex flex-col gap-y-1">
                    <p>Soon.</p>
                </div>
            </section>
        </main>
    );
}
