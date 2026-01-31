ALTER TABLE "comic_chapter" ALTER COLUMN "comicChapterId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "thumbnail" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "comic_chapter" ADD COLUMN "prevChapterId" text;--> statement-breakpoint
ALTER TABLE "comic_chapter" ADD COLUMN "nextChapterId" text;