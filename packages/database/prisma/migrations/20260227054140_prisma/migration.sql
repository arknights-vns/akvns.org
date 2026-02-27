-- CreateEnum
CREATE TYPE "ComicCategory" AS ENUM ('Arknights_VNS', 'Partner', 'Collaboration', 'Community');

-- CreateTable
CREATE TABLE "comic_series" (
    "id" BIGSERIAL NOT NULL,
    "series_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "thumbnail" TEXT,
    "category" "ComicCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "like" BIGINT NOT NULL DEFAULT 0,
    "view" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "comic_series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_chapter" (
    "id" BIGSERIAL NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "chapter_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "series_id" TEXT NOT NULL,

    CONSTRAINT "comic_chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comic_contributor" (
    "id" BIGSERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "members" TEXT[],
    "series_id" TEXT NOT NULL,

    CONSTRAINT "comic_contributor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comic_series_series_id_key" ON "comic_series"("series_id");

-- CreateIndex
CREATE INDEX "comic_series_id_series_id_title_author_thumbnail_category_idx" ON "comic_series"("id", "series_id", "title", "author", "thumbnail", "category");

-- CreateIndex
CREATE UNIQUE INDEX "comic_series_series_id_title_key" ON "comic_series"("series_id", "title");

-- CreateIndex
CREATE INDEX "comic_chapter_chapter_id_chapter_name_idx" ON "comic_chapter"("chapter_id", "chapter_name");

-- CreateIndex
CREATE INDEX "comic_contributor_series_id_role_members_idx" ON "comic_contributor"("series_id", "role", "members");

-- AddForeignKey
ALTER TABLE "comic_chapter" ADD CONSTRAINT "comic_chapter_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "comic_series"("series_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comic_contributor" ADD CONSTRAINT "comic_contributor_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "comic_series"("series_id") ON DELETE RESTRICT ON UPDATE CASCADE;
