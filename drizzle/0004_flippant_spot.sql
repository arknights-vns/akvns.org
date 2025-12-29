ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp(0);--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "createdAt" SET DATA TYPE timestamp(0);--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp(0);--> statement-breakpoint
ALTER TABLE "comic_chapter" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "createdAt" SET DATA TYPE timestamp(0);--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp(0);--> statement-breakpoint
ALTER TABLE "comic_series" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "date" SET DATA TYPE timestamp(0);--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "date" SET DEFAULT now();