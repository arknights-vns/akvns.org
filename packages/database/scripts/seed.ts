// oxlint-disable promise/prefer-await-to-callbacks
// oxlint-disable unicorn/no-process-exit
// oxlint-disable no-console
// oxlint-disable import/no-relative-parent-imports
// oxlint-disable promise/prefer-await-to-then

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
    /* language=postgresql */
    await tx.$executeRaw`ALTER SEQUENCE "comic_series_id_seq" RESTART WITH 1`;
    /* language=postgresql */
    await tx.$executeRaw`ALTER SEQUENCE "comic_chapter_id_seq" RESTART WITH 1`;
    /* language=postgresql */
    await tx.$executeRaw`ALTER SEQUENCE "comic_contributor_id_seq" RESTART WITH 1`;

    await tx.comicSeries.createMany({
      data: [
        {
          series_id: "cung-dung-bua",
          title: "Cùng dùng bữa",
          thumbnail: "https://comic-assets.akvns.org/cung-dung-bua/thumbnail.png",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Cùng dùng bữa nào. Mỗi người sẽ có những khẩu vị khác nhau, kể cả anh chị em trong nhà đó!\n" +
            "\n" +
            "Cùng Dùng Bữa là manga được phát hành nhân dịp Tết Âm Lịch ở Trung Quốc (Xuân tiết - 春节) giáp Thìn 2024 về gia đình anh chị em nhà Tuế (Sui).",
        },
        {
          series_id: "123-rhodes-island",
          title: "123 Rhodes Island!?",
          thumbnail: "https://comic-assets.akvns.org/123-rhodes-island/vol-1/001.png",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Hãy cùng nhau tìm hiểu về các Cán Viên của Rhodes Island với Amiya và Doctor nào!\n" +
            "\n" +
            "123 Rhodes Island!? là truyện tranh có màu theo thể loại 4 ô (4-koma) về các Cán Viên (Operators) của Rhodes Island.\n" +
            "Tuy bám sát theo cốt truyện của các cán viên trong trò chơi, bộ truyện được xác nhận là được làm thuần với mục đích giải trí, và không xem bộ truyện là canon.",
        },
        {
          series_id: "records-of-originium-blacksteel",
          title: "Chuyện người nhiễm bệnh - Blacksteel",
          thumbnail: "https://comic-assets.akvns.org/records-of-originium-blacksteel/thumbnail.jpg",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Một câu chuyện giữa Franka, Liskarm, Vanilla, và Jessica từ Blacksteel Worldwide trước khi họ trở thành Cán Viên của Rhodes Island",
        },
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          title: "Tuế Gia Thường Nhật: Kiếp Sống Nhân Gian",
          thumbnail: "https://comic-assets.akvns.org/sui-daily-slices-mundane-mortal-life/thumbnail.jpg",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Hôm nay ba bữa, ngày mai hậu thế, tất thảy mộng ảo.\n" +
            "\n" +
            "Tuế Gia Thường Nhật: Kiếp Sống Nhân Gian là truyện tranh được phát hành nhằm bổ sung cho cốt truyện của Integrated Strategies #6: Sui's Garden of Grotesqueries, một dòng thời gian / vũ trụ khác về gia đình anh chị em nhà Tuế (Sui).",
        },
        {
          series_id: "rhodes-kitchen-tidbits",
          title: "Góc Bếp Rhodes Island",
          thumbnail: "https://comic-assets.akvns.org/rhodes-kitchen-tidbits/thumbnail.jpg",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Quá khứ đã qua, hiện tại đã ổn.\n" +
            "\n" +
            "Đây là tuyển tập đời sống thường ngày của các Cán Viên Rhodes Island thông qua những câu chuyện về ẩm thực. Mong hương bếp ấm áp sẽ sưởi ấm con tim và dẫn lối chúng ta bước tiếp.",
        },
        {
          series_id: "octodeco",
          title: "Truyện tranh của Octodeco",
          thumbnail: "https://comic-assets.akvns.org/octodeco/dont-be-lonely-alone/00.jpg",
          author: "Octodeco",
          category: "Arknights_VNS",
          synopsis:
            "Octodeco là một họa sĩ nổi tiếng trong cộng đồng Arknights với phong cách vẽ độc nhất cùng cốt truyện bám sát theo cốt truyện gốc của tựa game, hoặc cài cắm những chi tiết liên quan đến gameplay và cộng đồng, làm cho truyện tranh của mình có chiều sâu và khai thác các nhân vật tốt hơn.\n" +
            "\n" +
            "Trong các bộ truyện của Octodeco, Doctor được xác định là nam (Ông Đốc).",
        },
        {
          series_id: "octodeco-bites",
          title: "Truyện ngắn của Octodeco",
          thumbnail: "https://comic-assets.akvns.org/octodeco-bites/monhun-1/001.png",
          author: "Octodeco",
          category: "Arknights_VNS",
          synopsis:
            "Octodeco là một họa sĩ nổi tiếng trong cộng đồng Arknights với phong cách vẽ độc nhất cùng cốt truyện bám sát theo cốt truyện gốc của tựa game, hoặc cài cắm những chi tiết liên quan đến gameplay và cộng đồng, làm cho truyện tranh của mình có chiều sâu và khai thác các nhân vật tốt hơn.\n" +
            "\n" +
            "Trong các bộ truyện của Octodeco, Doctor được xác định là nam (Ông Đốc).",
        },
        {
          series_id: "logos-and-rosmontis",
          title: "Logos & Rosmontis",
          thumbnail: "https://comic-assets.akvns.org/logos-and-rosmontis/chapter-0/1.jpg",
          author: "cookKiemoon",
          category: "Arknights_VNS",
          synopsis: "Một oneshot nhẹ nhàng về Logos & Rosmontis trên Rhodes Island",
        },
        {
          series_id: "records-of-originium-rhine-lab",
          title: "Chuyện người nhiễm bệnh - Rhine Lab",
          thumbnail: "https://comic-assets.akvns.org/records-of-originium-rhine-lab/chapter-0/2.jpg",
          author: "Terra Historicus",
          category: "Arknights_VNS",
          synopsis:
            "Ifrit phát hiện một vị khách không mời trên Rhodes Island - một cô bé tên Darya. Dáng vẻ nhỏ bé của Darya mang theo một sức nặng vô hình phủ lên Ifrit, Silence và Saria, khơi dậy trong họ những ký ức của một quá khứ đã từng bị chôn giấu.\n" +
            "\n" +
            "Chuyện Người Nhiễm Bệnh – Rhine Lab là manga được phát hành nhằm hoàn chỉnh cốt truyện của phe Rhine Lab.",
        },
      ],
    });

    await tx.comicChapter.createMany({
      data: [
        {
          series_id: "cung-dung-bua",
          chapter_id: "chapter-0",
          chapter_name: "Oneshot",
        },
        /// ================================
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-001",
          chapter_name: "Chapter 01: Amiya",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-002",
          chapter_name: "Chapter 02: Doctor",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-003",
          chapter_name: "Chapter 03: Ling",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-004",
          chapter_name: "Chapter 04: Lee",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-005",
          chapter_name: "Chapter 05: Blacknight",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-006",
          chapter_name: "Chapter 06: Kroos the Keen Glint",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-007",
          chapter_name: "Chapter 07: Quercus",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-008",
          chapter_name: "Chapter 08: Goldenglow",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-009",
          chapter_name: "Chapter 09: Spot",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-010",
          chapter_name: "Chapter 10: Fiammetta",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-011",
          chapter_name: "Chapter 11: Enforcer",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-012",
          chapter_name: "Chapter 12: Kazemaru ",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-013",
          chapter_name: "Chapter 13: Noir Corne",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-014",
          chapter_name: "Chapter 14: Horn",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-015",
          chapter_name: "Chapter 15: Heidi",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-016",
          chapter_name: "Chapter 16: Chestnut",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-017",
          chapter_name: "Chapter 17: Rockrock",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-018",
          chapter_name: "Chapter 18: Savage",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-019",
          chapter_name: "Chapter 19: Specter the Unchained",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-020",
          chapter_name: "Chapter 20: Irene",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-021",
          chapter_name: "Chapter 21: Lumen",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-022",
          chapter_name: "Chapter 22: Windflit",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-023",
          chapter_name: "Chapter 23: Blaze",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-024",
          chapter_name: "Chapter 24: Ebenholz",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-025",
          chapter_name: "Chapter 25: Hibiscus the Purifier",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-026",
          chapter_name: "Chapter 26: Czerny",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-027",
          chapter_name: "Chapter 27: Arene ",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-028",
          chapter_name: "Chapter 28: Dorothy",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-029",
          chapter_name: "Chapter 29: Greyy the Lightningbearer",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-030",
          chapter_name: "Chapter 30: Astgenne",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-031",
          chapter_name: "Chapter 31: Aciddrop",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-032",
          chapter_name: "Chapter 32: Hoshiguma",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-033",
          chapter_name: "Chapter 33: Fang",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-034",
          chapter_name: "Chapter 34: Gavial the Invicible",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-035",
          chapter_name: "Chapter 35: Pozëmka ",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-036",
          chapter_name: "Chapter 36: Cantabile",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-037",
          chapter_name: "Chapter 37: Minimalist",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-038",
          chapter_name: "Chapter 38: Shaw",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-039",
          chapter_name: "Chapter 39: Yato",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-040",
          chapter_name: "Chapter 40: Młynar",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-041",
          chapter_name: "Chapter 41: Proviso",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-042",
          chapter_name: "Chapter 42: Luo Xiaohei",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-043",
          chapter_name: "Chapter 43: Dobermann",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-044",
          chapter_name: "Chapter 44: Vanilla",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-045",
          chapter_name: "Chapter 45: Stainless",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-046",
          chapter_name: "Chapter 46: Paprika",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-047",
          chapter_name: "Chapter 47: Totter",
        },
        {
          series_id: "123-rhodes-island",
          chapter_id: "chapter-048",
          chapter_name: "Chapter 48: Dagda",
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
          chapter_name: "Chương 2.5: Thẩm vấn",
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
        /// ================================
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          chapter_id: "chapter-0",
          chapter_name: "Oneshot",
        },
        /// ================================
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
        /// ================================
        {
          series_id: "octodeco-bites",
          chapter_id: "monhun-1",
          chapter_name: "Monster Hunter Reaction 1",
        },
        {
          series_id: "octodeco-bites",
          chapter_id: "monhun-2",
          chapter_name: "Monster Hunter Reaction 2",
        },
        {
          series_id: "octodeco-bites",
          chapter_id: "monhun-3",
          chapter_name: "Monster Hunter Reaction 3",
        },
        /// ================================
        {
          series_id: "octodeco",
          chapter_id: "side-33",
          chapter_name: "Side Story 33: Mưa Đổ Nặng Hạt",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-34",
          chapter_name: "Side Story 34: Tái Dự Báo: Mưa Đổ Nặng Hạt",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-35",
          chapter_name: "Side Story 35: Mưa",
        },
        {
          series_id: "octodeco",
          chapter_id: "dont-be-lonely-alone",
          chapter_name: "Side Story 36: Don't be Lonely, Alone",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-40",
          chapter_name: "Side Story 40: Những Chuyện Đã Qua Không Thể Bị Bỏ Qua",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-58",
          chapter_name: "Side Story 58: Lạc Trong Dòng Suy Nghĩ",
        },
        {
          series_id: "octodeco",
          chapter_id: "side-60",
          chapter_name: "Side Story 60: Tha Hóa",
        },
        /// ================================
        {
          series_id: "logos-and-rosmontis",
          chapter_id: "chapter-0",
          chapter_name: "Oneshot",
        },
        /// ================================
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
    await tx.comicContributor.createMany({
      data: [
        {
          series_id: "123-rhodes-island",
          role: "Translator",
          members: ["shou."],
        },
        {
          series_id: "123-rhodes-island",
          role: "Proofreader",
          members: ["Rosaline"],
        },
        {
          series_id: "123-rhodes-island",
          role: "Editor",
          members: ["shou."],
        },
        {
          series_id: "123-rhodes-island",
          role: "Quality Checker",
          members: ["Rosaline"],
        },
        {
          series_id: "records-of-originium-rhine-lab",
          role: "Translator",
          members: ["Silverglow"],
        },
        {
          series_id: "records-of-originium-rhine-lab",
          role: "Proofreader",
          members: ["Shihotori"],
        },
        {
          series_id: "records-of-originium-rhine-lab",
          role: "Editor",
          members: ["Kusodoji"],
        },
        {
          series_id: "records-of-originium-rhine-lab",
          role: "Quality Checker",
          members: ["Shihotori"],
        },
        {
          series_id: "cung-dung-bua",
          role: "Translator",
          members: ["Shihotori"],
        },
        {
          series_id: "cung-dung-bua",
          role: "Proofreader",
          members: ["shou."],
        },
        {
          series_id: "cung-dung-bua",
          role: "Editor",
          members: ["Kazure"],
        },
        {
          series_id: "cung-dung-bua",
          role: "Quality Checker",
          members: ["shou.", "Shihotori"],
        },
        {
          series_id: "records-of-originium-blacksteel",
          role: "Translator",
          members: ["Shihotori"],
        },
        {
          series_id: "records-of-originium-blacksteel",
          role: "Proofreader",
          members: ["shou."],
        },
        {
          series_id: "records-of-originium-blacksteel",
          role: "Editor",
          members: ["Shihotori"],
        },
        {
          series_id: "records-of-originium-blacksteel",
          role: "Quality Checker",
          members: ["shou."],
        },
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          role: "Translator",
          members: ["shou."],
        },
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          role: "Proofreader",
          members: ["Nym (from CED)"],
        },
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          role: "Editor",
          members: ["ILovePriestess"],
        },
        {
          series_id: "sui-daily-slices-mundane-mortal-life",
          role: "Quality Checker",
          members: ["shou.", "Nym"],
        },
        {
          series_id: "octodeco",
          role: "Translator",
          members: ["Ken"],
        },
        {
          series_id: "octodeco",
          role: "Proofreader",
          members: ["shou."],
        },
        {
          series_id: "octodeco",
          role: "Editor",
          members: ["Ken"],
        },
        {
          series_id: "octodeco",
          role: "Quality Checker",
          members: ["shou."],
        },
        {
          series_id: "octodeco-bites",
          role: "Translator",
          members: ["Ken"],
        },
        {
          series_id: "octodeco-bites",
          role: "Proofreader",
          members: ["shou."],
        },
        {
          series_id: "octodeco-bites",
          role: "Editor",
          members: ["Ken"],
        },
        {
          series_id: "octodeco-bites",
          role: "Quality Checker",
          members: ["shou."],
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
  .catch((error: unknown) => {
    console.error("We are fucking cooked.", error);
    process.exit(-1);
  });
