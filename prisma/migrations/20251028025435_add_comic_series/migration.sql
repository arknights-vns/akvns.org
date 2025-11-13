-- CreateTable
CREATE TABLE "comic_series" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "translators" TEXT[],
    "chapters" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comic_series_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comic_series_slug_key" ON "comic_series"("slug");

-- CreateIndex
CREATE INDEX "comic_series_slug_date_idx" ON "comic_series"("slug", "date");
