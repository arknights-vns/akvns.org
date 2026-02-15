/// Yes, this is *kind of* production data.

import "dotenv/config";

import { sql } from "drizzle-orm";
import { reset } from "drizzle-seed";
import { comicChapter, comicContributor, comicSeries } from "@/db/schema/vns-schema";
import { drizzleDb } from "@/lib/drizzle";

async function seed() {
  await drizzleDb.transaction(async (tx) => {
    await reset(tx, {
      comicSeries,
      comicChapter,
      comicContributor,
    });

    await tx.execute(sql`ALTER SEQUENCE comic_series_id_seq RESTART WITH 1`);
    await tx.execute(sql`ALTER SEQUENCE comic_chapter_id_seq RESTART WITH 1`);
    await tx.execute(sql`ALTER SEQUENCE comic_contributor_id_seq RESTART WITH 1`);

    await tx.insert(comicSeries).values([
      {
        comicSeriesId: "cung-dung-bua",
        title: "Cùng dùng bữa",
        thumbnail: "https://comic-assets.akvns.org/cung-dung-bua/chapter-0/00.jpg",
        author: "Terra Historicus",
        category: "Arknights_VNS",
        synopsis:
          "Quá khứ đã qua, hiện tại đã ổn.\n" +
          "\n" +
          "Đây là tuyển tập đời sống thường ngày của các Cán Viên Rhodes Island thông qua những câu chuyện về ẩm thực. Mong hương bếp ấm áp sẽ sưởi ấm con tim và dẫn lối chúng ta bước tiếp.",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        title: "Records of Originium: Blacksteel",
        thumbnail: "https://comic-assets.akvns.org/records-of-originium-blacksteel/thumbnail.jpg",
        author: "Terra Historicus",
        category: "Arknights_VNS",
        synopsis:
          "Một câu chuyện giữa Franka, Liskarm, Vanilla, và Jessica từ Blacksteel Worldwide trước khi họ trở thành Cán Viên của Rhodes Island",
      },
    ]);

    await tx.insert(comicChapter).values([
      {
        comicSeriesId: "cung-dung-bua",
        comicChapterId: "chapter-0",
        chapterName: "One Shot",
      },
      /// ================================
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "episode-1",
        chapterName: "Chương 1: Jessica",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "episode-2",
        chapterName: "Chương 2: Vanilla",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "episode-2.5",
        chapterName: "Thẩm vấn",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "episode-3",
        chapterName: "Chương 3: Franka",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "episode-4",
        chapterName: "Chương 4: Liskarm",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "episode-5",
        chapterName: "Chương 5: Chương kết",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "special-1",
        chapterName: "Chương Đặc Biệt 1: Tổng kết",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "special-2",
        chapterName: "Chương Đặc Biệt 2: Chia sẻ",
      },
      {
        comicSeriesId: "records-of-originium-blacksteel",
        comicChapterId: "special-3",
        chapterName: "Chương Đặc Biệt 3: Đeo vào đi",
      },
      /// ================================
    ]);
  });
}

seed().then(() => {
  // biome-ignore lint/suspicious/noConsole: yes
  console.log("We done.");
  process.exit();
});
