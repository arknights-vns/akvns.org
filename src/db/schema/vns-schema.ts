import { relations } from "drizzle-orm";
import {
    index,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core";

/**
 * `project_type` enum.
 */
export const projectTypeEnum = pgEnum("project_type", [
    "Community",
    "Event",
    "Cross_Over",
]);

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
 * `blog` table.
 */
export const blog = pgTable(
    "blog",
    {
        id: serial().primaryKey(),
        slug: varchar({ length: 255 }).notNull().unique(),
        title: varchar({ length: 255 }).notNull(),
        author: varchar({ length: 255 }),
        shortBriefing: text(),
        updatedAt: timestamp({ precision: 0, mode: "string" })
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date().toISOString()),
    },
    (table) => [
        index("blog_idx").on(
            table.title,
            table.slug,
            table.shortBriefing,
            table.author,
        ),
    ],
);

/**
 * `project` table.
 */
export const project = pgTable(
    "project",
    {
        id: varchar({ length: 255 }).primaryKey(),
        title: text().notNull(),
        type: projectTypeEnum().notNull().default("Event"),
        mainImg: text(),
        date: timestamp({ precision: 0, mode: "string" }).defaultNow(),
        description: text(),
        blogId: integer("blog_id")
            .unique()
            .references(() => blog.id),
    },
    (table) => [index("project_idx").on(table.title, table.type, table.date)],
);

/**
 * `comic_series` table.
 */
export const comicSeries = pgTable(
    "comic_series",
    {
        comicSeriesId: varchar({ length: 255 }).primaryKey(),

        title: text().notNull(),
        synopsis: text().notNull(),
        author: text().notNull(),
        thumbnail: text(),

        category: comicCategoryEnum().notNull(),

        createdAt: timestamp({ precision: 0, mode: "string" }).defaultNow(),
        updatedAt: timestamp({ precision: 0, mode: "string" })
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date().toISOString()),

        likeCount: integer().default(0),
        viewCount: integer().default(0),
    },
    (table) => [index("comic_series_idx").on(table.title, table.author)],
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

        createdAt: timestamp({ precision: 0, mode: "string" }).defaultNow(),
        updatedAt: timestamp({ precision: 0, mode: "string" })
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date().toISOString()),
    },
    (table) => [
        index("comic_chapter_idx").on(
            table.comicChapterId,
            table.chapterName,
            table.comicSeriesId,
        ),
    ],
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
    (t) => [
        uniqueIndex("comic_contributor_role_series_unique").on(
            t.role,
            t.comicSeriesId,
        ),
    ],
);

export const comicContributorRelations = relations(
    comicContributor,
    ({ one }) => ({
        comicSeries: one(comicSeries, {
            fields: [comicContributor.comicSeriesId],
            references: [comicSeries.comicSeriesId],
        }),
    }),
);

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

/**
 * one `project` may have a `blog`.
 */
export const projectRelations = relations(project, ({ one }) => ({
    blog: one(blog, {
        fields: [project.blogId],
        references: [blog.id],
    }),
}));
