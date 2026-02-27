/** biome-ignore-all lint/suspicious/noConsole: why do I have to? */
import { prisma } from "../client";

async function seed() {
  await prisma.$transaction(async (tx) => {
    await tx.comicContributor.deleteMany({});
    await tx.comicChapter.deleteMany({});
    await tx.comicSeries.deleteMany({});

    /**
     * For @giabao06:
     *
     * In case of "you fucked up serial":
     *
     * SELECT
     *     t.relname  AS table_name,
     *     a.attname  AS column_name,
     *     s.relname  AS sequence_name
     * FROM pg_class s
     *          JOIN pg_depend d     ON d.objid = s.oid
     *          JOIN pg_class t      ON d.refobjid = t.oid
     *          JOIN pg_attribute a  ON a.attrelid = t.oid AND a.attnum = d.refobjsubid
     * WHERE s.relkind = 'S';
     */
    await tx.$executeRaw`ALTER SEQUENCE "comic_series_id_seq" RESTART WITH 1`;
    await tx.$executeRaw`ALTER SEQUENCE "comic_chapter_id_seq" RESTART WITH 1`;
    await tx.$executeRaw`ALTER SEQUENCE "comic_contributor_id_seq" RESTART WITH 1`;

    await tx.comicSeries.createMany({
      data: [
        {
          series_id: "cung-dung-bua",
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
          series_id: "records-of-originium-blacksteel",
          title: "Records of Originium: Blacksteel",
          thumbnail: "https://comic-assets.akvns.org/records-of-originium-blacksteel/thumbnail.jpg",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Một câu chuyện giữa Franka, Liskarm, Vanilla, và Jessica từ Blacksteel Worldwide trước khi họ trở thành Cán Viên của Rhodes Island",
        },
      ],
    });

    await tx.comicChapter.createMany({
      data: [
        {
          series_id: "cung-dung-bua",
          chapter_id: "chapter-0",
          chapter_name: "One Shot",
        },
        /// ================================
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "episode-1",
          chapter_name: "Chương 1: Jessica",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "episode-2",
          chapter_name: "Chương 2: Vanilla",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "episode-2.5",
          chapter_name: "Thẩm vấn",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "episode-3",
          chapter_name: "Chương 3: Franka",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "episode-4",
          chapter_name: "Chương 4: Liskarm",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "episode-5",
          chapter_name: "Chương 5: Chương kết",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "special-1",
          chapter_name: "Chương Đặc Biệt 1: Tổng kết",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "special-2",
          chapter_name: "Chương Đặc Biệt 2: Chia sẻ",
        },
        {
          series_id: "records-of-originium-blacksteel",
          chapter_id: "special-3",
          chapter_name: "Chương Đặc Biệt 3: Đeo vào đi",
        },
      ],
      /// ================================]
    });
  });
}

seed()
  .then(() => {
    console.info("Seed complete.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("We are fucking cooked.", err);
    process.exit(-1);
  });
