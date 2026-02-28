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
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          title: "Tuế Gia Thường Nhật : Kiếp Sống Nhân Gian",
          thumbnail: "https://comic-assets.akvns.org/sui-daily-slices-mundane-mortal-life/chapter-0/00.jpg",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis: "n/a",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          title: "Rhodes Kitchen: Tidbits",
          thumbnail: "",
          author: "Hypergryph",
          category: "Arknights_VNS",
          synopsis: "fixme",
        },
        {
          series_id: "octodeco",
          title: "Octodeco",
          thumbnail: "https://comic-assets.akvns.org/octodeco/dont-be-lonely-alone/00.jpg",
          author: "Octodeco",
          category: "Arknights_VNS",
          synopsis: "fixme",
        },
        {
          series_id: "logos-and-rosmontis",
          title: "Logos & Rosmontis",
          thumbnail: "",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis: "fixme",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          title: "Records of Originium: Rhine Lab",
          thumbnail: "",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis: "fixme",
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
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          chapter_id: "chapter-0",
          chapter_name: "One-Shot",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-1",
          chapter_name: "Chapter 1",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-2",
          chapter_name: "Chapter 2",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-3",
          chapter_name: "Chapter 3",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-4",
          chapter_name: "Chapter 4",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-5",
          chapter_name: "Chapter 5",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-6",
          chapter_name: "Chapter 6",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-7",
          chapter_name: "Chapter 7",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-8",
          chapter_name: "Chapter 8",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-9",
          chapter_name: "Chapter 9",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          chapter_id: "chapter-10",
          chapter_name: "Chapter 10",
        },
        {
          series_id: "octodeco",
          chapter_id: "dont-be-lonely-alone",
          chapter_name: "Don't be Lonely, Alone",
        },
        {
          series_id: "octodeco",
          chapter_id: "monhun-1",
          chapter_name: "Monster Hunter Reaction 1",
        },
        {
          series_id: "octodeco",
          chapter_id: "monhun-2",
          chapter_name: "Monster Hunter Reaction 2",
        },
        {
          series_id: "octodeco",
          chapter_id: "monhun-3",
          chapter_name: "Monster Hunter Reaction 3",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-33",
          chapter_name: "Side Story 33",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-34",
          chapter_name: "Side Story 34",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-35",
          chapter_name: "Side Story 35",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-40",
          chapter_name: "Side Story 40",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-58",
          chapter_name: "Side Story 58",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-60",
          chapter_name: "Side Story 60",
        },
        {
          series_id: "logos-and-rosmontis",
          chapter_id: "chapter-0",
          chapter_name: "One-Shot",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-0",
          chapter_name: "Chapter 0",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-1",
          chapter_name: "Chapter 1",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-2",
          chapter_name: "Chapter 2",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-3",
          chapter_name: "Chapter 3",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-4",
          chapter_name: "Chapter 4",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-5",
          chapter_name: "Chapter 5",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-6",
          chapter_name: "Chapter 6",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-7",
          chapter_name: "Chapter 7",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-8",
          chapter_name: "Chapter 8",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "chapter-9",
          chapter_name: "Chapter 9",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "special-1",
          chapter_name: "Special Chapter 1",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "special-2",
          chapter_name: "Special Chapter 2",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          chapter_id: "special-3",
          chapter_name: "Special Chapter 3",
        },
      ],
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
