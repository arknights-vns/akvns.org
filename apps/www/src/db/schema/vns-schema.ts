import { relations, sql } from "drizzle-orm";
import { index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

/**
 * `comic_category` enum.
 */
export const comicCategoryEnum = pgEnum("comic_category", [
  "Arknights_VNS",
  "Partner",
  "Collaboration",
  "Community",
]);

/**
 * `comic_series` table.
 */
export const comicSeries = pgTable(
  "comic_series",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    comicSeriesId: varchar({ length: 255 }).unique().notNull(),

    title: text().notNull(),
    synopsis: text().notNull(),
    author: text().notNull(),
    thumbnail: text(),

    category: comicCategoryEnum().notNull(),

    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => /* @__PURE__ */ new Date().toISOString()),

    likeCount: integer().default(0),
    viewCount: integer().default(0),
  },
  (table) => [
    index("comic_series_id_idx").on(table.id),
    index("comic_series_seriesId_idx").on(table.comicSeriesId),
    index("comic_series_idx").on(table.title, table.author),
    index("comic_title_search_idx").using(
      "gin",
      sql`(
        setweight(to_tsvector('simple', ${table.title}), 'A') ||
        setweight(to_tsvector('simple', ${table.author}), 'B') ||
        setweight(to_tsvector('simple', ${table.synopsis}), 'C') ||
        setweight(to_tsvector('simple', ${table.comicSeriesId}), 'D')
      )`
    ),
  ]
);

/**
 * `comic_chapter` table.
 */
export const comicChapter = pgTable(
  "comic_chapter",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    comicChapterId: varchar({ length: 255 }).notNull(),
    chapterName: text().notNull(),

    comicSeriesId: varchar({ length: 255 })
      .notNull()
      .references(() => comicSeries.comicSeriesId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => /* @__PURE__ */ new Date().toISOString()),
  },
  (table) => [index("comic_chapter_idx").on(table.comicChapterId, table.chapterName, table.comicSeriesId)]
);

/**
 * `comic_contributor` table.
 */
export const comicContributor = pgTable(
  "comic_contributor",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    comicSeriesId: varchar({ length: 255 })
      .notNull()
      .references(() => comicSeries.comicSeriesId),

    role: text().notNull(),
    members: text().array().notNull(),
  },
  (t) => [uniqueIndex("comic_contributor_role_series_unique").on(t.role, t.comicSeriesId)]
);

export const comicContributorRelations = relations(comicContributor, ({ one }) => ({
  comicSeries: one(comicSeries, {
    fields: [comicContributor.comicSeriesId],
    references: [comicSeries.comicSeriesId],
  }),
}));

export const comicChapterRelations = relations(comicChapter, ({ one }) => ({
  comicSeries: one(comicSeries, {
    fields: [comicChapter.comicSeriesId],
    references: [comicSeries.comicSeriesId],
  }),
}));

export const comicSeriesRelations = relations(comicSeries, ({ many }) => ({
  chapters: many(comicChapter),
  contributors: many(comicContributor),
}));
